var pageMod = require("sdk/page-mod");
var data = require("sdk/self").data;
var dataStore = require("./dataStore");
var pm;
function init() {
    pm = pageMod.PageMod({
        include: /^file\:\/\/.*content.html/,
        contentScriptFile: data.url("js/pageActivity.js"),
        onAttach: function (worker) {
            worker.port.on("delete", function (deleteItem) {
                dataStore.deleteEntryFromFile(deleteItem.categoryName, deleteItem.entryId);
            });
        }
    });
}

exports.init = init;