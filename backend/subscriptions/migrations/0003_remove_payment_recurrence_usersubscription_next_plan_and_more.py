# Generated by Django 4.0.8 on 2022-11-26 23:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('subscriptions', '0002_alter_usersubscription_plan'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payment',
            name='recurrence',
        ),
        migrations.AddField(
            model_name='usersubscription',
            name='next_plan',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='next_plan_subscription', to='subscriptions.subscription'),
        ),
        migrations.AlterField(
            model_name='usersubscription',
            name='plan',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='current_plan_subscription', to='subscriptions.subscription'),
        ),
    ]