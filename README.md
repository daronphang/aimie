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

1. Install openssl

```sh
$ sudo dnf install openssl mod_ssl
```

2. Create self-signed certificate

```sh
$ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/pki/tls/private/apache-selfsigned.key -out /etc/pki/tls/certs/apache-selfsigned.crt
```

### Docker

1. Create bridge network

```sh
$ docker create network aimie
```

2. Run docker-compose

```sh
$ docker-compose -f docker-compose-staging.yaml up -d
```
