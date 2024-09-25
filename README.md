# AIMie

## Deployment

### AWS

1. Install dependencies on AWS-Linux

```sh
$ sudo yum update -y
$ sudo yum install -y docker
$ sudo service docker start
$ sudo usermod -a -G docker ec2-user

$ sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
$ docker-compose version

$ sudo yum install git -y
```

### SSL

1. Install certbot

```sh
$ sudo python3 -m venv /opt/certbot/
$ sudo /opt/certbot/bin/pip install --upgrade pip
$ sudo /opt/certbot/bin/pip install certbot certbot-nginx
$ sudo ln -s /opt/certbot/bin/certbot /usr/bin/certbot
```

2. Create self-signed certificate

```sh
$ sudo certbot certonly --standalone -d aimfg.sg
```

3. Copy certificate and private key to Docker containers

```yaml
volumes:
  - /etc/letsencrypt/live/aimfg.sg/fullchain.pem:/etc/pki/tls/certs/certificate.crt:ro
  - /etc/letsencrypt/live/aimfg.sg/privkey.pem:/etc/pki/tls/private/private.key:ro
```

### Docker

1. Create bridge network

```sh
$ docker create network aimie
```

2. Spin PostgreSQL instance in Docker

```sh
$ cd ~
$ docker run -d \
--name postgres \
-p 5432:5432 \
--network aimie \
--mount type=bind,source=./docker/postgres/data,target=/var/lib/postgresql/data:rw \
-e POSTGRES_PASSWORD=password \
-v $PWD/aimie/postgresql.conf:/etc/postgresql/postgresql.conf \
-c config_file=/etc/postgresql/postgresql.conf \
postgres:16.4
```

3. Run docker-compose

```sh
$ docker-compose -f docker-compose-staging.yaml up -d
```
