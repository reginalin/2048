IMAGE_BASE = game-backend
PYTHON_VERSION = 3.7.3

.PHONY: release

.PHONY: docker-build-%
docker-build-%:
	docker image build \
		--build-arg PYTHON_VERSION=$(PYTHON_VERSION) \
		--target=$* \
		-t $(IMAGE_BASE):$*-$(PYTHON_VERSION) \
		.

.PHONY: docker-run-%
docker-run-%: docker-build-%
	docker container run -p 5000:5000 --rm \
		$(IMAGE_BASE):$*-$(PYTHON_VERSION)

.PHONY: clean-%
clean-%:
	-docker image remove $(IMAGE_BASE):$*-$(PYTHON_VERSION)

.PHONY: db
db:
	rm *.db; \
	python create_db.py

#######################################################################
# Local dev
#######################################################################

.PHONY: setup
setup:  ## local: set up the system dependencies
	poetry install
	poetry run pre-commit install
