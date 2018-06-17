#!/bin/sh

confirm () {
	read -r -p "${1:-Are you sure? [y/N]} " response
	case $response in
		[yY][eE][sS]|[yY])
			echo 1;
			;;
		*)
			echo 0;
			;;
	esac
}

CONFIRM="$(confirm 'Configure app? [y/N]')"

if [ $CONFIRM -eq 1 ]
then
    echo
    echo "Removing old docker versions"
    echo
    sudo apt-get remove docker docker-engine docker.io

    echo
    echo "Installing docker..."
    echo
    sudo apt-get update
    sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository \
        "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
        $(lsb_release -cs) \
        stable"
    sudo apt-get update
    sudo apt-get install docker-ce

    echo
    echo "Installing docker compose..."
    echo
    sudo curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    docker-compose --version

    echo
    echo "Adding user to docker group..."
    echo
    sudo groupadd docker
    sudo usermod -aG docker pi

    echo
    echo "Building docker container..."
    echo
    sh -c "cd ./.docker/ && docker-compose up -d"
fi