from django.db import models


class Type_d(models.Model):
    name = models.CharField(max_length=100)
    prior = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Тип'
        verbose_name_plural = 'Типы'


class Dish(models.Model):
    name = models.CharField(max_length=100)
    type = models.ForeignKey(Type_d, on_delete=models.CASCADE, related_name='dishes')
    description = models.TextField(null=True)
    price1 = models.CharField(max_length=20)
    price2 = models.CharField(max_length=20, null=True)
    image = models.ImageField(upload_to='images/', null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Блюдо'
        verbose_name_plural = 'Блюда'