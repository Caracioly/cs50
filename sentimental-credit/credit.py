from cs50 import get_string


def main():
    card_number = get_string("Number: ").strip()
    if check_sum(card_number):
        print(get_flag(card_number))

    print("INVALID")


# checking for the flag of the credit card
def get_flag(number):
    length = len(number)
    first_digit = int(number[0] + number[1])

    if length == 15:
        if first_digit == 34 or first_digit == 37:
            return "AMEX"

    elif length == 16:
        if first_digit in range(51, 56):
            return "MASTERCARD"
        if int(number[0]) == 4:
            return "VISA"

    elif length == 13 and int(number[0]) == 4:
        return "VISA"

    return "INVALID"


def check_sum(number):
    numbers = list(number)

    # multiply every other digit by 2
    every_other_digit = []
    reaming_digits = []

    numbers.reverse()

    for i in range(len(numbers)):
        if i % 2 == 0:
            reaming_digits.append(int(numbers[i]))
        else:
            product = int(numbers[i]) * 2
            if product > 9:
                every_other_digit.append(product - 9)
            else:
                every_other_digit.append(product)

    # add the sum to the sum of digits
    # that weren't multiplied by 2
    total_sum = sum(every_other_digit) + sum(reaming_digits)

    # if the total's last digit = 0
    # number is valid!
    if total_sum % 10 == 0:
        return True
    return False


main()
