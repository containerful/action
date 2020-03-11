# Containerful Action

Deploy your `docker-compose` using the github action
Uses the github token to authenticate to containerful

## Usage

```yml
name: Deploy docker-compose
on:
  push:
    branches:
      - master
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Login to push containers
        uses: azure/docker-login@v1
        with:
          login-server: gcr.io
          username: yourusername
          password: ${{ secrets.DOCKER_PASSWORD }}
      - name: Deploy
        uses: containerful/action@master
        with:
          build: true # Also builds and pushes your docker imaged
          docker_compose_path: ./docker-compose.yml
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

