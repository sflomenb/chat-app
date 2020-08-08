from datetime import datetime

from django.test import TestCase
from rest_framework.test import APIClient

from .models import Message, User


class MessageTest(TestCase):
    def setUp(self):
        print(self._testMethodName)
        sam = User(name='Sam_test')
        sam.save()
        Message.objects.create(author=sam, content='Hello world')

    def test_messages_have_author(self):
        sam = User.objects.get(name="Sam_test")
        message = Message.objects.get(author=sam, content='Hello world')
        self.assertEqual(message.author, sam)

    def test_messages_have_content(self):
        sam = User.objects.get(name="Sam_test")
        message = Message.objects.get(author=sam, content='Hello world')
        self.assertEqual(message.content, 'Hello world')

    def test_messages_have_creation_time(self):
        sam = User.objects.get(name="Sam_test")
        message = Message.objects.get(author=sam, content='Hello world')
        self.assertTrue(isinstance(message.creation_time, datetime))

    def test_can_get_message(self):
        response = self.client.get('/chats/messages/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Message.objects.count(), 1)

    def test_can_get_messages(self):
        response = self.client.get('/chats/messages/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(Message.objects.count(), 1)

    def test_can_post_message(self):
        client = APIClient()
        response = client.post('/chats/messages/',
                               {'author': {
                                   'name': "Sam_test"
                               },
                                'content': 'Wow, another message was added'},
                               format='json')
        self.assertEqual(response.status_code, 201, msg=response.content)
        self.assertEqual(Message.objects.count(), 2)
        new_message = Message.objects.get(
            content='Wow, another message was added')
        self.assertEqual(new_message.content, 'Wow, another message was added')

    def test_str(self):
        sam = User.objects.get(name='Sam_test')
        message = Message.objects.get(author=sam, content='Hello world')
        self.assertTrue(str(message).startswith(str(sam.pk) + ' | Sam_test said Hello world'))
