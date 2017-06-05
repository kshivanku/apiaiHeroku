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

  //creating the APIAI app
  const app = new ApiAiApp({
    request: req,
    response: res
  });

  function welcomeIntent(app){
    console.log("inside welcome");
    app.ask("Welcome to compare numbers game! Give me the first number");
  }

  function setBaseNum(app){
    console.log("Inside set base");
    //getArgument is to get something from the parameters
    var baseNum  = app.getArgument("baseNum");
    const parameters = {};
    parameters["baseNum"] = baseNum;
    app.setContext("base-given", 5, parameters);
    app.ask("Now give me the number that you want to compare " + baseNum + " with");
  }

  function setCompareNum(app){
    console.log("inside set compare num");
    var someName = app.getArgument("someName");
    var baseNum = app.getContextArgument("base-given", "baseNum");
    // var baseNum = baseNumObj.value;
    console.log("someName: " + someName);
    console.log("baseNum:");
    console.log(baseNum);
    if(baseNum > 100) {
      app.tell("Your first number is bigger than the second number");
    }
    else{
      app.tell("Your second number is bigger than the first number");
    }
  }

  const actionMap = new Map();
  actionMap.set('input.welcome', welcomeIntent);
  actionMap.set('set.baseNum', setBaseNum);
  actionMap.set('set.compareNum', setCompareNum);
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
