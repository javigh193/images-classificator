from rest_framework import viewsets

from images.models import Image

from .serializers import ImageSerializer


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all().order_by('-uploaded')
    serializer_class = ImageSerializer
