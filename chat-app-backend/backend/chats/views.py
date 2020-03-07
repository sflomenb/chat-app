#from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Create your views here.
def index(request):
    return HttpResponse("Hello world. You're at the chats index.")

def health(request):
    return JsonResponse({'status': 200, 'message': 'success'})
