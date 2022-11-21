from django.http import JsonResponse
import pandas as pd
import json

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_weather(request):
    data = pd.read_csv('cities.csv', sep=";")
    if request.method == 'GET' and 'city' in request.GET:
        city = request.GET['city']
        data = data[data['city'].str.lower().str.contains(city.lower())]
    json_format = data.to_json(orient="records")
    weather = json.loads(json_format)
    return JsonResponse({'weather': weather})