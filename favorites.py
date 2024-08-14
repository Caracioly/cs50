import csv

from collections import Counter # initialize

with open("favorites.csv", "r") as file:
    reader = csv.DictReader(file)
    # counts = {}

    # for row in reader:
    #     favorite = row["language"]
    #     if favorite in counts:
    #         counts[favorite] += 1
    #     else:
    #         counts[favorite] = 1

    counts = Counter()

    for row in reader:
        favorite = row["problem"]
        counts[favorite] += 1


# for favorite, count in counts.most_common():
#     print(f"{favorite}: {count}")

# print("*" * 15)

# for favorite in sorted(counts, key=counts.get, reverse=True): # named argument
#     print(f"{favorite}: {counts[favorite]}")

favorite = input("Favorite: ")
print(f"{favorite}: {counts[favorite]}")
