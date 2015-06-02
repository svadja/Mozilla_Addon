var cm = require("sdk/context-menu");
var panelCategory = require("./panelCategory");
var pref = require("./preferences");
var data = require("sdk/self").data;
var dataStore = require("./dataStore");
var _ = require("sdk/l10n").get;

var menu;

var itemAddNew = {
    label: _("add_new_category"),
    context: cm.SelectionContext(),
    contentScriptFile: data.url("js/mItemClick.js"),
    onMessage: fNewCategory
};



function fNewCategory(selectedContent) {
    panelCategory.init(selectedContent);
    panelCategory.show();
}
;


function init() {
    var allItems = [];
    //header menu
    allItems[0] = cm.Item(itemAddNew);
    allItems[1] = cm.Separator();
    //header menu END

    //load menu items
    appPreferences = JSON.parse(pref.get("appALLpref"));
    for (i = 0; i < appPreferences.category.length; i++) {
        allItems[i + 2] = cm.Item({
            label: appPreferences.category[i].categoryName,
            context: cm.SelectionContext(),
            contentScriptFile: data.url("js/mItemClick.js"),
            onMessage: function (selectedContent) {
                dataStore.saveEntry(this.label, selectedContent);
            }

        });
    }
    //load menu items END
    if (menu !== undefined) {
        menu.items=allItems;
    } else {
        menu = cm.Menu({
            label: _("add_to_KD"),
            context: cm.SelectionContext(),
            items: allItems
        });
    }

}
;

function refresh() {
    init();
};



exports.init = init;

exports.refresh = refresh;

exports.export = function () {
};
exports.import = function () {
};
