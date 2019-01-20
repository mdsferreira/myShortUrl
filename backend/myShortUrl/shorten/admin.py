from django.contrib import admin
from .models import Link, Param

@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    pass


@admin.register(Param)
class ParamAdmin(admin.ModelAdmin):
    pass