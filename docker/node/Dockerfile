FROM hyperledger/besu:latest
USER besu
ADD ./configs/node.toml ./configs
ADD ./data/genesis.json ./
ENTRYPOINT ["besu"]