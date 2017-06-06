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

    //parameters need to be set while setting context
    const parameters = {};
    parameters["baseNum"] = baseNum;
    app.setContext("base-given", 5, parameters);

    app.ask("Now give me the number that you want to compare " + baseNum + " with");
  }

  function setCompareNum(app){
    console.log("inside set compare num");
    var compNum = app.getArgument("compNum");

    //getContextArgument functions returns an object, the actual value is inside .value
    var baseNumObj = app.getContextArgument("base-given", "baseNum");
    var baseNum = baseNumObj.value;

    console.log("compNum: " + compNum);
    console.log("baseNum: " + baseNum);
    if(baseNum > compNum) {
      app.tell("Your first number is bigger than the second number. Give me another number");
    }
    else{
      app.tell("Your second number is bigger than the first number. Give me another number");
    }
  }

  const actionMap = new Map();
  actionMap.set('input.welcome', welcomeIntent);
  actionMap.set('set.baseNum', setBaseNum);
  actionMap.set('set.compareNum', setCompareNum);
  app.handleRequest(actionMap);
});

restService.listen((process.env.PORT || 5000), function() {
  console.log("Server listening");
});
