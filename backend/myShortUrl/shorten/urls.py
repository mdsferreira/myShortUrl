from django.conf.urls import url, include
from django.urls import path
from .views import LinkCreateView, myRedirectView

urlpatterns = [
    url(r'^shorten/$', LinkCreateView.as_view()),
    url(r'^short/(?P<hash>[\w\-]+)/$', myRedirectView.as_view())
]