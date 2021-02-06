from rest_framework import serializers
from .models import DiagramElement


class ElementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagramElement
        fields = ('element_id', 'element_name', 'element_image')

    def get_element_image(self, element):
        request = self.context.get('request')
        element_image_url = element.element_image.url
        return request.build_absolute_uri(element_image_url)
