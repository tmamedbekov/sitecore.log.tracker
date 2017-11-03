# Sitecore Log Tracker
Beautiful UI, that runs on Node, to scan the data folder and show you all the logs in a beautiful formatted way.

## Step 1 Install the Sitecore package
## Step 2 Node application needs to be running before you can access it in from Sitecore
You need to place it in the `sitecore\Website\sitecore\logTracker` and then run it with the command in cmd `node server.js`
You need to make sure you can access it at `http://localhost:8000/`
When you access the Sitecore and go to Desktop you should see the the Log Tracker When you click on start button

![Desktop](/images/desktop.PNG?raw=true "The way it looks in Start Menu")

# Configurations
In order to change the path locate of your instance you need to edit `server.js` and update the line:

`var LocalLink = 'C:/inetpub/wwwroot/sitecore/Data/logs/';` - this is where you specify your path to the Data folder.

Everything that is related to your instance and your log files, can be edited in the server.js file starting at line 73
