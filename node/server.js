var express = require('express');
var fs = require('fs');
// var path = require('path');
var Hjson = require('hjson');
// var AnyJson = require('any-json');
var app = express();

var LocalLink = 'C:/inetpub/wwwroot/sitecore/Data/logs/';

// start the log function


app.get('/logJson', function (req, res) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0
    var yyyy = today.getFullYear();
    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    todayDate = yyyy + '' + mm + '' + dd;


    /*************Environment Check Start************/
    var logsFolder = "";
    var env = req.query.env;
    if (env) { env.toString().toUpperCase(); }

    if (env == "DEV") { logsFolder = DevLink; }
    else if (env == "QA") { logsFolder = QALink; }
    else if (env == "UAT") { logsFolder = UATLink; }
	else if (env == "LOCAL") { logsFolder = LocalLink; }
    else { logsFolder = LocalLink; }

    //for local environment:
    //logsfolder = LocalLink;

    /*************Environment Check End************/

    fs.readdir(logsFolder, (err, files) => {
        if (err) {
            res.send("[empty]");
            return;
        }
        var lines = [];
        files.forEach(function (filename) {

        //-------------------------------------------------------CHECK FOR DATE RANGE!!---------------------------------------------------------------------------
            var fileNameArray = filename.split('.');
            var fileDate = (fileNameArray[0] == "log") ? fileNameArray[1] : fileNameArray[2];

            if (fileDate <= req.query.endDate && fileDate >= req.query.startDate) {//check if date query matches files
              
                var logFileLines = fs.readFileSync(logsFolder + filename, 'ascii').toString().split("\n");

                // go through the list of logFileLines
                logFileLines.forEach(function (logFileLine) {
                    // if the current line matches AUDIT, it will be stored in the variable lines
                    if (logFileLine.match(/.*AUDIT*./)) {
                        lines.push(filename + " " + logFileLine + '\n');
                    }
                })
            }//match end

        })
        var output = "";

        output += lines;

        var str = output.split('\n');
        var output = "";
        var index = 0;
        var aLine = str[index];
        var fileName;
        var date;
        output += '[';
        while (aLine !== 'undefined' && aLine != null) {
            var aaa = /Line.*?:/g;
            var bbb = /id.*?}|root.*?}/g;
            var ccc = /[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/g;
            var ddd = /[(]home.*?:|[(]sitecore.*?:/g;
            // var eee = /\/HOME\/.*?\//g;
            var eee = /\/HOME\/.*?,/g;
            var fff = /\/sitecore\/.*?,/g;
            var ggg = /Login|Logout|Upload|Save item|Drag item|Rename item|Start editing|Attach|Set publishing targets|Set display name|Detach file|Create file|Recycle item|Add version|Recycle version|Save template|Set insert rules|Reset Masters field|Create standard values|Add from template|Create template|Duplicate item|Set layout details|Publishing|Publish/g;
            var hhh = /[a-zA-Z0-9-_.]+\.txt*/g;
            var pattern = /targets:PROD Site/g;
            var a, b, c, d, e, f, g, h;
            var a1, b1, d1;
            output += "{";
            //File
            if ((h = hhh.exec(aLine)) !== null) {
                h.forEach((hh, groupIndex) => {
                    fileName = hh;
                    var fileNameArray = hh.split('.');
                    var year = fileNameArray[1].substring(0, 4);
                    var month = fileNameArray[1].substring(4, 6);
                    var day = fileNameArray[1].substring(6 , 8);
                    
                    date = month + "/" + day + "/" + year;
                    output = output + `\n"Date":"${date}",\n`;                    
                });
            }
            else {
                output = output + `\n"File":"${fileName}",\n`;
            }
            //Line
            if ((a = aaa.exec(aLine)) !== null) {
                a.forEach((aa, groupIndex) => {
                    a1 = aa.split("Line ")[1].split(":")[0];
                    output = output + '"Line":"' + a1 + '",\n';
                });
            }
            else {
                output += '"Line":"",\n';
            }
            //Time
            if ((c = ccc.exec(aLine)) !== null) {
                c.forEach((cc, groupIndex) => {
                    output = output + `"Time":"${cc}",\n`;
                });
            }
            else {
                output += '"Time":"",\n';
            }
            //Author
            if ((d = ddd.exec(aLine)) !== null) {
                d.forEach((dd, groupIndex) => {
                    var usernames = /sitecore\\|home\\/g;
                    d1 = dd.split(usernames)[1].split(")")[0];
                    output = output + '"Author":"' + d1 + '",\n';
                });
            }
            else {
                output += '"Author":"",\n';
            }
            //Action
            if ((g = ggg.exec(aLine)) !== null) {
                g.forEach((gg, groupIndex) => {
                    output = output + `"Action":"${gg}",\n`;
                });
            }
            else {
                output += '"Action":"",\n';
            }
            //Module
            if ((e = eee.exec(aLine)) !== null) {
                e.forEach((ee, groupIndex) => {
                    output = output + `"Module":"${ee}",\n`;
                });
            }
            else {
                output += '"Module":"",\n';
            }
            //ItemID
            if ((b = bbb.exec(aLine)) !== null) {
                b.forEach((bb, groupIndex) => {
                    var contentItem = /id:|root:/g;
                    b1 = bb.split(contentItem)[1];
                    output = output + '"ItemID":"' + b1 + '",\n';
                });
            }
            else {
                output += '"ItemID":"",\n';
            }
            //
            if ((f = fff.exec(aLine)) !== null) {
                f.forEach((ff, groupIndex) => {
                    output = output + `"ItemPath": "${ff}",\n`;
                });
            }
            else {
                output += '"ItemPath":"",\n';
            }
            //
            output += (pattern.test(aLine)) ? '"Published":"Yes"\n},' : '"Published":"No"\n},';
            index += 1;
            aLine = str[index];
        }
        output = output.substring(0, output.length - 1);
        output += ']';
        //$("#output").val(output);
        // });


        res.send(output);
    })
})
//end the log function
app.use(express.static('.'));
app.listen(8000) // port is 8000