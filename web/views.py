from django.shortcuts import render
from django.template.loader import render_to_string
from django.http import HttpResponse

def boilerplate(request):
    return render(
        request,
        'boilerplate.html',
        {'title': 'Assignment Task'}
    )

def boilerplate_jquery(request):
    content = render_to_string('boilerplate/jquery-3.6.1.min.js')
    return HttpResponse(content, 'application/javascript')

def boilerplate_script(request):
    content = render_to_string('boilerplate/script.js')
    return HttpResponse(content, 'application/javascript')

def boilerplate_style(request):
    content = render_to_string('boilerplate/style.css')
    return HttpResponse(content, 'text/css')

def login(request):
    return render(request, 'login.html')

def login_script(request):
    content = render_to_string('login/script.js')
    return HttpResponse(content, 'application/javascript')

def login_style(request):
    content = render_to_string('login/style.css')
    return HttpResponse(content, 'text/css')