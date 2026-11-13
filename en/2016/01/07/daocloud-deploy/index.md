# Continuous Integration with DaoCloud: Deploying a Static Site and a Django App with Docker

## A word before we start
From Wikipedia: [Cargo cult programming](https://en.wikipedia.org/wiki/Cargo_cult_programming)

For readers who can't reach Wikipedia because the GFW (China's Great Firewall) blocks it:

>Cargo cult programming is an anti-pattern in computer programming, characterized by the ritual use of code or program structures without understanding them. It is typically a sign that the programmer understands neither the bug they are trying to fix nor the apparent solution.

>The term sometimes also refers to unskilled or inexperienced programmers copying code from one place to another without really knowing how it works, or whether it is needed in its new place. It can also mean applying design patterns, coding styles or programming methods incorrectly or excessively, without understanding the principles behind them.

>Cargo cult programming takes its name from the term "cargo cult". A related coinage is "cargo cult software engineering".

When reading any tutorial, don't practice cargo cult programming. Some things need to be changed to fit your own situation, and you need to understand them. If you don't understand something, get familiar with the relevant background first.

## About DaoCloud
DaoCloud offers a Docker-based continuous integration service. With it you can easily set up automated builds and continuous delivery for a project.

Of course, to use DaoCloud for continuous integration you first need to register a DaoCloud account. If you work for a company, you also need to ask the company to add your account to its user group, so that you can use the company's resources.

## Continuous integration for a simple HTML5 app

### Scenario for this section
* You have your own host
* You have added the host to DaoCloud
* You only use DaoCloud's automated build and deployment features
* The image is also deployed to your own host.

### What is a "simple HTML5 app"
Front-end pages only, served by nginx.


### The general approach to deployment
This post assumes one scenario: you have your own host, it is bound to DaoCloud, and you want to deploy continuously to that host through DaoCloud. To deploy a pure front-end project, you bundle nginx in and let nginx serve it.


### Preparing before building the app
#### App directory structure
Because DaoCloud is based on Docker, before using DaoCloud we need to follow Docker's conventions and turn our project into an app that can be packaged into an image. For an HTML5 project, that means adding a Dockerfile and setting up the nginx config file it needs. For example, I have an app called jinli, with this directory structure (yours may well differ):

```shell
jinli/  # project root
├── jinli/  # the actual app directory
│   ├── images/ # images
│   ├── index.html  # default index html
│   ├── scripts/  #  js folder
│   └── styles/    # folder for css
├── Dockerfile   # Dockerfile
├── jinli.conf   # nginx config for this app
└── log/  # log files
```
In this structure, the file related to building the Docker image is the Dockerfile. jinli.conf is a file that will be packaged into the Docker image along with it. Everything else belongs to the app itself.

#### Creating the Dockerfile
A Dockerfile is Docker's rules file, much like a Makefile for make. It describes the process of building your app into a Docker image.
In this example, the Dockerfile looks like this:

```dockerfile
# use the nginx service
FROM nginx:1.9.5
# copy the code
COPY . /src
# add the nginx config file
COPY jinli.conf /etc/nginx/conf.d/
# remove the default nginx config file
RUN rm /etc/nginx/conf.d/default.conf
```

