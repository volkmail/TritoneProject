# Generated by Django 3.1.6 on 2021-02-04 06:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testing', '0002_auto_20210204_1633'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diagramelement',
            name='element_id',
            field=models.IntegerField(primary_key=True, serialize=False, verbose_name='id'),
        ),
    ]
