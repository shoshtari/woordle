import json
from main.models import Guesses, DailyWord, Users
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
    bale_id = request.headers.get("Bale-Id")
    lang = Users.objects.get(bale_id=bale_id).lang

    words = view_helpers.load_words(lang)
    is_valid = b["word"] in words
    today = DailyWord.objects.get(date=timezone.now().date())
    if is_valid:
        Guesses.objects.create(
            day=today, guess=b["word"], bale_id=request.headers.get("Bale-Id"), lang = lang
        )

    return JsonResponse({"valid": is_valid})


@csrf_exempt
def get_guesses(request: HttpRequest):
    bale_id = request.headers.get("Bale-Id")
    lang = lang = Users.get_lang(bale_id)
    day = timezone.now()
    guesses = Guesses.get_user_guess(date=day, bale_id=bale_id, lang=lang)
    return JsonResponse({"guesses": guesses})


@csrf_exempt
def get_vars(request: HttpRequest):
    bale_id = request.headers.get("Bale-Id")
    lang = lang = Users.get_lang(bale_id)
    match lang:
        case "english":
            return JsonResponse(
                {
                    "direction": "left",
                    "low_char": "a",
                    "high_char": "z",
                    "word": view_helpers.get_today_word("english"),
                }
            )

        case "persian":
            return JsonResponse(
                {
                    "direction": "right",
                    "low_char": "ا",
                    "high_char": "ی",
                    "word": view_helpers.get_today_word("persian"),
                }
            )


@csrf_exempt
def change_lang(request: HttpRequest):
    req_data = json.loads(request.body.decode("utf-8"))
    bale_id = req_data["bale_id"]
    lang = req_data["lang"]
    Users.objects.update_or_create(
        bale_id=bale_id, defaults={"lang": lang}
    )
    return JsonResponse({"ok": True})

    
