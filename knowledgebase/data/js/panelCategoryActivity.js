window.addEventListener('click', function (event) {
    if (event.target.id.indexOf('saveB') === 0) {
         var configCategoryJSON = {
            "id":"c"+new Date().getTime().toString(),
            "categoryName": document.getElementById("categoryName").value.trim(),
            "isOnlyText": document.getElementById("isOnlyText").checked,
            "isNotDetailed": document.getElementById("isNotDetailed").checked
        };
        
        self.port.emit("save", configCategoryJSON);
    }

    if (event.target.id.indexOf('cancelB') === 0) {
        self.port.emit("cancel");
    }

});
