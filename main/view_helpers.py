import random
import time
from django.utils import timezone
from main.models import DailyWord

random.seed(time.time())


def load_words_closure():
    words = {}

    def inner(lang):
        nonlocal words

        if lang not in words:
            with open(f"{lang}_words", "rt") as f:
                raw_words = f.readlines()
            f.close()

            words[lang] = [word.strip() for word in raw_words]
        return words[lang]

    return inner


load_words = load_words_closure()


def get_random_word(lang):
    words = load_words(lang)
    return words[random.randint(0, len(words) - 1)]


def get_today_word(lang="english") -> str:
    try:
        DailyWord.objects.create(
            date=timezone.now().date(),
            en_word=get_random_word("english"),
            fa_word=get_random_word("persian"),
        )
    except Exception as e:
        print(e, "AAAAAAAAAAAAA")
    match lang:
        case "english":
            return DailyWord.objects.get(date=timezone.now().date()).en_word
        case "persian":
            return DailyWord.objects.get(date=timezone.now().date()).fa_word
