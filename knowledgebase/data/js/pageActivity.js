window.addEventListener('click', function (event) {
    if ((event.target.className.indexOf('e_trush_simple') === 0)||(event.target.className.indexOf('e_trush') === 0))
    {
        
        // prefix in id is e_trush_ it has length 8
        var entryId = event.target.id.substring(8);
        var deleteItem = {
            "categoryName":document.title,
            "entryId":entryId
        };
        self.port.emit("delete", deleteItem);
        document.getElementById('e_tr_'+entryId).style.display = "none";
   }
});
function refresh(){

}