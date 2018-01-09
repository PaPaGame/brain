const port = Number.parseInt(process.env.PORT) || 9050;

export default {
    port: port,
    hostName: 'http://localhost:' + port,
    serveStatic: true,
    assetHost: '',
}