Explaining the Dockerfile:
* First, picture the Docker image you're about to build as containing a Linux operating system.
* `FROM nginx:1.9.5` means: bring nginx version 1.9.5 into your image. (This is actually the step where the operating system comes in. nginx is itself an image built on top of a Linux operating system, so when you pull nginx, you pull it together with the whole Linux system it sits on.)
* `COPY . /src` means: copy the code in the current directory to the /src directory in the image (in the image's operating system).
* `COPY jinli.conf /etc/nginx/conf.d/` means: copy the nginx config file you wrote in the current directory to the corresponding directory in the image (in its operating system).
* Delete the original default nginx config (because the default config file takes up localhost; I don't know whether there is a better way around this).

#### Configuring the nginx config file used inside Docker
In this example, the nginx config file is named jinli.conf. It is packaged into the image to serve the HTML5 app. This is not very different from deploying directly on a server as usual. The things to watch are:

* server_name is localhost, because this server_name is used inside the Docker container.
* The root folder in location is a path inside the Docker container, not on the host machine.

```nginx
server {
    listen 80;
    server_name localhost;
    access_log /src/log/jinli.access.log;
    error_log /src/log/jinli.error.log;
    # you can also add options such as gzip here as needed
    location / {
    root /src/jinli/;
    }
}
```
Then push the app to GitHub, for example to: xiaohuruwei/jinli.git

That's all the material you need. Now on to DaoCloud.

### Using DaoCloud to build images and release continuously
The previous steps produced a Docker-ready version of the code, and it doesn't need to connect to external services like MySQL, so it can be built directly as a single-app image.

DaoCloud already has thorough documentation on this; you can follow its chapters on creating a new project and on continuous integration.

Section 4, Creating a new project: choose the git source to bind according to your situation
Section 5, Continuous integration and image building: for a simple HTML deployment, you don't need to know how to write daocloud.yml
Section 9: Releasing an app to your own host cluster

The core parts of the process above are:
* Bind a git source
* Choose the git repository to deploy and build it into an image
* Deploy to your own host
* Turn on the settings for subsequent automatic continuous deployment
* In the "Settings" of the specific project under "Code Build", turn on continuous integration and set up the image and the CI trigger rules, for example: trigger automatic CI whenever code is pushed to the docker-support branch.
* In the "Release" settings under "App List", turn on automatic release.

### What to do after release
After release, you can see the details of the created container on DaoCloud, including the port mapped to the host. Click the port number to see the app's access address, and open it to test whether the deployment worked.

For convenience in what follows, assume the mapped port is 8888. Since we released to our own host, we also need to set up a domain and an nginx reverse proxy ourselves to serve external traffic. Assume a domain is already bound to the host; here, say, xiaohuruwei.com.

Log in to your host and configure nginx. If nginx was installed with a package manager like apt-get, add jinli.conf under /etc/nginx/conf.d/:

```nginx
server {
    listen 80;
    server_name xiaohuruwei.com;
    access_log /var/log/nginx/jinli.access.log;
    error_log /var/log/nginx/jinli.error.log;
    client_max_body_size 200m;
    # you can set other options as needed
    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://127.0.0.1:8888;
    }
}
```
Then visit xiaohuruwei.com and you'll see the content.

Also, when using DaoCloud, turn on both automatic build and continuous release. That way, next time you only need to push code to GitHub; once your update rule is triggered, the image is rebuilt and released automatically.

## Continuous integration for an app that depends on external services
Using a Django app as the example

### Scenario this section applies to
* You have your own host
* You have added the host to DaoCloud
* You only use DaoCloud's automated build and deployment features
The external services it depends on already exist on your host (as Docker containers), and the image is also deployed to your own host. At deploy time, it connects to the external services already on the host (such as MySQL, Redis and so on).

### Apps that depend on external services
In the Docker world, if a Docker image needs other images to provide services to it, we say the image has external services.

Take a simple Django app. If it can't do its job on its own and needs MySQL or another database for data persistence, then this Django app depends on external services.

### Preparing before building
Preparation is close to the HTML5 case. Because it needs to connect to external services, and because uwsgi doesn't handle static files by default, there are a few more changes to the original code.

#### Project structure
First, the Django app's directory. Say there's an app called taikang, with this structure:


```shell
taikang	# project root	
├── Dockerfile	# Dockerfile
├── logs	
├── manage.py
├── Makefile	# makefile
├── requirements.txt	# python libraries the app depends on
├── templates
└── taikang		# app directory
	├── __init__.py
	├── models.py
	├── settings.py   # django settings file
	├── urls.py
	├── views.py
	└── wsgi.py
```
Writing the Dockerfile
The Dockerfile means exactly the same thing as in the HTML5 deployment. Here it is:

```python
# use python 2.7.10 as the base service
from python:2.7.10
copy everything in the current project into /src in the image
COPY . /src
# install the libraries the django app depends on, using the douban pypi mirror
RUN cd /src; pip install -r  requirements.txt -i http://pypi.douban.com/simple --trusted-host pypi.douban.com
# expose port 8000 from the image
EXPOSE 8000
# set the working directory to where the code is
WORKDIR  /src
# set the app's start command
CMD ["make", "start-uwsgi"]
```

#### Writing the Makefile
You may notice that the start command at the end uses make. That's what the Makefile in the directory structure above is for. I won't go into makefiles in detail here.
In short, it makes the app easier to manage. Here is the makefile:


```makefile
# host and port uwsgi starts on
host:=0.0.0.0
port:=8000
# when debugging, start with django's built-in server
debug:
    ./manage.py runserver $(host):$(port)
# start the uwsgi service
start-uwsgi:
    uwsgi --socket $(host):$(port) \
        --chdir $(shell pwd) \
        --wsgi-file taikang/wsgi.py \
        --master \
        --process 4 \
        --pidfile $(shell pwd)/uwsgi.pid
# stop the uwsgi service
stop-uwsgi:
    uwsgi --stop uwsgi.pid
# reload the uwsgi service
reload-uwsgi:
    uwsgi --reload uwsgi.pid
# collect static files
collectstatic:
    ./manage.py collectstatic --noinput
.PHONY: debug \
    collectstatic \
    reload-uwsgi \
    start-uwsgi \
    stop-uwsgi
```
#### Static file support
When uwsgi serves the app, static files need to be handled separately. The currently recommended option is the whitenoise library for Django. It makes serving static files easy and needs only a few lines of configuration.

#### Connecting to services through environment variables
When deploying with Docker and you need to connect to external services, you usually do it through links plus environment variables. To support environment variables, our Django app needs some changes too: specifically, changing the configuration in settings.py.

Modify settings.py, using MySQL as the example:

```python
# the original mysql config
#DATABASES = {
#    'default': {
#        'ENGINE': 'django.db.backends.mysql',
#        'NAME': 'starding_taikang',
#        'USER': 'root',
#        'PASSWORD': 'your_password_here',
#        'HOST': 'localhost',
#        'PORT': '3306'
#    }
#}
# get the service from environment variables
import os  # import the os library
mysql_name = os.environ.get('MYSQL_INSTANCE_NAME') or "taikang"  # get the database name
mysql_user = os.environ.get('MYSQL_USERNAME') or "root"  # get the mysql username
mysql_password = os.environ.get('MYSQL_PASSWORD') or "your_password"  # get the password
mysql_host = os.environ.get('MYSQL_ADDR') or "127.0.0.1"  # get the service address
mysql_port = "3306"
# use the variables above instead of strings
DATABASES = {
   'default': {
       'ENGINE': 'django.db.backends.mysql',
       'NAME': mysql_name,
       'USER': mysql_user,
       'PASSWORD': mysql_password,
       'HOST': mysql_host,
       'PORT': mysql_port
   }
}
```

### Deploying the built taikang project with DaoCloud
The steps are basically the same as the HTML5 deployment. Suppose that after the image is built, its address is:

```
daocloud.io/xiaohuruwei/taking:latest
```
Next, when deploying from the image, you need to connect the external services, which means editing the yaml file by hand.


```python
takang_test:
  image: daocloud.io/xiaohuruwei/taking:latest
  restart: always
  external_links:
  - mysql1:mysql	  # mysql1 is the existing mysql container instance on your host; after the colon is the alias
  ports:
  - '8000'
  environment:    # environment variables    
  - MYSQL_ADDR=mysql
``` 

But this approach seems to have a bug. If it doesn't work, deploy directly first, and once that succeeds, edit the yaml file into the form above. When you edit the yaml file, DaoCloud will prompt you to redeploy; just confirm.

At this point the Django project is deployed too. Then, just like the HTML5 project, turn on automatic build and automatic release.

Note: because the Django project is deployed with uwsgi, visiting the address DaoCloud gives you directly won't work. You must configure an nginx reverse proxy.

Here is the nginx proxy config for a Django app deployed with uwsgi:

```nginx
server {
    listen 80;
    server_name xiaohuruwei.com;
    access_log /var/log/nginx/taikang.access.log;
    error_log /var/log/nginx/taikang.error.log;
    client_max_body_size 200m;
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 16 64k;
    gzip_http_version 1.1;
    gzip_comp_level 6;
    gzip_types text/plain application/x-javascript text/javascript text/css application/xml;
    gzip_vary on;
    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        include uwsgi_params;
        uwsgi_pass 127.0.0.1:32801;
    }
}
```


Huilongguan, Beijing, January 2016
