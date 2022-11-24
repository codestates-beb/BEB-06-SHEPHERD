FROM hyperledger/besu:latest
USER besu
COPY ./genesis.json ./
RUN mkdir data
RUN --mount=type=bind,source='$(pwd)'/configs,target=/opt/besu/configs
CMD [ "--config-file=/configs/config.toml" ]
ENTRYPOINT ["besu"]