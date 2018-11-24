const port = Number.parseInt(process.env.PORT) || 9050;

export default {
  port: port,
  hostName: '//localhost:' + port,
  serveStatic: true,
  assetHost: '',
  tokenSecret: 'test',
  accessControlAllowOrigin: '//localhost:8080/'
};
