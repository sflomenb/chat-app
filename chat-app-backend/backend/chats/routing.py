from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path

from . import consumers

websockets = URLRouter([path("ws/chats/", consumers.ChatConsumer, name="ws_chats")])

application = ProtocolTypeRouter(
    {
        # (http->django views is added by default)
        "websocket": AuthMiddlewareStack(websockets),
    }
)
