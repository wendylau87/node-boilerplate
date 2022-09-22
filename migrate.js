const {config, logger} = require("adira-sdk-node");
const DBMigrate = require("db-migrate");
config.loadAndReplaceConfig().then(cfg=>{
    process.env["DB_USER"] = cfg.application.database.mysql.username;
    process.env["DB_PASSWORD"] = cfg.application.database.mysql.password;
    process.env["DB_HOST"] = cfg.application.database.mysql.host;
    process.env["DB_NAME"] = cfg.application.database.mysql.name;
    const dbm = DBMigrate.getInstance(true);
    dbm.up().then(res=>{
        logger.info(res);
    })

})



