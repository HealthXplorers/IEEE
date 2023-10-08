# To run the following on Linux,

Download the ZIP file and extract it

Open two terminals and run the following:

Terminal 1

cd Downloads/IEEE-main/management
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py runserver 8000

Terminal 2

cd Downloads/IEEE-main/hl7
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py runserver 8001

After this, open the index.html file in your browser.

Video: [https://youtu.be/tIoRloX_kOM]
