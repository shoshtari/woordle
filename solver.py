#!/usr/bin/python
lang = "persian"
# lang = "english"

with open(f"{lang}_words") as f:
    words = f.read().split("\n")
    if "" in words:
        words.remove("")


def check(word, guess):
    # a word of 5 char will return, c for correct, w for wrong, and x for misplaced
    result = [None for _ in range(5)]
    count = {}
    for i in range(5):
        if word[i] == guess[i]:
            result[i] = "c"
            continue 
        count[word[i]] = count.get(word[i], 0) + 1
    for i in range(5):
        if result[i] is not None:
            continue 
        if count.get(guess[i], 0) > 0:
            result[i] = "x"
            count[guess[i]] -= 1
            continue 
        result[i] = "w"
    return ''.join(result)
        
    


def query(guess, result):
    global words
    new_words = []
    for word in words:
        if check(word, guess) == result:
            new_words.append(word)

    print(f"{len(words) - len(new_words)} word ommited")
    return new_words

