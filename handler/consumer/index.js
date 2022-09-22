const {kafkaClient, config} = require("adira-sdk-node");
const getTopics = ()=>{
    let topicList = [];
    const cfg = config.get();
    for (const key in cfg.application.kafka.consumer.topics) {
        topicList.push(`${cfg.application.kafka.consumer.topics[key]}`);
    }
    return topicList;
}

class Consumer{
    async subscribeAllTopics(){
        const list = [];
        for(const topic of getTopics()){
            console.log(topic);
            list.push(kafkaClient.subscribe(topic));
        }
        await Promise.all(list)
    }

    async run(){
        await this.subscribeAllTopics();
        kafkaClient.getConsumer().run({
            eachMessage: async ({ topic, partition, message }) => {
                const path = topic.split(".");
                const task = require(`./usecases/${path[1]}/topics/${path[2]}`);
                task.run(topic, partition, message);
            },
        });
    }
}

const consumer = new Consumer();
module.exports = consumer;
