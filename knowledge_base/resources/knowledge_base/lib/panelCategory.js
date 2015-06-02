var p = require("sdk/panel");
var data = require("sdk/self").data;
var dataStore = require("./dataStore");
var menu = require("./menu");
var panel;


exports.init = function (datacontent) {
    panel = p.Panel({
        width: 342,
        height: 170,
        contentURL: data.url("html/panelCategoryHTML.html"),
        contentScriptFile: data.url("js/panelCategoryActivity.js")
    });
    panel.port.on("save", function (configCategory) {
        if (configCategory.categoryName !== "") {
            dataStore.addCategory(configCategory);
            menu.refresh();
            dataStore.saveEntry(configCategory.categoryName, datacontent);
        }
        panel.hide();
    });

    panel.port.on("cancel", function () {
        panel.hide();
    });
};

exports.show = function () {
    panel.show();

};
