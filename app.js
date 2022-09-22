const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const {integrationAttachContext, integrationGenerateContext, integrationAttachResponseBody} = require("adira-sdk-node");


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: 'application/json'
}));

app.use(integrationAttachResponseBody);
app.use(integrationGenerateContext);
app.use(integrationAttachContext);

app.use('/', require('./routes'));
module.exports = app;