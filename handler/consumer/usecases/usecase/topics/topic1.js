const {logger} = require("adira-sdk-node")
class Topic1{
    run(topic, partition, message){
        logger.info(`topic : ${topic}`);
        logger.info(`partition : ${JSON.stringify(partition)}`);
        logger.info(`message : ${message.value.toString()}`)
    }
}
const topic1 = new Topic1();
module.exports = topic1