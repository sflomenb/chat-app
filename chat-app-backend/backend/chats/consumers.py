import json

from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def notify(self, event):
        self.send(event["content"])

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        self.send(json.dumps({"message": "received"}))
