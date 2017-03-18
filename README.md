# NODE-IG-API 0.x

This is the first exhaustive Node.js IG REST Trading & Streaming API. 
Similar APIs are available out there, however they all lack of key functionalities and proper documentation.

<p align="center">
  <img src="https://raw.githubusercontent.com/gfiocco/node-ig-api/master/instructions.gif" />
</p>

## Installation & Setup

Make a new directory for your project and cd into it.

    $ npm install node-ig-api

Create environment variables for your IG credentials. This can be done in your OSX/LINUX CLI as:

    $ export IG_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    $ export IG_IDENTIFIER=xxxxxxxxxxxx
    $ export IG_PASSWORD=xxxxxxxxxxxx
    $ export IG_DEMO=TRUE

or in your Windows CLI as:

    $ SET IG_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    $ SET IG_IDENTIFIER=xxxxxxxxxxxx
    $ SET IG_PASSWORD=xxxxxxxxxxxx
    $ SET IG_DEMO=TRUE

(clearly the "x" values should be your actual IG credentials and IG_DEMO should be FALSE for the live version!)

Create a test.js file which requires the package and calls the methods described in the documentation.

## Documentation

Please make yourself familiar with the REST Trading API Reference and Streaming API Reference available at https://labs.ig.com before getting started.

All modules (except connectToLightstreamer and subscribeToLightstreamer) return a promise that resolve and reject always into a Json object. When the request is successful the Json file will contain only the response body, whereas on failure it will contain the response status, header and body.

### Method Summary

