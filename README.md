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
      - uses: actions/setup-node@v1
        with:
          node-version: 12
          registry-url: https://registry.npmjs.org/
      - name: Deploy
        uses: containerful/action@master
        with:
          docker_compose_path: ./docker-compose.yml
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

