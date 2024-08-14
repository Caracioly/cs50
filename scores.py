from cs50 import get_int


def main():
    scores = []
    for i in range(3):
        score = get_int("Score: ")
        scores.append(score)
    average = sum(scores) / len(scores)
    print(f"Average: {average:.2f}")

main()
