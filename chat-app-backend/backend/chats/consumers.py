from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "my-group"
        self.groups.append(self.group_name)
        print("self.groups: " + str(self.groups))

        await self.channel_layer.group_add(self.group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name,
        )
        print("self.groups: " + str(self.groups))

    async def receive(self, text_data):
        await self.channel_layer.group_send(
            self.group_name, {"type": "chat_message", "message": text_data}
        )

    async def chat_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        await self.send(text_data=message)
