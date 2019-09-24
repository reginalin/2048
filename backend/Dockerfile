# Build ARGs:
#   PYVERSION: specifies the Python/system version

ARG PYTHON_VERSION

#######################################################################
FROM python:${PYTHON_VERSION}-slim-stretch as base

RUN pip install poetry==0.12.16

# Set up app directory
WORKDIR /app

# Copy project setup files 
COPY poetry.lock /app/ 
COPY pyproject.toml /app/

# Copy project files
COPY . /app

#######################################################################
FROM base as test

# Install the project locally for testing purposes
RUN poetry install

## Run tests
ENTRYPOINT pytest 

#######################################################################
FROM base as development 

# Install the project locally for testing purposes
RUN poetry config settings.virtualenvs.create false
RUN poetry install --no-interaction

# initialize database
RUN python3 create_db.py

ENTRYPOINT python3 backend.py

#######################################################################
FROM base as release

# Build the release
RUN poetry config settings.virtualenvs.create false
RUN poetry install --no-dev --no-interaction

# initialize database
RUN python3 create_db.py

ENTRYPOINT python3 backend.py
