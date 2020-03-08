import json
from unittest import skip

from django.test import TestCase
from django.urls import reverse


class HealthCheckTest(TestCase):
    def test_can_reach_health_check(self):
        print(self._testMethodName)
        response = self.client.get(reverse('health'))
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data, {'status': 200, 'message': 'success'})
