#from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from .models import User, Message
from .serializers import UserSerializer, MessageSerializer

# Create your views here.
def index(request):
    return HttpResponse("Hello world. You're at the chats index.")

def health(request):
    return JsonResponse({'status': 200, 'message': 'success'})

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('creation_time')
    serializer_class = MessageSerializer

