from django.http import JsonResponse
import pandas as pd
import json

def get_weather(request):
    data = pd.read_csv('cities.csv', sep=";")
    if request.method == 'GET' and 'city' in request.GET:
        city = request.GET['city']
        data = data[data['city'].str.lower().str.contains(city)]
    json_format = data.to_json(orient="records")
    weather = json.loads(json_format)
    return JsonResponse({'weather': weather})