from django.db import models

class Link(models.Model):
    hashcode = models.CharField(max_length=20, null=False, blank=False, verbose_name='Hash Code')
    original_link = models.CharField(max_length=500, null=False, blank=False, verbose_name='Link')

    class Meta:
        db_table = 'link'

    def __str__(self):
        return '%s' % (self.hashcode)

class Param(models.Model):
    len_hash = models.IntegerField(null=False, blank=False, verbose_name='Hash Lenght')

    class Meta:
        db_table = 'param'

    def __str__(self):
        return '%s' % (self.len_hash)