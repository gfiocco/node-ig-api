'use strict';

const util = require('util'); // we will use util.inspect() to inspect some outputs
const ig = require('./index');

ig.login(true).then(r => console.log(util.inspect(r.accountType, false, null))).catch(e => console.log(e));

// ig.logout().then(r => console.log(util.inspect(r, false, null))).catch(e => console.log(e));

// let ticket = {
// 	'currencyCode': 'GBP',
// 	'direction': 'BUY',
// 	'epic': 'CC.D.LCO.USS.IP',
// 	'expiry': 'DFB',
// 	'size': 2,
// 	'forceOpen': true,
// 	'orderType': 'MARKET',
// 	'level': null,
// 	'limitDistance': null, 
// 	'limitLevel': null, 
// 	'stopDistance': null, 
// 	'stopLevel': null,
// 	'guaranteedStop': false,
// 	'timeInForce': 'FILL_OR_KILL',
// 	'trailingStop': null,
// 	'trailingStopIncrement': null
// };

// ig.deal(ticket).then(r => console.log(util.inspect(r, false, null))).catch(e => console.log(e));

// ig.showOpenPositions().then(r => console.log(util.inspect(r, false, null))).catch(e => console.log(e));

// ig.histPrc('CC.D.LCO.USS.IP', 'HOUR_4', '2017-03-01T00:00:00', '2017-03-01T20:00:00').then(r => console.log(util.inspect(r, false, null))).catch(e => console.log(e));

// ig.marketNode(591262).then(r => console.log(util.inspect(r, false, null))).catch(e => console.log(e));

// ig.get('/positions').then(r => console.log(util.inspect(r, false, null))).catch(e => console.log(e));

///////////////////
// Lightstreamer //
///////////////////

// var subscriptionMode = 'MERGE'; 
// var items = ['L1:CS.D.AUDUSD.TODAY.IP', 'L1:CS.D.EURUSD.TODAY.IP'];
// var fields = ['UPDATE_TIME', 'BID', 'OFFER'];

// ig.connectToLightstreamer();
// ig.subscribeToLightstreamer(subscriptionMode, items, fields, 0.5);
