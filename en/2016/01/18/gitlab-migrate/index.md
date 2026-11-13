# Migrating GitLab Data Between Docker Hosts

## Where it started: Docker's file-system pit
Our GitLab was deployed with Docker, which was quick and convenient.

Then an application on the server developed a memory leak, and to my surprise, after rebooting the server the whole of Docker was dead. Starting a container kept hitting a series of fairly low-level "filesystem unknown" errors, and the error details came in more than one flavor. After some digging I found that the devicemapper storage driver Docker was using had a bug, and judging from Docker's official GitHub, plenty of people had run into it. The discussion is here: [docker fails to mount the block device for the container on devicemapper](https://github.com/moby/moby/issues/4036). It felt like I had fallen into a bottomless pit.

The fix offered on Stack Overflow and GitHub was: stop Docker, delete everything in /var/lib/docker, then restart GitLab. That looked to me like possibly another pit, and I didn't dare jump in. So I chose to study the problem slowly, and in the meantime redeploy GitLab on another server and migrate the data over.

## Migrating the GitLab data
I thought the migration would be simple. It turned out there were plenty of pits waiting there too.

First I backed up GitLab's volumes on the original server, copied the backed-up volume files straight to the new server, mounted them the same way as before, and started it up.

### Problems I hit
First, Redis complained about not having permission for something or other, so I googled around and fixed the permissions.
Then came an "undefined method" error. It turned out to be caused by [the database not having been migrated](https://gitlab.com/gitlab-org/gitlab-foss/-/commit/ff98c631c1004247656677568989e5ed68fc88f3).

Another hidden pit is the GitLab version. For critical services like this, try not to use latest as the version tag. Otherwise, when something goes wrong you'll have to work out which version you were actually running, and if you can't find out... get ready to rely on pure luck.

### The final solution
Jumping into the pits one at a time like this felt pretty dumb, and later I found that someone had already filled them all in: [Migrate a Gitlab Docker container from version 8.0.4 to 8.2.0](https://cmanios.wordpress.com/2015/12/04/migrate-a-gitlab-docker-container-from-version-8-0-4-to-8-2-0/)

## Appendix: the original guide
The Chinese version of this post includes my full translation of the guide above. For English readers, please read the original directly: [Migrate a Gitlab Docker container from version 8.0.4 to 8.2.0](https://cmanios.wordpress.com/2015/12/04/migrate-a-gitlab-docker-container-from-version-8-0-4-to-8-2-0/). It walks through twelve steps, from stopping the container and backing up the volumes, through fixing the known permission issues and re-running the database migrations, to clearing the Redis cache.

One note of my own on it: step 4, removing the GitLab container, is optional if you are moving the data to a Docker GitLab instance on a different server.
