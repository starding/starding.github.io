# Deploying GitLab with Docker: Volumes, HTTPS via Nginx, SMTP and SSH

## Pulling the Image and Starting the Container
Reference: [gitlab documentation](https://docs.gitlab.com/ee/install/docker.html)

### First, pull the Docker image with the dao accelerator:

```shell
dao pull gitlab/gitlab-ce
```

### Creating volumes
Simply put, volumes are storage outside the container that can be mapped into it. You can keep fairly generic configuration files, data or code as volumes on the host machine where the container runs. This not only keeps the data permanently and safely, it also makes it easy to change what's in the volumes and map them back into the container, which is very useful for containers whose files need frequent changes.
For this GitLab deployment, I created three volumes: the config, logs and data directories under /mnt/volumes/gitlab.
Start a GitLab container:

```shell
sudo docker run --detach \
    --hostname git.xiaohuruwei.com \
    --publish 8443:443 --publish 8080:80 --publish 2222:22 \
    --name gitlab \
    --restart always \
    --volume /mnt/volumes/gitlab/config:/etc/gitlab \
    --volume /mnt/volumes/gitlab/logs:/var/log/gitlab \
    --volume /mnt/volumes/gitlab/data:/var/opt/gitlab \
    gitlab/gitlab-ce:latest
```

What the options mean:

–hostname
The domain bound inside the container, used when repositories are created. Here it is bound to git.xiaohuruwei.com.

–publish
Port mapping: the part before the colon is the host port, the part after is the port the container exposes.

–volume
Volume mapping: the part before the colon is a path on the host, the part after is the path inside the container.

## Configuring Nginx for HTTPS
Reference: [gitlab set nginx](https://gitlab.com/gitlab-org/omnibus-gitlab/blob/master/doc/settings/nginx.md#enable-https)

Nginx configuration file
```nginx
server {
    listen 80;
    server_name git.xiaohuruwei.com;
    access_log /var/log/nginx/gitlab.xiaohuruwei.access.log;
    error_log /var/log/nginx/gitlab.xiaohuruwei.error.log;
    rewrite ^ https://git.xiaohuruwei.com;
}
```

HTTPS proxy
```nginx
server {
    listen       443 ssl;
    server_name  git.xiaohuruwei.com;
    access_log /var/log/nginx/https-gitlab.xiaohuruwei.access.log;
    error_log /var/log/nginx/https-gitlab.xiaohuruwei.error.log;
    # SSL certificate config. This uses a self-generated certificate, so browsers will warn about it; just choose to trust it.
    # For a publicly trusted certificate, you need to get one from a certificate authority
    ssl on;
    ssl_certificate /etc/nginx/ssl/getbase.crt;
    ssl_certificate_key /etc/nginx/ssl/getbase_nopass.key;
    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass https://localhost:8443;
    }
}
```

## Enabling HTTPS in GitLab
Having Nginx reverse-proxy HTTPS isn't enough on its own; you also need to turn on HTTPS support in GitLab.

Edit the configuration: add the following to gitlab.rb in /mnt/volumes/gitlab/config/:

```ruby
# note the 'https' below
external_url "https://gitlab.example.com"
```

Create an ssl directory and put the SSL certificate files in it, named to match the domain above:

git.xiaohuruwei.com.crt
git.xiaohuruwei.com.key

Restart the container:

```shell
docker restart gitlab
```

## Testing Access to GitLab
Open the web interface. The default login is root and the password is 5iveL!fe (since changed to the default password of Limi Jiaoyin, the company I was working for). Create a project repository: test.
Because the SSL certificate is self-generated and not trusted across the web, you have to choose to trust it for now. Set an environment variable locally:

```shell
export GIT_SSL_NO_VERIFY=1
```

Then clone the repository: git clone https://git.xiaohuruwei.com/root/test.git

## Enabling Email
The default mail service doesn't work very well, so I configured my own. See the official GitLab SMTP documentation.

Using a 163.com mailbox and following the official docs, you'll find that emails don't get sent.

```ruby
gitlab_rails['smtp_enable'] = true
gitlab_rails['smtp_address'] = "smtp.163.com"
gitlab_rails['smtp_port'] = 25
gitlab_rails['smtp_user_name'] = "xiaohuruwei@163.com"
gitlab_rails['smtp_password'] = "xxxx"
gitlab_rails['smtp_domain'] = "163.com"
gitlab_rails['smtp_authentication'] = "login"
gitlab_rails['smtp_enable_starttls_auto'] = true
gitlab_rails['smtp_tls'] = false
gitlab_rails['smtp_openssl_verify_mode'] = 'none'
```

The logs were messy and I didn't spot the problem in them. Later I found that someone in the Ruby community had solved the same problem:
[GitLab 配置通过 smtp.163.com 发送邮件 (Sending GitLab email through smtp.163.com)](https://ruby-china.org/topics/20450)
along with NetEase's official explanation:
[NetEase's SMTP servers require the authentication account and the sender account to be the same; if they differ when a user sends an email, the email is rejected.](https://www.mail163.cn/fault/analysis/1109.html)

So I added two more lines, and after testing it worked:

```ruby
gitlab_rails['gitlab_email_from'] = "xiaohuruwei@163.com"
user['git_user_email'] = "xiaohuruwei@163.com"
```
## Access over SSH
Because GitLab is deployed with Docker, access over SSH (for example, git clone git@git.xiaohuruwei.com) goes through two layers of authentication:

One is authentication by the freelancer server.
The other is GitLab's own authentication.
The latter needs an SSH key.
The former might need a reverse proxy for SSH itself (the Nginx we use doesn't reverse-proxy anything other than HTTP and HTTPS).

For now, port forwarding turned out to be rather difficult, but you can change GitLab's default SSH port to a non-standard one by editing the variable directly in the GitLab configuration file:

```ruby
gitlab_shell_ssh_port = 2222
```

Then restart the Docker container, and you'll see the SSH address change in the web interface:
ssh://git@git.xiaohuruwei.com:2222/root/test.git, after which you can carry on with git clone as usual.

Huilongguan, Beijing, January 2016
