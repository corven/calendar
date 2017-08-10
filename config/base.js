module.exports = {
  listen: {
    hostname: '127.0.0.1',
    port: 8000,
  },
  mongodb: {
    url: 'mongodb://127.0.0.1:27017/calendar',
    options: {
      db: {
        bufferMaxEntries: 0,
        w: 1,
        j: true,
      },
      server: {
        reconnectTries: Number.MAX_SAFE_INTEGER,
        reconnectInterval: 1000,
      },
    },
  },
};
