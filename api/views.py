from rest_framework.views import APIView
from api.models import Task
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status
from .serializers import TaskSerializer
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_tasks(request: Request, format=None):
    tasks = Task.objects.all();
    serializer = TaskSerializer(instance=tasks, many=True);
    return Response(data=serializer.data, content_type='application/json', status=status.HTTP_200_OK) 

@api_view(['GET'])
def get_task(request: Request, id: str):
    task = Task.objects.get(id=int(id))
    serializer = TaskSerializer(instance=task)
    print(task)
    return Response(data=serializer.data, status=status.HTTP_200_OK)
    

@api_view(['POST'])
def post_task(request: Request):
    serializer = TaskSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    serializer.save()
    return Response(data=serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
def update_task(request: Request, id: str):
    task = Task.objects.get(id=int(id))
    serializer = TaskSerializer(instance=task, data=request.data)
    if not serializer.is_valid():
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    serializer.save()
    return Response(data=serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete_task(request: Request, id: str):
    task = Task.objects.get(id=int(id))
    task.delete()
    return Response('Successfully deleted Task', status=status.HTTP_200_OK)
    