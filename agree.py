from cs50 import get_string

c = get_string("Do you agree ? ").lower()

if c in ["y", "yes"]:
    print("Agreed.")
elif c in ["n", "no"]:
    print("Not Agreed.")
