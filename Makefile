build:
	sudo docker-compose build
up: 
	sudo docker-compose up -d
update: 
	sudo docker-compose up --detach --no-deps --build app
down: 
	sudo docker-compose -f docker-compose.yml down