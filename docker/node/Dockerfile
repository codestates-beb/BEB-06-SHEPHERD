FROM hyperledger/besu:latest
COPY ./genesis.json ./
RUN mkdir data
# RUN --mount=type=bind,source=/configs,target=/opt/besu/configs
CMD [ "--config-file=configs/config.toml" ]
USER besu
ENTRYPOINT ["besu"]