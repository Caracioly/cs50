from cs50 import get_int

def main():
    print_height(get_height())


def get_height():
    while True:
        try:
            n = int(input("Height: "))
            if n > 0:
                return n
        except ValueError:
            print("Not an integer")


def print_height(height):
    for i in range(height):
        print("#")


main()
