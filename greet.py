from sys import argv

# if len(argv) == 2:
#     print(f"hello, {argv[1]}")
# else:
#     print("hello, world")

# for i in range(len(argv)):
#     print(argv[i])

for arg in argv[1:]: # start in item 1 and goes all the way to the end
    print(arg)
