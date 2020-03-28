import logging

from django.http import JsonResponse
from rest_framework import status, viewsets
from rest_framework.response import Response

from .models import Message, User
from .serializers import MessageSerializer, UserSerializer


def health(request):
    return JsonResponse({'status': 200, 'message': 'success'})


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('creation_time')
    serializer_class = MessageSerializer

    def create(self, request):
        logging.debug(request.data)
        author_from_request = request.data.get('author')
        if not author_from_request:
            return Response({'error': 'Missing author from request'},
                            status=status.HTTP_400_BAD_REQUEST)
        logging.debug(author_from_request)
        author_name = author_from_request.get('name')
        author = None
        users = User.objects.filter(name=author_name)
        if not users:
            logging.debug('users_with_name: %s', users)
            author = User.objects.create(**author_from_request)
        else:
            author = users[0]
        content = request.data.get('content')
        if not content:
            return Response({'error': 'Missing content from request'},
                            status=status.HTTP_400_BAD_REQUEST)
        message = Message.objects.create(author=author, content=content)
        return Response(MessageSerializer(message).data,
                        status=status.HTTP_201_CREATED)
