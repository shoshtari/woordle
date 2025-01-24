import json
from main.models import Guesses, DailyWord
from django.utils import timezone
import os

from django.http import JsonResponse, HttpRequest
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from . import view_helpers

# Create your views here.


def get_root_path():
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def main(request):
    var = {
        "word": view_helpers.get_today_word(),
    }
    return render(request, "main/index.html", context=var)


def file_loader(request, file_name):
    extension = file_name.split(".")[-1]
    if extension == "js":
        extension = "javascript"
    mime_type = f"text/{extension}"
    return render(request, f"main/{file_name}", content_type=mime_type)


@csrf_exempt
def word_checker(request):
    b = json.loads(request.body.decode("utf-8"))
    words = view_helpers.load_words()
    is_valid = b["word"] in words
    today = DailyWord.objects.get(date=timezone.now().date())
    if is_valid:
        Guesses.objects.create(
            day=today, guess=b["word"], bale_id=request.headers.get("Bale-Id")
        )

    return JsonResponse({"valid": is_valid})


@csrf_exempt
def get_guesses(request: HttpRequest):
    bale_id = request.headers.get("Bale-Id")
    day = timezone.now()
    guesses = Guesses.get_user_guess(date=day, bale_id=bale_id)
    return JsonResponse({"guesses": guesses})
