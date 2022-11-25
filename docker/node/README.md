# Besu Node Docker
사설 이더리움 네트워크를 Besu 기반으로 구동하는 Docker 파일들입니다.

## Prerequsite
- docker

## How to
genesis.json이 없다면 genesis-generator를 실행하여 로컬폴더에 생성합니다.
```
docker compose start node
```

cli 도구로 docker/node 폴더에 들어간 뒤 아래 명령어를 실행합니다.
```
docker compose build
docker compose compose
```

이후 node container를 실행합니다.
```
docker compose start node
```

cli 도구로 node container의 로그를 확인하고 싶다면 아래 명령어를 실행합니다.
```
docker attach node
```