from rest_framework.response import Response
from .serializers import ElementsSerializer
from .models import DiagramElement
from rest_framework.views import APIView


class DiagramElements(APIView):
    # Work with diagram elements

    def get(self, request):
        try:
            serialize_elements = ElementsSerializer(DiagramElement.objects.all(), many=True,
                                                    context={"request": request})
            return Response({'data': {'elements': serialize_elements.data, 'ResultCode': 0}})
        except None:
            return Response({'data': {'elements': None, 'ResultCode': 1, 'Message': 'Данные не были получены'}})
