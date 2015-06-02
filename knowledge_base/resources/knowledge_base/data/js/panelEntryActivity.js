window.addEventListener('click', function (event) {
    if (event.target.id.indexOf('saveB') === 0){
       var configEntryJSON ={
         "title":document.getElementById("title").value.trim(),
         "isUrlTitle":document.getElementById("isUrlTitle").checked,
         "isTimeStamp":document.getElementById("isTimeStamp").checked,
         "comments":document.getElementById("comments").value
        };
        
        self.port.emit("save", configEntryJSON);
    }

    if (event.target.id.indexOf('cancelB') === 0) {
        self.port.emit("cancel");
    }

});
