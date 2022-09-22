const {config, logger, mysqlClient, redisClient, kafkaClient} = require('adira-sdk-node');
const app = require('./app');
const consumer = require("./handler/consumer");

async function handleServerReady(){
    const cfg = await config.loadAndReplaceConfig();
    mysqlClient.init(cfg);
    redisClient.init(cfg);
    kafkaClient.init(cfg);

    await Promise.all([mysqlClient.connect(), redisClient.connect(), kafkaClient.consumerConnect(), kafkaClient.producerConnect()]);
    consumer.run();
    logger.info(`[${config.get().service}] ready to serve...`);
}


const server = app.listen(config.get().port, handleServerReady);
async function handleGracefulShutdown(){
    logger.info("Trying to shutdown service...");
    await server.close();
    await Promise.all([mysqlClient.close(), redisClient.disconnect(), kafkaClient.disconnect()])
    logger.info(`[${config.get().service}] successfully shutdown...`);
    process.exit();
}
process.on("SIGINT", handleGracefulShutdown);
process.on("SIGTERM", handleGracefulShutdown);

module.exports = server

