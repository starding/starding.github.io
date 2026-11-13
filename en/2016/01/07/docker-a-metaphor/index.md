# Understanding Docker Through a Metaphor

## The academic definition of Docker
Let's start with Wikipedia's definition:

> Docker is an open-source project that automates the deployment of applications inside software containers, by providing an additional layer of abstraction and automation of operating-system-level virtualization on Linux. Docker uses the resource isolation features of the Linux kernel such as cgroups and kernel namespaces, and a union-capable filesystem such as aufs and others to allow independent “containers” to run within a single Linux instance, avoiding the overhead of starting and maintaining virtual machines.

From this fairly academic definition you can vaguely gather that Docker is a tool that automates things like deployment, but you can't really see what makes it so damn great, or where exactly its strengths lie. To figure that out, reading the definition is nowhere near enough. One way is to use Docker for a long time and gradually come to appreciate its advantages. But for a newcomer who has never touched Docker, and who may not even know much about deployment, how do you get there quickly? A good approach is to lean on a metaphor.

## The Docker metaphor
The concept of "metaphor" gets its own post: "Metaphor"

Likewise, if you want to understand Docker quickly and grasp its core idea, a metaphor matters a lot.

### The literal meaning: Docker, the dock worker
The name Docker is itself a metaphor. In the global logistics system, one of the most important inventions is the shipping container.

Why is the container so important? To see why, look at how logistics worked before containers existed: goods are produced and packed into crates, then loaded crate by crate onto a truck, then unloaded crate by crate and put on a train, carried to the station near the port, unloaded crate by crate again, loaded onto trucks, hauled to the freighter, loaded on crate by crate...

You can see that a huge amount of time, labor, and material goes to waste on all the loading and unloading in between. In logistics, the time goods actually spend on the road is fixed, and until transportation technology improves it's hard to shorten. So the time spent loading and unloading became the bottleneck of logistics, and that situation improved enormously once the container appeared.

What makes the container important is that it provides a universal, standard specification for packaging goods (put plainly, its size and shape conform to a standard). This produces a huge advantage: in transport, the goods only need to be packed once before shipping. The container can then go onto a train or a truck, be hauled to the port, be placed directly on the ship, and after unloading go straight onto a train or truck again to its destination. On top of that, the container's standard makes it very easy to handle mechanically, which kicked off a standardization of the entire global logistics system around the container. That saved enormous amounts of time and labor and accelerated the flow and reallocation of resources around the world.

### Docker (the dock worker) borrows exactly the container metaphor
Docker is like the dock worker loading goods into a container: it packages your application into a container of a standard specification. In computing terms, this container packed to a given specification is called an "image." Really it's your original code plus some extra content, format, and so on, turned into a static application. And just as a disc image can only be parsed by software that understands that disc image format, this image can only be parsed by Docker.

The container reduces the work of transporting goods. What similar advantage does a Docker image offer? First, let's look at what deploying an application was like before Docker.

Before Docker, say I wanted to deploy a Django application. What would I have to do?
First I need a Python environment. Say I use Python 3 and your machine has Python 2. OK, install Python 3 first. Turns out that's a pain: you have to install all kinds of dependencies first and sort out possible conflicts. No way around it, so you grit your teeth and do it.

Once Python is installed, thanks to magical tools like pip, Django and the Python libraries you need go in quickly. Huh, turns out you also need MySQL, and Redis too. No way around it, keep going: download, install, configure. After a herculean effort it's finally done. And just like that, the day is gone.

What? You're telling me the old server is being retired and we're switching to a new one? Dammit, fine, let's do it all over again. With yesterday's experience, it only takes most of a day.

What? You're saying our app is so good we're going to promote it, and we need to walk other people through deploying it? I choose death. Delete the code and quit.

That description may be a bit exaggerated, but it's by no means rare. Before Docker, this is exactly what ops people spent much of their time doing, wasting huge amounts of manpower and resources on endlessly repeated work.

## After Docker

### A standard deliverable
Saying Docker is like a shipping container, the key point is "standardization." What is its concrete product? It's the "image." Honestly, the Chinese word for it, *jingxiang* (镜像, "mirror image"), sounds pretty mystical, and the original English word "image" is pretty mystical too. It's mystical because its original meaning has been extended for special contexts. It originally means "picture, likeness," and a picture also carries the sense of "an abstract depiction of a real object." A picture can also be copied easily, which later gave it the sense of "a copy of the original picture," and later still it was used directly for disc images (something that stores an image and is easy to copy, except that a picture is drawn on paper while this kind of image exists digitally on a disc). Of course, *jingxiang* already means "copy" in Chinese, but it picks up the particular mood of Chinese characters and comes across as mystical and hazy.

"Image" was later extended further. In Docker, it means taking your application itself and packaging it in a certain format (really just a series of command lines executed according to rules) into something with a standard specification (much like a container packaging your goods). It's just like how a disc image packages the original content into a format that can be burned directly onto a disc. This format can only be parsed by Docker itself, just as your disc image can only be parsed by specific tools.

In Docker, an image can't be run directly. My guess is that this isn't for technical reasons but for engineering-design reasons. Generally, a specific version of a piece of software gets packaged into exactly one image. If an image could be configured and run, it could easily get damaged in use.

