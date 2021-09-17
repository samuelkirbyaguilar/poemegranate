
import os
import random

IGNORED_CHARS = [',', '.', '\n', '\t']

def parse_poem(poem):
    parsed_poem = ""
    for c in poem:
        if c in IGNORED_CHARS:
            parsed_poem = parsed_poem + ' '
        else:
            parsed_poem = parsed_poem + c.lower()
    return parsed_poem


# uses fisher-yates shuffle algorithm
# lifted from https://www.geeksforgeeks.org/shuffle-an-array-in-python/
def shuffle(arr, arr_size):
    n = arr_size
    for i in range(n - 1, 0, -1):
        j = random.randint(0, i + 1)
        arr[i], arr[j] = arr[j], arr[i]
    return arr


def insert_line_cuts(word_arr, word_count):
    word_arr_copy = word_arr
    nth_word = 0
    line_cut = random.randint(1, 8)

    while nth_word + line_cut < word_count:
        word_arr_copy[nth_word + line_cut] += "\n"
        line_cut = random.randint(1, 8)
        nth_word += line_cut

    return word_arr_copy


def build_poem_str_from_arr(word_arr):
    poem_str = ""
    for word in word_arr:
        if word[-1] == "\n":
            poem_str = poem_str + word
        else:
            poem_str = poem_str + word + ' '
    return poem_str

def get_file_name():
    filename = input("Welcome to Poemegranate! Please enter the name of the .txt file to jumble (e.g. the_marriage.txt): ")
    return filename

def get_file_content(filename):
    with open(filename, 'r') as file:
        data = file.read()
    return data

def main():
    file_name = get_file_name()
    poem = get_file_content(file_name)
    parsed_poem = parse_poem(poem)

    word_arr = parsed_poem.split()
    word_arr = shuffle(word_arr, len(word_arr))
    word_arr = insert_line_cuts(word_arr, len(word_arr))

    random_poem = build_poem_str_from_arr(word_arr)
    os.system('cls' if os.name == 'nt' else 'clear')
    print("Thanks for using poemegranate! Here's your jumbled poem:\n")
    print(random_poem)
    

if __name__ == "__main__":
    main()