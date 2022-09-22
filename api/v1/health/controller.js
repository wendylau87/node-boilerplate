const {logger, mysqlClient, redisClient, kafkaClient} = require('adira-sdk-node');


exports.healthCheck = async function(req, res){
    const context = req.context
    try{
        // TODO CHECK DB CONNECTION
        logger.infoWithContext(logger.getContext(), "Message dengan context");
        const sqlRes = await mysqlClient.connect();
        if(sqlRes === false){
            throw new Error("Failed to connect database...");
        }

        // TODO CHECK REDIS CONNECTION
        const redisRes = await redisClient.ping();
        if(redisRes !== "PONG"){
            throw new Error("Failed to connect redis...");
        }

        // TODO CHECK KAFKA HEARTBEAT
        const kafkaConsumerRes = await kafkaClient.isHealthy();
        if(kafkaConsumerRes !== true){
            throw new Error("Kafka client not healthy...");
        }

        return res.status(200).json({"status":"healthy"});
    }
    catch (error){
        logger.errorWithContext(context, error, error.message);
        return res.status(503).json({"status":"service unavailable"});
    }






}