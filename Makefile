PROJECT_NAME=frontend
IMAGE_PATH = /chainverse/frontend
TAG = latest


build:
	docker build -t $(PROJECT_NAME):$(TAG)  . 

run:
	docker run -e JOB_MODE=$(MODE) -d -t $(PROJECT_NAME):$(TAG)

publish:
	$(MAKE) build PROJECT_NAME=$(REGISTRY_NAME)$(IMAGE_PATH) TAG=$(TAG)
	docker push $(REGISTRY_NAME)$(IMAGE_PATH):$(TAG)
