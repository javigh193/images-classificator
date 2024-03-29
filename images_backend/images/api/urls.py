from django.urls import include, path
from rest_framework import routers

from .views import ImageViewSet

app_name = 'api-images'

router = routers.DefaultRouter()
router.register(r'images', ImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
