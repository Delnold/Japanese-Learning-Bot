FROM mongo:6.0
COPY /docker-scripts/mongorestore.sh /docker-entrypoint-initdb.d/mongorestore.sh
COPY /data/dump /db-dump
CMD ["mongod"]