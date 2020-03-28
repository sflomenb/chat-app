from django.test import TestCase

from .models import User


class UserTest(TestCase):
    def setUp(self):
        print(self._testMethodName)
        User.objects.create(name="Sam_test")
        User.objects.create(name="Fred_test")

    def test_users_have_names(self):
        sam = User.objects.get(name='Sam_test')
        self.assertEqual(sam.name, 'Sam_test')

    def test_can_get_user(self):
        response = self.client.get('/chats/users/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(User.objects.count(), 2)

    def test_can_post_user(self):
        response = self.client.post('/chats/users/', data={'name': 'Bob_test'})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(User.objects.count(), 3)
        bob = User.objects.get(name='Bob_test')
        self.assertEqual(bob.name, 'Bob_test')

    def test_str(self):
        sam = User.objects.get(name='Sam_test')
        self.assertEqual(str(sam), 'Sam_test')
