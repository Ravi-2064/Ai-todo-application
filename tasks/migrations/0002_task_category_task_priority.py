# Generated by Django 5.2.4 on 2025-07-05 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='category',
            field=models.CharField(blank=True, choices=[('Work', 'Work'), ('Personal', 'Personal'), ('Home', 'Home'), ('Health', 'Health'), ('Learning', 'Learning'), ('Finance', 'Finance')], max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='task',
            name='priority',
            field=models.CharField(blank=True, choices=[('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High')], max_length=10, null=True),
        ),
    ]
