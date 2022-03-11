from http.client import HTTPResponse
from django.shortcuts import render, HttpResponse

# Create your views here.

def test(request):
    var = {"word":"salam"}
    return render(request, 'main/test.html', context=var)