'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const ApiAiApp = require('actions-on-google').ApiAiApp;


const restService = express();
restService.use(bodyParser.json());

restService.post('/hook', function(req, res) {
  console.log('hook request');
  // console.log("req.body: ");
  // console.log(req.body);

  const app = new ApiAiApp({
    request: req,
    response: res
  });
  console.log(app.data);
  function anything(app){
    console.log("In anything function");
    app.tell('do you want to say anything?');
  }

  const actionMap = new Map();
  actionMap.set('any.thing', anything);
  app.handleRequest(actionMap);

  // try {
  //   var speech = 'empty speech';
  //
  //   if (req.body) {
  //     var requestBody = req.body;
  //
  //     if (requestBody.result) {
  //       speech = '';
  //
  //       if (requestBody.result.fulfillment) {
  //         speech += requestBody.result.fulfillment.speech;
  //         speech += ' ';
  //       }
  //
  //       if (requestBody.result.action) {
  //         speech += 'action: ' + requestBody.result.action;
  //       }
  //     }
  //   }
  //
  //   console.log('result: ', speech);
  //
  //   return res.json({
  //     speech: speech,
  //     displayText: speech,
  //     source: 'apiai-webhook-sample'
  //   });
  // } catch (err) {
  //   console.error("Can't process request", err);
  //
  //   return res.status(400).json({
  //     status: {
  //       code: 400,
  //       errorType: err.message
  //     }
  //   });
  // }
});

restService.listen((process.env.PORT || 5000), function() {
  console.log("Server listening");
});
