# Generated by Django 3.0.7 on 2020-08-01 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chats', '0002_auto_20200307_1534'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
