self.port.on("buildCategoryList", function (prefsStr) {
    preferences = JSON.parse(prefsStr);
    category = preferences.category;
    if (category.length > 0) {
        for (var i = 0, clength = category.length; i < clength; i += 1) {
            urlCategory = "file:///" + preferences.directory + category[i].categoryName + "/content.html";
            htmldata = "<td class='td_link'>" +
                            "<a class = 'link_open' id=" + "open_" + category[i].id + " href='#'>" + category[i].categoryName + "</a>" +
                    "</td>" +
                    "<td class='td_del'>" +
                        "<div class ='button_del' id=" + "del_" + category[i].id + ">&times</div>" +
                        //    "<img class ='button_del' id=" + "del_" + category[i].id + " src='../img/delete.png'/>" +
                    "</td>";

            tr = document.createElement('tr');
            tr.innerHTML = htmldata;
            document.getElementById('listCategory').appendChild(tr);
        }
    } else {
        document.getElementById('pn_lc_list_empty').style.display='block';
    }
});

window.addEventListener('click', function (event) {
    if (event.target.className === 'button_del') {
        button_id = event.target.id;
        // prefix in id is "del_" . it has length 4  
        categoryID = button_id.substring(4);
        self.port.emit("delCategory", categoryID);
    }
    ;
    if (event.target.className === 'link_open') {
        link_id = event.target.id;
        categoryID = link_id.substring(5);
        self.port.emit("openCategory", categoryID);
    }
});

