"""woordle URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

modal_style = "modal_style.css"

style = "style.css"
table_creator = "tableCreator.js"
check = "check.js"
script = "script.js"
modal_script = "modal_script.js"

urlpatterns = [
    path('test/', views.test),
    path('', views.main),


    path(modal_style+"/", lambda request:views.file_loader(request, modal_style)),
    path(style+"/", lambda request:views.file_loader(request, style)),
    path(table_creator+"/", lambda request:views.file_loader(request, table_creator)),
    path(check+"/", lambda request:views.file_loader(request, check)),
    path(script+"/", lambda request:views.file_loader(request, script)),
    path(modal_script+"/", lambda request:views.file_loader(request, modal_script)),
    
    path('word_generator/', views.word_generator),
]
