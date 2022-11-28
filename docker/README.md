# Besu Node Docker
사설 이더리움 네트워크를 Besu 기반으로 구동하는 Docker 파일들입니다.

## Prerequsite
- docker

## How to
docker-compose.yml이 있는 폴더에 들어간 뒤
data 폴더 안에 key와 key.pub, 그리고 genesis.json을 추가합니다

docker compose up node 명령어를 실행하면
호스트 컴퓨터의 30303 포트로 p2p 통신을 받고, 0.0.0.0:8545로 JSON-RPC API를 접근할 수 있는 이더리움 노드가 생성됩니다.

실행이 되는지 확인한 뒤에는 configs폴더로 들어가서 node.toml 파일에 들어가
bootnodes=(enode 주소)를 새로 기입해주세요.

이후 실행 중인 container를 멈추시고 다시 docker compose up node -d를 실행해주세요.
백그라운드로 도커 이미지를 실행하게 됩니다.