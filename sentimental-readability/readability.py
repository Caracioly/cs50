from cs50 import get_string


def main():
    text = get_string("Text: ")

    words_count = calculate_words(text)
    letters_count = calculate_letters(text)
    sentences_count = calculate_sentences(text)

    index = get_index(words_count, letters_count, sentences_count)

    print_grade(index)


def calculate_words(text):
    words = 1
    for word in text:
        if word == " ":
            words += 1
    return words


def calculate_letters(text):
    letters = 0
    for word in text:
        if word.isalpha():
            letters += 1
    return letters


def calculate_sentences(text):
    sentences = 0
    for word in text:
        if word == "." or word == "?" or word == "!":
            sentences += 1
    return sentences


def get_index(words, letters, sentences):
    l = letters / words * 100
    s = sentences / words * 100
    return round(0.0588 * l - 0.296 * s - 15.8)


def print_grade(index):
    if index < 1:
        print("Before Grade 1")
    elif index > 16:
        print("Grade 16+")
    else:
        print(f"Grade {index}")


main()
