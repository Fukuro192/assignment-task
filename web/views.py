from django.shortcuts import render

def boilerplate(request):
    return render(
        request,
        'boilerplate.html',
        {'title': 'Assignment Task'}
    )