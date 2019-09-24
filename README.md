## Instructions
### Using docker compose
- Run
```
docker-compose up
```
- Go to localhost:3000 and voila!

### Using docker containers
- `cd` into `/backend` 
- Run `make docker-run-release`  
- `cd` into `/frontend`
- Run `make docker-run-release`  
- Go to localhost:3000

### Without using docker
- `cd` into `/backend` 
- Run 
```
poetry install
python backend.py
```
- `cd` into `/frontend`
- Run 
```
npm install
npm start
```
- Go to localhost:3000
