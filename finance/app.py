import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd

# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""

    # getting the user shares bought
    portfolio = db.execute(
        "SELECT stock, SUM(shares) as shares FROM portfolio WHERE user_id = ? GROUP BY stock", session["user_id"])

    table = []
    current_cash_balance = 0

    # loop through the database to get all the currency information about the user
    for row in portfolio:
        stock_symbol = row["stock"]
        shares = row["shares"]

        stock = lookup(stock_symbol)
        if stock:
            price = stock["price"]
            current_total = price * shares
            current_cash_balance += current_total

            table.append({
                "symbol": stock_symbol,
                "shares": shares,
                "price": price,
                "total": current_total
            })

    # the current cash the user has
    user_cash = db.execute("SELECT cash FROM users WHERE id = ?", session["user_id"])[0]["cash"]

    # the current amount of cash in stocks the user has
    cash_total = current_cash_balance + user_cash

    return render_template("index.html", table=table, user_cash=user_cash, cash_total=cash_total)


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""

    # only run the sotck search if the method was POST
    if request.method == "POST":
        stock_symbol = request.form.get("symbol")
        shares = request.form.get("shares")

        # if the user not fill the fields gonna return apology
        if not stock_symbol or not shares:
            return apology("You must fill all the fields.", 400)

        # the stock symbol should exist
        stock = lookup(stock_symbol)
        if not stock:
            return apology("Invalid stock symbol.", 400)

        # the amount of shares should be higher than 0
        if not shares.isdigit() or int(shares) <= 0:
            return apology("You must provide provide a valid amount of shares (At the least 1.).", 400)

        # convert shares into int
        shares = int(shares)
        shares_cost = stock["price"] * shares

        # getting the user total amount of cash
        user_cash = db.execute("SELECT cash FROM users WHERE id = ? ",
                               session["user_id"])

        # if the user doesn't have cash return apology
        if not user_cash:
            return apology("User not found", 400)

        # select the first match to the search
        user_cash = user_cash[0]["cash"]

        # if the user does'nt have enough cash return apolody
        if user_cash < shares_cost:
            return apology("You don't have enough cash.", 400)

        # inserting into the portifolio the new stock the user bought
        db.execute("INSERT INTO portfolio (user_id, stock, shares) VALUES (?, ?, ?)",
                   session["user_id"], stock["symbol"], shares)

        # decreasing the amount of cash user have
        db.execute("UPDATE users SET cash = cash - ? WHERE id = ?",
                   shares_cost, session["user_id"])

        # registering the transaction
        db.execute("INSERT INTO transactions (user_id, stock, shares, transaction_type) VALUES (?, ?, ?, ?)",
                   session["user_id"], stock["symbol"], shares, "buy")

        # displaying a sucesefull message
        flash(f"You bought {shares} shares of {stock['symbol']} for ${shares_cost:.2f}.")
        return redirect("/")

    return render_template("buy.html")


