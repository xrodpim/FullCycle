
To run this example as a FullCycle exercise solution you have to execute in this folder:

docker-compose up -d --build


In case of error, try to execute:

sudo rm -Rf mysql/ && docker stop nginx node db && docker-compose up -d --buil


Folder 'node' contains files that must be used by the Node into a Docker container.

Files dockerfile_* are used by the docker-compose. That is, when docker-compose.yaml is executed, it will execute these dockerfile_*. So, the docker-compose is responsible for creating the containers.

3 containers will be created when the docker-compose is executed:

- a Docker container for MySQL
- a Docker container for Node
- a Docker container for Nginx.

The file nginx.conf contains some configuration that let Nginx communicate with the Node in the Node Docker container.

The file node/index.js has code to deal with the database MySQL running in the Docker container for MySQL.

When the docker-compose is executed, containers are created or modified. Created if it doesn't exist yet, and modified if it exist already, but its dockerfile was modified.

When the docker-compose is executed, images for containers are created, if it doesn't exist.

Command 'docker images' shows available images.
Command 'docker ps -a' shows available containers.
Command 'docker-compose logs' shows the log of running the  docker-compose.yaml.

After running the docker-compose.yaml file, the folder /mysql will has several files related to the MySQL database, locally. So that data will not by lost if the MySQL container is vanished. 
