import random, time
random.seed(time.time())

def load_words_closure():
    words = None
    def inner():
        nonlocal words
        if words is None:
            with open('english_words', 'rt') as f:
                raw_words = f.readlines()
            f.close()
            
            words = [word.strip() for word in raw_words]
        return words
    return inner
load_words = load_words_closure()

def get_random_word():
    words = load_words()
    return words[random.randint(0, len(words) - 1)]