So how do you avoid that? Add another layer, which amounts to a cloning technique: as long as the original body is fine, the clones can crash and burn all they like without anything really dying. This extra clone layer is called a container. The name is pretty apt: it's like a bottle or some other vessel, your application runs inside it, and you get an extra layer of safety. If you want to use a service or get your application running, you just create a new container from the image (also a single command), while the image itself stays put, untouched. Can't help it, it's precious.

Roughly speaking, there are two kinds of images:

One kind, let's simply call base standalone images. Each is usually a standalone service, and the most standalone service images of all are the various stripped-down operating systems. They're packaged into images as the most basic service, and practically every image depends on one. But for ordinary application developers like us, we generally don't use these images directly.
If we do use one, our Dockerfile usually looks something like this:


```dockerfile
# Base operating system
From ubuntu:latest
# Build the other services we need, plus our own code
RUN apt-get install mysql
COPY .  /src/
```
The other kind, let's call composite images. They're built on top of a standalone image, combining other services on top of it, such as a Python service or something like MySQL. As fairly top-level application developers, we generally use these pre-combined service images directly.
The Dockerfile then looks something like this:

```dockerfile
# Base python service
From python:2.7.10 
# Our own code
RUN apt-get install mysql
COPY .  /src/
```

In fact, a Python service like the one above is itself built on top of a base operating system. If you look at the Python Dockerfile on Docker Hub, this becomes clear:


```dockerfile
FROM buildpack-deps:jessie    # jessie is a stripped-down debian operating system
# remove several traces of debian python
RUN apt-get purge -y python.*
```
The images we build ourselves can also be called a kind of composite image. We usually use a Dockerfile to combine our own application code with some of the specific service images above (such as python), and that's how we build our own application.

### What exactly does Docker simplify?
Docker takes exactly those repetitive parts of the deployment process and does them automatically. You only need to build a working Docker image during the first deployment. After that, a few short commands are enough to pull the image, create a container from it, and get the service running. All you need is a server with Docker installed, a Dockerfile, and a reasonably smooth network connection. Truly "build once, deploy anywhere."

Need a Python 3 environment? Just `from python:3.x` and you're done.
Need to migrate servers? Copy the application along with its Dockerfile and volumes data to the new server, a few commands, done again.
Need to offer it as a service to others? The Dockerfile is the clearest deployment document there is. Maintain an official image, and whoever needs it just pulls it down and deploys it with a few commands.
By now you may have noticed that the Docker image has become a standard shipping unit, just like a container. Unlike traditional software delivery, which just hands you the code and some documentation and calls it a day, it hands you a standard Docker shipment directly. That might be a Dockerfile, or the image itself, and this standard unit includes not only the code but the whole environment the code runs in, including the OS.

So whoever wants to use my service just pulls the image and instantiates a container, and it directly provides the service you need. No more tedious installation process like before: someone has already done all of that for you.

### And the advantages don't stop there
Just as the "standardization" the container brought to logistics didn't only affect the container itself, but standardized and improved the efficiency of the whole field, from transport machinery to logistics management.

In other words, once you have "standardization" of one core thing, you can do much more on top of it, like automated mechanical handling of containers. Docker is similar: once this kind of standard software unit is established, the standard unit and the corresponding ways of managing it can bring about many more changes. For example:

### Unified service management
Applications deployed with Docker all fall within Docker's management. This is another huge advantage of Docker: it provides an isolated space and brings the scattered applications deployed on a server together under centralized management.

For example, say I have a ton of services deployed on one server: MySQL, Redis, RabbitMQ, plus a pile of other applications. One day the server suddenly loses power and reboots. Brace yourself for a tragedy. The apps that weren't set to restart automatically, the apps that broke on restart, the important apps hiding in some corner you didn't even know about that failed to start...

With Docker, though, you can see at a glance which applications started normally and which ones have problems. Then you just deal with them methodically, and you're fine.

### Use in continuous delivery
Continuous delivery is somewhat beyond the scope here. Go find the answers yourself.

## A misconception about Docker
Someone might ask: I only have one server, and I'm unlikely to migrate. My Python service and MySQL service only need to be deployed once and can be reused from then on. Does Docker still have any advantage for me? After all, Docker has a learning cost too.

If you're really sure your applications are one-off and only for your own use, then Docker's advantage in this scenario isn't especially obvious: even with Docker, someone has to do the initial build, and that's work. It's about the same amount of work as a one-time deployment. Even so, it still has an upside: it gives you a clean, isolated environment.

Also, when many people say Docker changed the world of ops, they're speaking at the level of the whole community. For applications with huge user bases like MySQL and Python, and for applications that are frequently migrated, changed, and redeployed, the time saved across the whole community after Dockerizing them is enormous.

That is, Docker can't reduce deployment work "to zero." In the good case it's "reduced to basically one," because no matter what, you have to build the application and its environment once. Just as the container eliminates the handling along the way but can't avoid the one operation of loading the goods into the container. But that one build can become the foundation of "build once, deliver anywhere." The first time you build your own image is similar to loading a container: it takes about as much work as deploying directly on the machine. At that point, Docker's efficiency gain is very small.

But are you really sure the work you're doing is only a one-off?

Huilongguan, Beijing, January 2016
