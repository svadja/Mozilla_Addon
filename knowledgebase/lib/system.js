const {Cc, Ci, Cu} = require("chrome");
const {FileUtils} = Cu.import("resource://gre/modules/FileUtils.jsm", {});
var window = require("sdk/window/utils");
var _ = require("sdk/l10n").get;

function getDirectory() {
    nsIFP = Ci.nsIFilePicker,
    folderDialog = Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
    folderDialog.init(window.getMostRecentBrowserWindow(),_("title_select_folder"),nsIFP.modeGetFolder);
    _return = folderDialog.show();
    if (_return == nsIFP.returnOK || _return == nsIFP.returnReplace) {
        return folderDialog.file.path;
        }
        else{
            return "";
        }
        
};

function getNewFolderInProfile(dirName){
    _return = FileUtils.getDir("ProfD",[dirName] , true).path;
    return _return;
};

function getMainUserDirectory(){
    return  getDirectory();
};


function yesNoDialog(title, message){
   prompts = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
   _return = prompts.confirm(null, title, message);
   return _return;
};


exports.getMainUserDirectory = getMainUserDirectory;
exports.yesNoDialog = yesNoDialog;
exports.getNewFolderInProfile = getNewFolderInProfile;