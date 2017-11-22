# Sitecore Log Tracker
User-Friendly UI, that runs on Node, to scan the data folder and show you all the logs in a beautiful formatted way.

![Path](/images/log-view-content.PNG?raw=true "Log View Content")

## Install the Sitecore package
You can find the zip file in the sitecore folder of this repository
## Install and run Node application
You need to place it in the `sitecore\Website\sitecore\logTracker` and then run it with the command in cmd `node server.js`
You need to make sure you can access it at `http://localhost:8000/`
When you access the Sitecore and go to Desktop you should see the the Log Tracker When you click on start button

![Desktop](/images/desktop.PNG?raw=true "The way it looks in Start Menu")

# Configurations for Node Application
In order to change the path locate of your instance you need to edit `server.js` and update the line:

`var LocalLink = 'C:/inetpub/wwwroot/sitecore/Data/logs/';` - this is where you specify your path to the Data folder.

Everything that is related to your instance and your log files, can be edited in the server.js file starting at line 73.

This is my first extension for Sitecore and please let me know how I can improve it.

Regards,
Tony

# Configurations for Sitecore Application

If you wish to place the node application somewhere, else you need to change the path for the layout in Sitecore:

core: /sitecore/layout/Layouts/Log Tracker/Log Tracker

![Path](/images/path.PNG?raw=true "Change the path")
