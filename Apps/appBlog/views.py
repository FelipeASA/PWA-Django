from django.shortcuts import render, redirect

from Apps.appBlog.models import ModeloBlog

def index(request):
    # return render(request, template, contexto)
    datos = ModeloBlog.objects.all()
    contexto = {'lista': datos}
    template = 'index.html'
    return render(request, template, contexto)
