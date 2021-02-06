from rest_framework.response import Response
from .serializers import ElementsSerializer
from .models import DiagramElement
from rest_framework.views import APIView


class DiagramElements(APIView):
    # Work with diagram elements

    def get(self, request):
        serialize_elements = ElementsSerializer(DiagramElement.objects.all(), many=True, context={"request": request})
        return Response(serialize_elements.data)
