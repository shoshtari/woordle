import random
import time
from django.utils import timezone
from main.models import DailyWord

random.seed(time.time())


def load_words_closure():
    words = None

    def inner():
        nonlocal words
        if words is None:
            with open("english_words", "rt") as f:
                raw_words = f.readlines()
            f.close()

            words = [word.strip() for word in raw_words]
        return words

    return inner


load_words = load_words_closure()


def get_random_word():
    words = load_words()
    return words[random.randint(0, len(words) - 1)]


def get_today_word() -> str:
    try:
        DailyWord.objects.create(
            date=timezone.now().date(), word=get_random_word())
    except:
        return DailyWord.objects.get(date=timezone.now().date()).word
