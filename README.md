[![SmartSlack](https://img.shields.io/badge/smart-slack-e61870.svg)](https://github.com/philliphenslee/smartslack)
[![Node Module](https://img.shields.io/badge/node.js-module-82bb22.svg)](https://github.com/philliphenslee/smartslack)
[![Travis branch](https://img.shields.io/travis/philliphenslee/smartslack/master.svg)](https://travis-ci.org/philliphenslee/smartslack)
[![Coverage Status](https://coveralls.io/repos/philliphenslee/smartslack/badge.svg?branch=master&service=github)](https://coveralls.io/github/philliphenslee/smartslack?branch=master)
[![npm version](https://badge.fury.io/js/smartslack.svg)](https://badge.fury.io/js/smartslack)
[![License](http://img.shields.io/badge/license-MIT-lightgrey.svg)](https://raw.githubusercontent.com/philliphenslee/smartslack/master/LICENSE)
[![NPM](https://nodei.co/npm/smartslack.png?compact=true)](https://nodei.co/npm/smartslack/)
## Overview
***SmartSlack*** is a Node.JS module for [*Slack's*](https://slack.com) Real Time Messaging API. *SmartSlack* implements all of the *Slack* API methods available to a bot user. This module is intended to be used as a foundation for building custom *Slack* bots.


## Installation
```
npm install smartslack
```
## Basic Usage

Creating a new instance of *SmartSlack* and sending a message to *Slack*

``` javascript
var SmartSlack = require('smartslack');

// Configure options
var options = { token: 'xxxx-01234567890-ABCDEFGHIJKLMNOPQRSTUVWX'};

// Create new instance
var slackClient = new SmartSlack(options);

// Listen for errors...
slackClient.on('error',function(error) {
    console.log(error);
}

// Start the Slack RTM session...
slackClient.start();

var message = 'Hello Channel!';

slackClient.on('connected',function() {

    // Send a message to #general
    slackClient.sendToChannel('general',message);
});

slackClient.on('message', function(message) {
console.log(message);
});
```
## Events

* **connected** : Event fired after reciept of the hello event message from the RTM API
* **error** : Emitted anytime the web socket emits an error or after https request errors
* **eventmessage** This event is emitted after receiving any RTM event message
* **message** Emitted when an event message of type message is recevied
* **open** Emmited when the websocket is open
* **close** Emitted when the websocket is closed

See the Node.JS documentation for more information on EventEmitter.
[https://nodejs.org/api/events.html](https://nodejs.org/api/events.html)

## Methods

Sending message to Slack via the API. Use these methods if you require attachments or other optional message arguments.

**postDirectMessage(user, text [args, callback])**

The user argument can be the user's id, name or email address.

``` javascript
slackClient.postDirectMessage('user@somedoman.com', 'message text');
```

**postMessage(channel, text [args, callback])**

The channel argument can be the channel id or name (i.e. general).
``` javascript
slackClient.postMessage('general', 'message text');
```

**Post as another bot instead of the authenticated bot user.**
``` javascript
// Create message options
options = {};
options.as_user = false;
options.username = 'SmartSlack';
options.icon_emoji = ':bulb:';

// Send the message via the API
slack.PostMessage('general', 'A message from SmartSlack', options);
```
![Post As Bot](http://ph2.us/github/smartslack/post_as_smartslack.png)


**Post with a message attachment**
For more information on attachments, review the [***Slack*** API documentation](https://api.slack.com/docs/attachments).

``` javasscript
var options = {};
options.as_user = false;
options.username = 'SmartSlack';
options.icon_emoji = ':bulb:';
options.attachments = [];

// Create the attachement
var attachment = client.createAttachment('The attachment title');
    attachment.text = 'This is the attachment message';
    attachment.fallback = 'This is the text message of the attachment';
    attachment.pretext = 'This is the attachment pretext';
    attachment.color = 'good';
    attachment.author_name = 'Author Name';
    attachment.addField('Field 1','Field 1 Value', true);
    attachment.addField('Field 2','Field 2 Value', true);
    options.attachments.push(attachment);

// Send the message via the API
slack.PostMessage('general', '', options);
```
![Post As Bot](http://ph2.us/github/smartslack/post_attachment.png)
#### Use these methods to send via the RTM socket


**sendToChannel(channel, text [callback])**

**sendToGroup(group, text [callback])**

**sendToUser(username, text [callback])**

The user argument can be the user's id, name or email address'
``` javascript

// Send some  real time message's
client.sendToUser('phillip', 'Hello Channel!');

client.sendToGroup('private-group', 'Hello Group!');

client.sendToChannel('general', 'Hello Channel!');

```
## License
MIT Copyright © [Phillip J. Henslee II](https://github.com/philliphenslee/smartslack/blob/master/LICENSE)















