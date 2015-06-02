const {Cu} = require("chrome");
const {TextDecoder, TextEncoder, OS} = Cu.import("resource://gre/modules/osfile.jsm", {});
var pref = require("./preferences");
//var encoder = new TextEncoder();
var panelEntry = require("./panelEntry");
var data = require("sdk/self").data;

function addCategory(itemCategory) {
    appPreferences = JSON.parse(pref.get("appALLpref"));
    appPreferences["category"].push(itemCategory); //itemCategory  {"id":"c1426582846543","categoryName":"item1", "isOnlyText":"true", "isNotDetailed":"false"}
    //create new folders and content for data store
    //Зробити перевірку на існування каталогу. якщо є то викинуть попередження і нічого не робити
    OS.File.makeDir(appPreferences.directory + "/" + itemCategory.categoryName);
    var blankJSON = '{"category" :{"id":"' + itemCategory.id + '", "categoryName":"' + itemCategory.categoryName + '" , "isNotDetailed":"' + itemCategory.isNotDetailed + '"}, "entries":[]}'; //{"entries":[{"id":"e1426582846542", time":"25.10.2012", "title":"test record", "data": "saved text"},{}]}
    writeToFile(appPreferences.directory + "/" + itemCategory.categoryName + "/content.json", blankJSON);
    writeToFile(appPreferences.directory + "/" + itemCategory.categoryName + "/content.html", data.load("html/blank/content.html"));
    //END create...
    pref.set("appALLpref", JSON.stringify(appPreferences));
    pref.saveToFile(appPreferences);
}


function deleteCategoryByID(categoryID) {
    appPreferences = JSON.parse(pref.get("appALLpref"));
    category = appPreferences.category;
    dirPath = "";
    for (var i = 0, cl = category.length; i < cl; i += 1) {
        if (category[i].id === categoryID) {
            dirPath = appPreferences.directory + "/" + category[i].categoryName;
            category.splice(i, 1);
            break;
        }
    }
    appPreferences.category = category;
    pref.set("appALLpref", JSON.stringify(appPreferences));
    pref.saveToFile(appPreferences);
    if (dirPath !== "") {
        OS.File.removeDir(dirPath);
    }
}

function saveEntry(labelItem, data) {
    appPreferences = JSON.parse(pref.get("appALLpref"));
    category = appPreferences.category;
    formatedData = "";
    i = 0;
    for (cl = category.length; i < cl; i += 1) {
        if (category[i].categoryName === labelItem) {
            break;
        }
    }
    if (category[i].isNotDetailed) {
        addEntryToFile(category[i], data);
    } else {
//Panel Entry
        panelEntry.init(category[i], data);
        panelEntry.show();
//Panel Entry END
    }
    ;
}


function addEntryToFile(category, data) {
    appPreferences = JSON.parse(pref.get("appALLpref"));
    filename = appPreferences.directory + "/" + category.categoryName + "/content.json";
    var promise = OS.File.read(filename, {encoding: "utf-8"});
    promise.then(
            function onSuccess(readedData) {
                entriesJSON = JSON.parse(readedData);
                newEntry = {};
                newEntry.id = "e" + new Date().getTime().toString();
                if (category.isNotDetailed) {
                    if (category.isOnlyText) {
                        newEntry.data = data.text;
                    } else {
                        newEntry.data = data.html;
                    }
                    ;

                } else {
                    if (data.isTimeStamp) {
                        newEntry.time = new Date().toLocaleString();
                    }
                    ;
                    newEntry.title = data.title;
                    if (data.isUrlTitle) {
                        newEntry.url = data.url;
                    }
                    ;
                    newEntry.comments = data.comments;
                    if (category.isOnlyText) {
                        newEntry.data = data.text;
                    } else {
                        newEntry.data = data.html;
                    }
                    ;
                }
                ;
                entriesJSON["entries"].push(newEntry);
                writeToFile(filename, JSON.stringify(entriesJSON));
            }
    );
}

function deleteEntryFromFile(categoryName, idEntry) {
    appPreferences = JSON.parse(pref.get("appALLpref"));
    filename = appPreferences.directory + "/" + categoryName + "/content.json";
    var promise = OS.File.read(filename, {encoding: "utf-8"});
    promise.then(
            function onSuccess(readedData) {
                entriesJSON = JSON.parse(readedData);
                entries = entriesJSON.entries;
                for (var i = 0, el = entries.length; i < el; i += 1) {
                  if (entries[i].id === idEntry) {
                    entries.splice(i, 1);
                    break;
                    }
                }
                entriesJSON["entries"] = entries;
                writeToFile(filename, JSON.stringify(entriesJSON));
            }
    );
}



function writeToFile(filename, data) {
    OS.File.writeAtomic(filename, data);
}

function createStorage(pathRoot) {
    OS.File.makeDir(pathRoot + "/data");
    OS.File.makeDir(pathRoot + "/resource");
    writeToFile(pathRoot + "/resource/" + "jquery2.js", data.load("others3/jquery2.js"));
}


exports.addCategory = addCategory;
exports.deleteCategoryByID = deleteCategoryByID
exports.saveEntry = saveEntry;
exports.addEntryToFile = addEntryToFile;
exports.deleteEntryFromFile = deleteEntryFromFile;
exports.writeToFile = writeToFile;
exports.createStorage = createStorage;

