from django.urls import path
from .views import DiagramElements

urlpatterns = [
    path('testing/diagram_elements', DiagramElements.as_view()),
]