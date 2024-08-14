# from string import digits
# from itertools import product

# for passcode in product(digits, repeat=4):
#     print(passcode)


# from string import ascii_letters
# from itertools import product

# for passcode in product(ascii_letters, repeat=4):
#     print(passcode)


from string import ascii_letters, digits, punctuation
from itertools import product

for passcode in product(ascii_letters + digits + punctuation, repeat=8):
    print(passcode)
