from django.db import models


# Create your models here.


class DailyWord(models.Model):
    date = models.DateField(primary_key=True)
    word = models.CharField(max_length=10)


class Guesses(models.Model):
    bale_id = models.CharField(max_length=40)
    day = models.ForeignKey(DailyWord, on_delete=models.CASCADE)
    guess = models.CharField(max_length=10)

    @staticmethod
    def get_user_guess(date, bale_id):
        return [i.guess for i in Guesses.objects.filter(bale_id=bale_id, day__date=date)]
