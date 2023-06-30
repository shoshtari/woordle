import json
import os

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .import view_helpers

# Create your views here.
def get_root_path():
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def test(request):
    pwd = get_root_path()
    template_folder_path = os.path.join(pwd, "main/templates/main")
    var = {
        "word": "salam",
        "path": template_folder_path
    }
    return render(request, 'main/test.html', context=var)


def main(request):
    var = {
        "word": view_helpers.get_random_word(),
    }
    return render(request, 'main/index.html', context=var)


def file_loader(request, file_name):
    extension = file_name.split(".")[-1]
    if extension == "js":
        extension = "javascript"
    mime_type = f"text/{extension}"
    return render(request, f'main/{file_name}', content_type=mime_type)


@csrf_exempt
def word_checker(request):
    b = json.loads(request.body.decode('utf-8'))
    words = view_helpers.load_words()
    is_valid = b["word"] in words
    return JsonResponse({"valid": is_valid})
