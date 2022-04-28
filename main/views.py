from http.client import HTTPResponse
from django.shortcuts import render, HttpResponse

# Create your views here.

def test(request):
    var = {"word":"salam", "path":r"C:\Users\mpc\w\woordle\main\templates\main".replace("\\", "\\\\")}
    return render(request, 'main/test.html', context=var)
def main(request):
    var = {"word":"salam", "path":r"C:\Users\mpc\w\woordle\main\templates\main"}
    return render(request, 'main/index.html', context=var)
