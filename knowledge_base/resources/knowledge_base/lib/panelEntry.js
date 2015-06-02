var p = require("sdk/panel");
var data = require("sdk/self").data;
var dataStore = require("./dataStore");
var panel;


exports.init = function (category,datacontent) {
    panel = p.Panel({
        width: 442,
        height:350,
        contentURL: data.url("html/panelEntryHTML.html"),
        contentScriptFile: data.url("js/panelEntryActivity.js")
    });
    panel.port.on("save", function (configEntryJSON) {
        datacontent.title=configEntryJSON.title,
        datacontent.isUrlTitle=configEntryJSON.isUrlTitle,
        datacontent.isTimeStamp=configEntryJSON.isTimeStamp,
        datacontent.comments=configEntryJSON.comments,
        dataStore.addEntryToFile(category, datacontent);
       panel.hide();
    });

    panel.port.on("cancel", function () {
        panel.hide();
    });
};

exports.show = function () {
    panel.show();
    
};
