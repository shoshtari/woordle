from django.db import models


# Create your models here.


class DailyWord(models.Model):
    date = models.DateField(primary_key=True)
    en_word = models.CharField(max_length=10)
    fa_word = models.CharField(max_length=10)


class Guesses(models.Model):
    bale_id = models.CharField(max_length=40)
    day = models.ForeignKey(DailyWord, on_delete=models.CASCADE)
    lang = models.CharField(max_length=10)
    guess = models.CharField(max_length=10)

    @staticmethod
    def get_user_guess(date, bale_id, lang):
        return [
            i.guess
            for i in Guesses.objects.filter(bale_id=bale_id, day__date=date, lang=lang)
        ]


class Users(models.Model):
    bale_id = models.CharField(max_length=40, primary_key=True)
    lang = models.CharField(max_length=10, default="english")

    @staticmethod
    def get_lang(bale_id: str):
        try:
            Users.objects.create(bale_id=bale_id)
        except:
            pass
        return Users.objects.get(bale_id=bale_id).lang
