def main():
    print_pyramid(get_height())


def get_height():
    while True:
        try:
            height = int(input("Height: "))
            if height > 0 and height < 9:
                return height
        except ValueError:
            print("Not an integer")


def print_pyramid(height):
    for i in range(1, height + 1):
        print(" " * (height - i) + "#" * i + "  " + "#" * i)


main()
