var buttons = require('sdk/ui/button/action');
var panelList = require("./panelListCategory");
var _ = require("sdk/l10n").get;
var button;

function init() {
   // prefStr = pref.get("appALLpref");

    button = buttons.ActionButton({
        id: "knowBase-list",
        label:_("actionButton_description"),
        icon: {
            "16": "./img/ico16.png",
            "32": "./img/ico32.png",
            "64": "./img/ico64.png"
        },
        onClick: buttonClick
    });
};



function buttonClick(state) {
    panelList.show(button);
};

exports.init = init;