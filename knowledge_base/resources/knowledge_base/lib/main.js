var pref = require("./preferences");
var menu = require("./menu");
var tollbarButton = require("./toolbarButton");
var windowsSystem = require("./system");
var page = require("./page");
var _ = require("sdk/l10n").get;



exports.main = function () {
     /*  
    if (pref.get("appALLpref") !== 'undefined') {
     if (windowsSystem.yesNoDialog(_("title_yesNoDialog_change_directory"), _("message_yesNoDialog_change_directory"))) {
            directoryPath = windowsSystem.getMainUserDirectory();
            if (directoryPath === "") {
                directoryPath = windowsSystem.getNewFolderInProfile("knowledge_base");
            }
        } else {
            directoryPath = windowsSystem.getNewFolderInProfile("knowledge_base");
        }*
        
        
        directoryPath = windowsSystem.getNewFolderInProfile("knowledge_base");
        dataStore.createStorage(directoryPath);
        var blankPreferences = {
            "directory": directoryPath + "/data",
            "category": []
        };
        pref.set("appALLpref", JSON.stringify(blankPreferences));
        pref.saveToFile(blankPreferences);
    }*/
    pref.init();
    menu.init();
    tollbarButton.init();
    page.init();
};

