FROM python:3.12

# Set environment variables
WORKDIR /src

COPY requirements.txt /src/


RUN pip install -r requirements.txt
RUN apt update -y 
COPY . /src/

CMD ["python3", "manage.py", "migrate", "&&", "python3", "manage.py", "runserver", "0.0.0.0:8000"]

