FROM hyperledger/besu:latest
USER besu
RUN mkdir configs
RUN mkdir data
COPY ./configs/config.toml ./configs
COPY ./data/genesis.json ./data
ENTRYPOINT ["besu"]