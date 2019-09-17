IMAGE_BASE = game-frontend
NODE_VERSION = 10 

.PHONY: release

.PHONY: docker-build-%
docker-build-%:
	docker image build \
		--build-arg NODE_VERSION=$(NODE_VERSION) \
		--target=$* \
		-t $(IMAGE_BASE):$*-$(NODE_VERSION) \
		.

.PHONY: docker-run-%
docker-run-%: docker-build-%
	docker container run -p 3000:3000 --rm \
		$(IMAGE_BASE):$*-$(NODE_VERSION)

.PHONY: clean-%
clean-%:
	-docker image remove $(IMAGE_BASE):$*-$(NODE_VERSION)

#######################################################################
# Local dev
#######################################################################

.PHONY: setup
setup:  ## local: set up the system dependencies
	npm install
