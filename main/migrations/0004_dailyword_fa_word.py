# Generated by Django 5.0.6 on 2025-01-24 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0003_rename_word_dailyword_en_word"),
    ]

    operations = [
        migrations.AddField(
            model_name="dailyword",
            name="fa_word",
            field=models.CharField(default="سلام", max_length=10),
            preserve_default=False,
        ),
    ]
