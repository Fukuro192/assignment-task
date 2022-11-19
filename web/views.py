from django.shortcuts import render
from django.template.loader import render_to_string
from django.http import HttpResponse

def boilerplate(request):
    return render(
        request,
        'boilerplate.html',
        {'title': 'Assignment Task'}
    )

def script(request):
    content = render_to_string('script.js')
    return HttpResponse(content, 'application/javascript')

def style(request):
    content = render_to_string('style.css')
    return HttpResponse(content, 'text/css')