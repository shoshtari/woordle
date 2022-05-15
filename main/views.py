from http.client import HTTPResponse
from django.shortcuts import render, HttpResponse
import os
# Create your views here.
def get_root_path():
    return os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def test(request):
    pwd = get_root_path()
    template_folder_path = os.path.join(pwd, "main/templates/main")
    var = {
        "word" : "salam",
        "path" : template_folder_path
    }
    return render(request, 'main/test.html', context=var)
def main(request):
    pwd = get_root_path()
    template_folder_path = os.path.join(pwd, "main/templates/main")
    var = {
        "word" : "salam",
        # "path" : template_folder_path
        "path" : "main"
    }
    return render(request, 'main/index.html', context=var)
def file_loader(request, file_name):
    extension = file_name.split(".")[-1]
    if extension == "js":
        extension = "javascript"
    mime_type = f"text/{extension}"
    return render(request, f'main/{file_name}', content_type = mime_type)