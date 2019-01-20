## How it works.

When you create a short URL I gonna give you a random string with 'n' characters.

This 'n' is set in a parameter table named Param. In my exemple, I started with 3 chars.

The random string can contain numbers or a char [a-z] or [A-Z].

When we achieve all the possibilities for 'n' chars, we increment 'n'.

### Requirements

Nodes and Python 3 installed

### How run it.

The frontend was developed in Reac and the backend using Python

#### frontend 

In the frontend folder, runs 'npm install' to install the dependencies and 'npm start' to run the app in the development mode.<br>

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### backend 

In the backend folder, runs 'pip install -r requirements.txt' to install the dependencies and 'python manage.py runserver' run the app in the development mode.<br>

Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

[http://localhost:8000/admin](http://localhost:8000/admin) to view the stored data.

user: admin 
password: admin123 

In my exemple.
