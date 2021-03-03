from django.urls import include, path
from . import views

TASK_PREFIX = 'tasks/'

urlpatterns = [
    path(TASK_PREFIX + 'get', views.get_tasks, name="get-tasks"),
    path(TASK_PREFIX + 'get/<str:id>', views.get_task, name="get-task"),
    path(TASK_PREFIX + 'create', views.post_task, name="post-task"),
    path(TASK_PREFIX + 'update/<str:id>', views.update_task, name='update-task'),
    path(TASK_PREFIX + 'delete/<str:id>', views.delete_task, name='delete-task')
]