from django.db import models


class DiagramElement(models.Model):
    element_id = models.IntegerField('id', primary_key=True)
    element_name = models.CharField('name', max_length=50)
    element_image = models.FileField('image', upload_to='diagram_elements/')

    def __str__(self):
        return self.element_name

    class Meta:
        db_table = 'DiagramElements'
