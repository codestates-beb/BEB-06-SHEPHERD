FROM hyperledger/besu:latest
USER besu
COPY ./configs/node.toml ./configs
COPY ./data/genesis.json ./data
ENTRYPOINT ["besu"]