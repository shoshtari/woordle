# Generated by Django 5.0.6 on 2025-01-24 09:20

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="DailyWord",
            fields=[
                ("date", models.DateField(primary_key=True, serialize=False)),
                ("word", models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name="Guesses",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("bale_id", models.CharField(max_length=40)),
                ("guess", models.CharField(max_length=10)),
                (
                    "day",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="main.dailyword"
                    ),
                ),
            ],
        ),
        migrations.DeleteModel(
            name="Word",
        ),
    ]
