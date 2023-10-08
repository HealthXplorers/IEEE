from django.urls import path
from .views import home_view, _csv_to_hl7, _text_to_hl7, _hl7_to_csv, _hl7_to_excel, _excel_to_hl7
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", home_view, name='home'),
    path('csv-to-hl7/', _csv_to_hl7, name='csv-to-hl7'),
    path('excel-to-hl7/', _excel_to_hl7, name='excel-to-hl7'),
    path('text-to-hl7/', _text_to_hl7, name='text-to-hl7'),
    path('hl7-to-csv/', _hl7_to_csv, name='hl7-to-csv'),
    path('hl7-to-excel/', _hl7_to_excel, name='hl7-to-excel'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
