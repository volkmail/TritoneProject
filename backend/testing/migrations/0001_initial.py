# Generated by Django 3.1.6 on 2021-02-04 06:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DiagramElement',
            fields=[
                ('element_id', models.AutoField(primary_key=True, serialize=False, verbose_name='id')),
                ('element_name', models.CharField(max_length=30, verbose_name='name')),
                ('element_image', models.FileField(upload_to='diagram_elements/', verbose_name='image')),
            ],
            options={
                'db_table': 'DiagramElements',
                'ordering': ['-element_id'],
            },
        ),
    ]