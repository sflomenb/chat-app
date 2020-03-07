from django.urls import path, include

from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'messages', views.MessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('health', views.health, name='health'),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