Method | Description 
---|---
**[login](#login)** | Log in (retrieve client and session tokens)
**[logout](#logout)** | Log out (disable retrieved client and session tokens)
**[switchAcct](#switchAcct)** | Switch Account
**[acctInfo](#acctInfo)** | Returns a list of accounts belonging to the logged-in client
**[acctActivity](#acctActivity)** | Returns the account activity history
**[acctTransaction](#acctTransaction)** | Returns the transaction history
**[apiInfo](#apiInfo)** | List of client-owned applications
**[showOpenPositions](#showOpenPositions)** | Returns all open positions for the active account.
**[deal](#deal)** | Creates an OTC position
**[editPosition](#editPosition)** | Attach order to open position
**[closePosition](#closePosition)** | Closes an open position
**[closeAllPositions](#closeAllPositions)** | Closes all open positions
**[showWorkingOrders](#showWorkingOrders)** | Returns all open working orders for the active account
**[createOrder](#createOrder)** | Create a working order
**[deleteOrder](#deleteOrder)** | Delete existing working order
**[deleteAllOrders](#deleteAllOrders)** | Delete all existing working orders
**[search](#search)** | Search a contract
**[igVolume](#igVolume)** | Client sentiment (IG volume)
**[marketNode](#marketNode)** | Market node content
**[histPrc](#histPrc)** | Historical prices
**[epicDetails](#epicDetails)** | Shows all details of a contract (epic)
**[watchlists](#watchlists)** | Watchlists summary and watchlist content
**[createWatchlist](#createWatchlist)** | Create a new watchlist
**[deleteWatchlist](#deleteWatchlist)** | Delete entire watchlist 
**[addEpicWatchlist](#addEpicWatchlist)** | Insert single epic to watchlist
**[removeEpicWatchlist](#removeEpicWatchlist)** | Remove single epic to watchlist
**[get](#get)** | Get request on IG api 
**[del](#del)** | Delete request on IG api
**[put](#put)** | Put request on IG api
**[post](#post)** | Post request on IG api
**[connectToLightstreamer](#connectToLightstreamer)** | Connect to Lightstreamer (Streaming of data)
**[subscribeToLightstreamer](#subscribeToLightstreamer)** | Subscribe to Lightstreamer (Streaming of data)

<br>

### Method Detail

### Account

<a name="login"></a>
**login(encryption)**

Store in the file system a Json file containing the IG tokens valid for 12 hours. After the first log-in, this API will allow you to run other IG Rest requests without the need to log-in again. It is pivotal that you log-in before any request.

Property   | Description                               | Type    | Default |
-----------| ----------------------------------------- | ------- | --------|
encryption | encrypting the password before logging-in | Boolean | false   |  

---
<a name="logout"></a>
<br>
**logout()**

Destroy the IG tokens stored in the file system and disable them within the IG account.

---
<a name="switchAcct"></a>
<br>
**switchAcct(accountId)**

Switch between different accounts (e.g. from CFD to Spread Betting)

Property  | Description     | Type   | Default |
--------- | ----------------| ------ | --------|
accountId | Account code ID | String |         |

---
<a name="acctInfo"></a>
<br>
**acctInfo()**

Returns a list of accounts belonging to the logged-in client

---
<a name="acctActivity"></a>
<br>
**acctActivity(from, to, detailed, dealId, pageSize)**

Returns the account activity history

Property  | Description                     | Type 	 | Default      |
----------| --------------------------------| -------| -------------| 
from      | Has to have format: YYYY-MM-DD  | String | 1990-01-01   |
to        | Has to have format: YYYY-MM-DD  | String | 2099-01-01   |
detailed  | Detailed output                 | String | false        |
dealId    | Activity on specific dea        | String |              |
pageSize  | Output page size                | Number | 500          |

---
<a name="acctTransactions"></a>
<br>
**acctTransactions(type, from, to, pageSize, pageNumber)**

Returns the transaction history for the specified transaction type and period

Property    | Description 												| Type 	 |  Default			|
------------| ------------------------------------| -------| -------------|
type        | ALL, ALL_DEAL, DEPOSIT, WITHDRAWAL 	| String | ALL          |
from        | Has to have format: YYYY-MM-DD			| String | 1990-01-01   |
to          | Has to have format: YYYY-MM-DD 			| String | 2099-01-01   |
pageSize    | Output page size                    | Number | 500          |
pageNumber 	| Output page size                    | Number | 1            |

---
<a name="apiInfo"></a>
<br>
**apiInfo()**

Returns details of all the API Key of the logged-in client

----
<br>

### Dealing 

<a name="showOpenPositions"></a>
**showOpenPositions()**

Returns all open positions for the active account 

---
<a name="deal"></a>
<br>
**deal(ticket)**

Execute a market order in the active account

Property  | Description       | Type        | Default	|
----------| ----------------- | ------------| --------|
ticket    | See example below | Json object |         |

```javascript
ticket = {
	'currencyCode': 'GBP',
	'direction': 'BUY', // 'BUY' or 'SELL'
	'epic': 'CC.D.LCO.USS.IP',
	'expiry': 'DFB',
	'size': 2,
	'forceOpen': true, // if true a new order will not cancel out existing one; has to be true for any LIMIT order type
	'orderType': 'MARKET', // 'LIMIT' or 'MARKET'
	'level': null, // specify only when orderType = LIMIT
	'limitDistance': null, // close when profit exceeds limitDistance points
	'limitLevel': null, // close at profit when price close to limitLevel price
	'stopDistance': null, // close when loss exceeds stopDistance points
	'stopLevel': null, // close at loss when price close to limitLevel price
	'guaranteedStop': false,
	'timeInForce': 'FILL_OR_KILL', // 'FILL_OR_KILL' or 'EXECUTE_AND_ELIMINATE'
		// 'FILL_OR_KILL': will try to fill this entire order within the constraints set by {order_type} and {level}, however if this is not possible then the order will not be filled at all
		// 'EXECUTE_AND_ELIMINATE': will fill this order as much as possible within the constraints set by {order_type} and {level}
	'trailingStop': null,
	'trailingStopIncrement': null
};
```

---
<a name="editPosition"></a>
<br>
**editPosition(dial_id, ticket)**

Attach and order to an existing position

Property | Description              | Type        | Default	|
---------| -------------------------| ------------| --------|
dial_id  | ID code of open position | String      |         |
ticket   | See example below        | Json object |         |

```javascript
ticket = {
	'limitLevel': 5700, // close position at profit when price hit 5700 level
	'stopLevel': 5000, // close position at loss when price hit 5000 level
	'trailingStop': false,
	'trailingStopDistance': null,
	'trailingStopIncrement': null
};
```

---
<a name="closePosition"></a>
<br>
**closePosition(dealId)**

Close an existing position at available market price (i.e. 'orderType': 'MARKET')

Property  | Description               | Type        | Default	|
----------| --------------------------| ------------| --------|
dealId    |  ID code of open position | Json object |         |

---
<a name="closeAllPositions"></a>
<br>
**closeAllPositions()**
Closing all open positions at available market price (i.e. 'orderType': 'MARKET')

----
<br>

### Working orders

<a name="showWorkingOrders"></a>
**showWorkingOrders()**

Returns any active working order for the active account

<a name="createOrder"></a>
<br>
**createOrder(ticket)**

Create a working order

Property  | Description       | Type        | Default	|
----------| ----------------- | ------------| --------|
ticket    | See example below | Json object |         |

```javascript
let ticket = {
	'currencyCode': 'GBP',
	'direction': 'BUY', // 'BUY' or 'SELL'
	'epic': 'IX.D.FTSE.DAILY.IP',
	'expiry': 'DFB',
	'size': 1.5,
	'forceOpen': true, // if true a new order will not cancel out existing one; has to be true for any LIMIT order type
	'type': 'LIMIT', //'LIMIT' or 'STOP'
	// LIMIT: enter when PRC <= LEVEL
	// STOP: enter when PRC >= LEVEL
	// e.g. if PRC = 7200
	// BUY LIMIT 7000 -> will enter when PRC <= 7000
	// BUY LIMIT 7500 -> REJECTED because would enter immediately 
	// BUY STOP 7000 -> REJECTED because would enter immediately
	// BUY STOP 7500 -> will enter the position when PRC >= 7500
	'level': 7000, // specify only when orderType = LIMIT
	'limitDistance': null, // close when profit exceeds limitDistance points
	'limitLevel': 7250, // close at profit when price close to limitLevel price
	'stopDistance': null, // close when loss exceeds stopDistance points
	'stopLevel': null, // close at loss when price close to limitLevel price
	'guaranteedStop': false,
	'timeInForce': 'GOOD_TILL_CANCELLED', // or 'GOOD_TILL_DATE'; if timeInForce equals GOOD_TILL_DATE, then set goodTillDate
	'goodTillDate': null // yyyy/mm/dd hh:mm:ss in UTC Time or Unix Timestamp in milliseconds
};
```

<a name="deleteOrder"></a>
<br>
**deleteOrder(orderId)**

Delete a specific existing working orders

<a name="deleteAllOrders"></a>
<br>
**deleteAllOrders()**

Delete all existing working orders

----
<br>

### Markets info

<a name="search"></a>
**search(searchTerm)**

Search a contract with a specific word

Property   | Description | Type   | Default	|
-----------| ------------| ------ | --------|
searchTerm | Search term | String |         |

<a name="igVolume"></a>
<br>
**igVolume(epics)**

Shows IG clients' percentage long/short positions per contract group

Property  | Description        | Type         | Default	|
----------| -----------------  | ------------ | --------|
epics     |  List of epics     | String Array |         |

<a name="marketNode"></a>
<br>
**marketNode(id)**

IG API is grouping all their product into three nodes. So you will obtain a generic specification of all contracts by running marketNode(). Thereafter you will find more details by moving into a tree structure with marketNode(id).

Property  | Description       | Type   | Default	|
----------| ----------------- | ------ | -------- |
id        | Node ID           | Number |    0     |

<a name="histPrc"></a>
<br>
**histPrc(epic, resolution, from, to)**

IG historical prices for a specific contract (IG API policy allows you to obtain no more than 10000 historical data points per week)

Property   | Description                             | Type        | Default	|
-----------| ----------------------------------------| ------------| ---------|
epic       | epic code of contract                   | String|     |          |
resolution | DAY, HOUR, HOUR_2, HOUR_3, HOUR_4, MINUTE, MINUTE_10, MINUTE_15, MINUTE_2, MINUTE_3,MINUTE_30, MINUTE_5, MONTH, SECOND, WEEK| String ||
from       | Has to have format: YYYY-MM-DDTHH:MM:SS | String |               | 
to         | Has to have format: YYYY-MM-DDTHH:MM:SS | String |               |

<a name="epicDetails"></a>
<br>
**epicDetails(epics)**

Shows all details of a contract (epic) or a list of contracts (list of epics)

Property | Description   | Type         | Default	|
---------| ------------  | -------------| --------|
epics    | List of epics | String Array |         |

----
<br>

### Watchilists

<a name="watchlists"></a>
<br>
**watchlists(id)**

When id is undefined the module returns a summary list of all existing watchlists. Otherwise the module will return details of a specific watchlist

Property | Description   | Type   | Default	  |
---------| ------------  | ------ | ----------|
id       | Watchilist ID | String | undefined |

<a name="createWatchlist"></a>
<br>
**createWatchlist(name, epics)**

Create a new watchlist

Property | Description                                              | Type         | Default	|
---------| ---------------------------------------------------------| -------------|----------|
name     | Name of the watchlist that is being created              | String       |          |
epics    | List of epics to be added in the newly created watchlist | String Array |          |

<a name="deleteWatchlist"></a>
<br>
**deleteWatchlist(id)**

Delete entire watchlist

Property | Description   | Type   | Default	  |
---------| ------------  | ------ | ----------|
id       | Watchilist ID | String |           |

<a name="addEpicWatchlist"></a>
<br>
**addEpicWatchlist(epic, watchlistID)**

Insert single epic to watchlist

Property    | Description                        | Type   | Default	|
------------| -----------------------------------| -------|---------|
epic        | Epics to be added to the watchlist | String |         |
watchlistID | Watchilist ID                      | String |         |


<a name="removeEpicWatchlist"></a>
<br>
**removeEpicWatchlist(epic, watchlistID)**

Remove single epic from a specific watchlist

Property    | Description                            | Type   | Default	|
------------| ---------------------------------------| -------|---------|
epic        | Epics to be removed from the watchlist | String |         |
watchlistID | Watchilist ID                          | String |         |


----
<br>

### Generic IG REST Requester

<a name="get"></a>
**get(url, version)**

<a name="del"></a>
**del(url, payload, version)**

<a name="put"></a>
**put(url, payload, version)**

<a name="post"></a>
**post(url, payload, version)**

Property | Description                     | Type        | Default |
---------| --------------------------------| ------------|---------|
url      | url for REST request            | String      |         |
payload  | body of the request             | Json Object |         |
version  | IG version for specific request | Number      |     1   |

----
<br>

### Generic IG REST Requester

These modules should be used as starting point for your personal IG streaming API. This is probably the first and only implementation of the IG REST Streaming API. 

<a name="removeEpicWatchlist"></a>
**connectToLightstreamer()**

Create a Lightstreamer session by using the tokes that have been retrieved with login(). This will allow you to create a Subscription

<a name="removeEpicWatchlist"></a>
<br>
**subscribeToLightstreamer(subscriptionMode, items, fields, maxFreq)**

Subscribe to Lightstreamer. In other words, you subscribe to a list of contracts in Lightstreamer and this will stream live data (e.g. price) in your console. You can edit this module to store data in database or automate some trades.

Property | Description                           | Type         | Default	|
-----------------| ------------------------------| ------------ | ------- |
subscriptionMode | MERGE, DISTINCT, RAW, COMMAND | Array        |         |
items            | List of epics                 | String Array |         |
fields           | MID_OPEN, HIGH, LOW, CHANGE, CHANGE_PCT, UPDATE_TIME, MARKET_DELAY, MARKET_STATE, BID, OFFER, STRIKE_PRICE, ODDS | String | |
maxFreq          | Number of maximum updates per second per epic | Number | infinite |
