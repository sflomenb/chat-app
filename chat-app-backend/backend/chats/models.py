from django.db import models

class User(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Message(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField(max_length=200)
    creation_time = models.DateTimeField('creation time')

    def __str__(self):
        return f'{self.author} said {self.content} at {self.creation_time}'

