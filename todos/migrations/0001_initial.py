# Generated migration file

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField(help_text='Todo item text')),
                ('is_finished', models.BooleanField(default=False, help_text='Whether the todo is completed')),
                ('created_at', models.DateTimeField(auto_now_add=True, help_text='When the todo was created')),
                ('finished_at', models.DateTimeField(blank=True, help_text='When the todo was marked as finished', null=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.AddIndex(
            model_name='todo',
            index=models.Index(fields=['-created_at'], name='todos_todo_created_idx'),
        ),
        migrations.AddIndex(
            model_name='todo',
            index=models.Index(fields=['is_finished'], name='todos_todo_is_fini_idx'),
        ),
    ]
