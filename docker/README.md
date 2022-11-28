# Besu Node Docker
사설 이더리움 네트워크를 Besu 기반으로 구동하는 Docker 파일들입니다.

## Prerequsite
- docker
- hyperledger/besu 이미지

## How to
docker가 설치되어있을 경우, 먼저 docker pull hyperledger/besu를 실행하여 Besu 이미지를 설치합니다.

```
docker pull hyperledger/besu
```

docker-compose.yml이 있는 폴더에 들어간 뒤
data 폴더 안에 keys라는 폴더를 새로 생성하고 key와 key.pub를 추가합니다.
그리고 data 폴더 자체에 genesis.json을 추가합니다.

```
docker
|-configs
|-data
  |-keys
    |-key
    |-key.pub
  |-genesis.json
|-docker-compose.yml
```

상위 폴더인 docker로 돌아가서 docker compose up node 명령어를 실행하면
호스트 컴퓨터의 30303 포트로 p2p 통신을 받고, 0.0.0.0:8545로 JSON-RPC API를 접근할 수 있는 이더리움 노드가 생성됩니다.

실행이 되는지 확인한 뒤에는 configs폴더로 들어가서 node.toml 파일에 들어가
bootnodes=(enode 주소)를 새로 기입해주세요.

```
# Valid TOML config file
data-path="data" # Path
discovery-enabled=true
node-private-key-file="./keys/key"

# 중요! 이곳에 부트노드의 노드주소를 적기
bootnodes=[ "enode://<부트 노트의 공유키>@<아이피>:30303" ]

# Chain
genesis-file="genesis.json"

# p2p
p2p-port=30303

# RPC
rpc-http-enabled=true
rpc-http-api=["ETH","NET","QBFT","ADMIN"]
host-allowlist=["*"]
rpc-http-cors-origins=["*"]
rpc-http-port=8545
```

이후 실행 중인 container를 멈추시고 다시 docker compose up node -d를 실행해주세요.
백그라운드로 도커 이미지를 실행하게 됩니다.