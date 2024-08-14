def main():
    meow(5)


def meow(n):
    if n > 0:
        for i in range(n):
            print("meow")
    else:
        print("Usage meow(times)")

main()
