from django.urls import path, include

from Apps.appBlog.views import * 

urlpatterns = [
    # path(url, vista, name='nombre_rapido')
    path('', index, name='index')
]
