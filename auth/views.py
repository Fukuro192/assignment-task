from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .serializers import UserSerializer

class RegisterUser(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        print(f'request.data = {request.data}')
        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=400)
        
        serializer.save()
        user = User.objects.get(username=serializer.data['username'])
        token, _ = Token.objects.get_or_create(user=user)

        return JsonResponse({ 'token': token.key })