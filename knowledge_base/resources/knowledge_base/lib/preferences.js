var preferences = require("sdk/simple-prefs");
var windowsSystem = require("./system");
var dataStore = require("./dataStore");


function init(){
        console.log("sdfdsfds " + preferences.prefs["appALLpref"]);
        if (preferences.prefs["appALLpref"] === undefined ) {
            console.log("################################");
      /*  if (windowsSystem.yesNoDialog(_("title_yesNoDialog_change_directory"), _("message_yesNoDialog_change_directory"))) {
            directoryPath = windowsSystem.getMainUserDirectory();
            if (directoryPath === "") {
                directoryPath = windowsSystem.getNewFolderInProfile("knowledge_base");
            }
        } else {
            directoryPath = windowsSystem.getNewFolderInProfile("knowledge_base");
        }*/
        directoryPath = windowsSystem.getNewFolderInProfile("knowledge_base");
        dataStore.createStorage(directoryPath);
        var blankPreferences = {
            "directory": directoryPath + "/data",
            "category": []
        };
        preferences.prefs["appALLpref"] = JSON.stringify(blankPreferences);
        dataStore.writeToFile(blankPreferences.directory+"/category.json",JSON.stringify(blankPreferences));  
        //pref.set("appALLpref", JSON.stringify(blankPreferences));
        //pref.saveToFile(blankPreferences);
    }
}


exports.init = init;

exports.get = function (name) {
    return preferences.prefs[name];
};
exports.set = function (name, value) {
    preferences.prefs[name] = value;
};

exports.saveToFile=function(value) {
   dataStore.writeToFile(value.directory+"/category.json",JSON.stringify(value));  
};