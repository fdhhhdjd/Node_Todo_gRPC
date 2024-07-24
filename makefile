test:
	docker ps

################# DOCKER COMPOSE #################
DOCKER_COMPOSE_DEV := docker-compose.dev.yml
DOCKER_COMPOSE_PROD := docker-compose.prod.yml


################# DOCKER HUB #################

SERVICE_USER_IMAGE := nguyentientai/service_users:lastest

################## DOCKER FILE PATH ##################
DOCKER_FILE_PATH := ./docker/Dockerfile

################## DEV ##################
build-dev:
	docker-compose -f $(DOCKER_COMPOSE_DEV) up -d --build

down-dev:
	docker-compose -f $(DOCKER_COMPOSE_DEV) down

service-user-image-tag:
	docker build -t $(SERVICE_USER_IMAGE) -f $(DOCKER_FILE_PATH) .

push-service-user:
	docker push $(SERVICE_USER_IMAGE)

build-push-service-user: service-user-image-tag push-service-user
	@echo "Build and push service user image success"

################## PROD ##################
build-prod:
	docker-compose -f $(DOCKER_COMPOSE_PROD) up -d --build

down-prod:
	docker-compose -f $(DOCKER_COMPOSE_PROD) down