@app.route("/history")
@login_required
def history():
    """Show history of transactions"""

    # getting the sells and buys from transaction history db
    transactions = db.execute("""
        SELECT stock, shares, timestamp, transaction_type
        FROM transactions
        WHERE user_id = ?
        ORDER BY timestamp DESC
        """, session["user_id"])

    # calculate the stock price from each transaction
    for transaction in transactions:
        stock = lookup(transaction["stock"])
        transaction["price"] = stock["price"] if stock else 0
        transaction["total_price"] = transaction["shares"] * transaction["price"]

    return render_template("history.html", transactions=transactions)


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", request.form.get("username")
        )

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], request.form.get("password")
        ):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""

    # only run the sotck search if the method was POST
    if request.method == "POST":
        stock_symbol = request.form.get("symbol")

        # checking if stock_symbol is not blank
        if not stock_symbol:
            return apology("You must provide a stock symbol.", 400)

        # calling the api to get the actual stock values
        stock = lookup(stock_symbol)

        # if there's no stock return a error
        if not stock:
            return apology("Invalid stock symbol.", 400)

        # render the quoted result page
        return render_template("quoted.html", stock=stock)
    return render_template("quote.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    # only run the registration if the method was POST
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        # checking if are any empty input
        if not username or not password or not confirmation:
            return apology("You must fill all fields", 400)

        # checking if already exists any identical username in the db
        user_registered = db.execute("SELECT username FROM users WHERE username = ?", username)
        if user_registered:
            return apology("Duplicated username found.", 400)

        # checking if the passwords matches
        if password != confirmation:
            return apology("Confirmation password does not match.", 400)

        # inserting the new user into the db
        db.execute("INSERT INTO users (username, hash, cash) VALUES (?, ?, ?)",
                   username, generate_password_hash(password), 10000)

        # get the id of the user
        user_id = db.execute("SELECT id FROM users WHERE username = ? ", username)[0]["id"]

        # loggin the user
        session["user_id"] = user_id
        flash("Registered successfully")

        # redirecting the user to the home page
        return redirect("/login")

    return render_template("register.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""

    # fetching available stocks for the user
    stocks = db.execute(
        "SELECT stock, SUM(shares) as shares FROM portfolio WHERE user_id = ? GROUP BY stock", session["user_id"])

    if request.method == "POST":
        stock_symbol = request.form.get("symbol")
        shares = request.form.get("shares")

        # checking if fields are empty
        if not stock_symbol or not shares:
            return apology("You must fill all fields.", 400)

        # checking if shares amount is valid
        if not shares.isdigit() or int(shares) <= 0:
            return apology("You must provide a valid number of shares.", 400)

        # converting shares to int
        shares = int(shares)

        # getting user's shares for the selected stock
        user_shares = db.execute("SELECT SUM(shares) as shares FROM portfolio WHERE user_id = ? AND stock = ? GROUP BY stock",
                                 session["user_id"], stock_symbol)[0]["shares"]

        # checking if user has enough shares
        if shares > user_shares:
            return apology(f"You don't have enough shares of {stock_symbol}.", 400)

        # get current price of the stock
        stock = lookup(stock_symbol)
        if not stock:
            return apology("Invalid stock symbol.", 400)

        # calculate the sale value
        shares_value = stock["price"] * shares

        # update the portfolio and cash
        db.execute("UPDATE portfolio SET shares = shares - ? WHERE user_id = ? AND stock = ?",
                   shares, session["user_id"], stock_symbol)

        # remove stock from portfolio if shares become zero
        db.execute("DELETE FROM portfolio WHERE user_id = ? AND stock = ? AND shares = 0",
                   session["user_id"], stock_symbol)

        # update user's cash
        db.execute("UPDATE users SET cash = cash + ? WHERE id = ?",
                   shares_value, session["user_id"])

        # record the transaction
        db.execute("INSERT INTO transactions (user_id, stock, shares, transaction_type) VALUES (?, ?, ?, ?)",
                   session["user_id"], stock_symbol, -shares, "sell")

        flash(f"Sold {shares} shares of {stock_symbol} for ${shares_value:.2f}")
        return redirect("/")

    return render_template("sell.html", stocks=[stock['stock'] for stock in stocks])


@app.route("/deposit", methods=["GET", "POST"])
@login_required
def deposit():
    """Deposit cash"""

    if request.method == "POST":
        amount = request.form.get("amount")

        if not amount:
            return apology("Please fill the field.", 400)

        if not amount.isdigit() or int(amount) <= 0:
            return apology("You must provide a valid number to deposit.", 400)

        # converting amount to int
        amount = int(amount)

        db.execute("UPDATE users SET cash = cash + ? WHERE id = ?",
                   amount, session["user_id"])

        flash(f"You sucessfully added {usd(amount)} in your current balance.")
        return redirect("/")

    return render_template("deposit.html")
