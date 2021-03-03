from enum import Enum
from api.models import Task
from rest_framework import serializers


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'done', 'notes', 'dueto', 'priority']

    def validate_priority(self, value):
        priorities = ['NONE', 'LOW', 'MEDIUM', 'HIGH']
        if not value.upper() in priorities:
            raise serializers.ValidationError('Priority has to be one of the followings: LOW, MEDIUM, HIGH!')
        return value.lower()
