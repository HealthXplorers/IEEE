from django.conf import settings
from django.contrib import admin
from django.urls import include, path

from django.conf.urls.static import static

urlpatterns = [
    path('',include('src.hl7.urls')),
    path('admin/', admin.site.urls),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
