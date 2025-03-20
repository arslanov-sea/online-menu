from django.shortcuts import render
from django.http import HttpResponse
from .models import Type_d, Dish
from django.core.serializers import serialize


def some_view(request):
    return HttpResponse("Hello from app2!")


def index(request):
    dishes = Dish.objects.all()

    # Преобразуем их в формат JSON
    # dishes_json = serialize('json', dishes, fields=('id', 'name', 'description', 'price1', 'image'))
    types = Type_d.objects.prefetch_related('dishes').all().order_by('-prior')
    return render(request, 'menu/index1.html', {'types': types})