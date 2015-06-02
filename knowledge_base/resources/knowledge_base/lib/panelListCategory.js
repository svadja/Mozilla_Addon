var buttons = require('sdk/ui/button/action');
var panels = require("sdk/panel");
var pref = require("./preferences");
var data = require("sdk/self").data;
var dataStore = require("./dataStore");
var menu = require("./menu");
var tabs = require("sdk/tabs");
var panel;

function init(position_panel) {
    prefStr = pref.get("appALLpref");
    heightPanel = 20 + 30;
    if (JSON.parse(prefStr).category.length > 0) {
        heightPanel = 20 + 30 * JSON.parse(prefStr).category.length;
    }
    panel = panels.Panel({
        width: 300,
        height: heightPanel,
        position: position_panel,
        contentURL: data.url("html/panelListCategoryHTML.html"),
        contentScriptFile: data.url("js/panelListCategoryActivity.js")
    });

    panel.port.emit("buildCategoryList", prefStr);
    
    panel.port.on("delCategory", function (delcategory) {
        dataStore.deleteCategoryByID(delcategory);
        panel.hide();
        menu.refresh();
    });

    panel.port.on("openCategory", function (opencategoryID) {
        panel.hide();
        preferences = JSON.parse(prefStr);
        category = preferences.category;
        for(var i=0, clength=category.length; i<clength; i+=1){
            if(category[i].id===opencategoryID){
                tmpurl="file:///"+preferences.directory +"/"+ category[i].categoryName + "/content.html";
         //       console.log(tmpurl);
                tabs.open(tmpurl);
                break;
            }
        }
    });
}

function show(position_panel){
    init(position_panel);
    panel.show();
}

exports.init = init;
exports.show = show;