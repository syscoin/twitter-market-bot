var fs = require('fs');
var syscoin = require('syscoin');
var twitter = require('node-twitterbot');

var sysClient = new syscoin.Client({
      host: "127.0.0.1",
      port: "8337",
      user: "rpcuser",
      pass: "asdfkjdfhvkchbkhadkjwhekfbevsdbdcksjdhfksjkfklshfk",
      timeout: 5000
  });

var guidHistory; //map of the GUIDs that have been tweeted
var marketMonitorInterval;

//APP startup
initTweetHistory();
startMarketMonitor();
//---

function initTweetHistory() {
  fs.readFile('history/guids.json', 'utf8', function (err, data) {
    if (err) {
      return console.log("An error occured: " + err);
    }
  
    guidHistory = JSON.parse(data);
  });
}

function startMarketMonitor() {
  console.log("Market monitor started.");
  marketMonitorInterval = setInterval(checkForNewOffers, 5000);
}

function stopMarketMonitor() {
  console.log("Market monitor stopped.");
  clearInterval(marketMonitorInterval);
}

function checkForNewOffers() {
  console.log("Checking for new offers that haven't been tweeted...");
  var latestOffers = sysClient.offerFilter(" ", function(err, result, resHeaders) {
    if (err) {
      console.log("Error" + err);
      stopMarketMonitor();
    }
    
    //console.log("Offers:" + result);
    processMarketOffers(result);
  });
}

function processMarketOffers(offers) {
  for(var i = 0; i < offers.length; i++) {
    console.log("offer:", offers[i]);
    if(guidHistory[offers[i].guid] != undefined) {
      tweetOffer(offers[i]); //this offer isn't in history yet, so tweet it
    }  
  }
}

function addOfferToHistory(offer) {
  
}

function tweetOffer(offer) {
  //after tweet succcess, log the offer GUID
  //addOfferToHistory(offer);
}