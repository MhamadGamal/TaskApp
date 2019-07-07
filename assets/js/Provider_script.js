var currentuserdata = JSON.parse(localStorage.getItem('CurrentUserData'));
var supplierid = currentuserdata.id;

function LoadRecievedTasksBySupplier(supplierid) {
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/pendings/tasks/suppliers/categories",
        method: 'POST',
        dataType: "json",
        data: {
            "supplier": supplierid
        },
        success: function (result) {
            if (result.error.status == true) {
                var message = result.error.message;
                $("#alert").fadeIn().html(message);
            }
            else {

                allTasks = result.data;
                let taskArr = result.data, wrapper="", read="";
                let img;
                for(let item of taskArr)
                {

                    if (item.is_read == "0") {
                        read = `
                           <a href="seeTask.html?${item.id}" class ="seeTask main-color"> <span class ="position-relative">${item.category_point}</span> <i class="fas fa-chevron-right   pt-1 "></i></a>
                        `;
                    } else {
                        read = ""
                    }
                    
                    if(item.client_image){
                        img = `${'http://88.80.184.99/tasker/web/'  + item.client_image}`;
                    }else{
                        img = "https://via.placeholder.com/150";
                    }

                     wrapper += `
                                    <li class="my-1">
                                        <div class="row">
                                            <div class="col-sm-4">
                                                <div class="task-img">
                                                    <img class="img-service" src="${img}"   alt="" />
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="row no-gutters">
                                                    <div class="col-9">
                                                        <h4 class ="main-color"> <a href="seeTask.html?${item.id}"> ${getCategory(Number(item.category)).name_en} </a>  </h4>
                                                        <h6 class ="main-color normal">${item.client_name}</h6>
                                                        <span class ="bold">${item.date}</span>
                                                         <p class ="mt-3">
                                                            ${item.description}
                                                            </p>
                                                    </div>
                                                    <div id="IsReaded" class ="col-3 text-right">
                                                        ${read}                                   
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                `
                            }
                            $("#RecievedTasks .moving-tasks-list").html(wrapper);

                
            }

        },
        error: function (result) {
            alert('error');
        }
    });
}

function LoadHotOffersBySupplier(supplierid)
{
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/lists/hots/offers/suppliers",
        method: 'POST',
        dataType: "json",
        data: {
            "supplier": supplierid,
        },
        success: function (result) {
            if (result.error.status == true) {
                var message = result.error.message;
                alert(message);
            }
            else {

                let taskArr = result.data, img="", wrapper ="";
                for(let item of taskArr)
                {


                    if(item.client_image){
                        img = `${'http://88.80.184.99/tasker/web/'  + item.client_image}`;
                    }else{
                        img = "https://via.placeholder.com/150";
                    }

                     wrapper += `

                        <li class ="my-2 border p-2">
                                                <div class ="row">
                                                    <div class ="col-sm-3">
                                                        <div class="task-img">
                                                            <img class ="img-service"
                                                                src="${img}" alt="" />
                                                        </div>
                                                    </div>
                                                    <div class ="col-sm-9">
                                                        <div class ="moving-tasks">
                                                            <div class ="agency-tasks">
                                                                <div class ="moving-agency">
                                                                    <div class ="d-flex">
                                                                        <h6 class ="main-color m-0 mr-2"><a href="hotoffers-details.html?${item.id}">${getCategory(Number(item.category)).name_en}</a></h6>
                                                                        <p class ="main-color m-0">${item.client_name}</p>
                                                                    </div>
                                                                    <span class ="date">${item.date}</span>
                                                                    <p class ="mt-3">
                                                                    ${item.description}
                                                                    </p>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </li>

                              `
                            }
                            $("#HotOffers .moving-tasks-list").html(wrapper);
            }

        },
        error: function (result) {
            alert('error: ' + result.statusText);
        }
    });
}

function LoadPointsnumBySupplier(supplierid) {
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/points/remains/suppliers",
        method: 'POST',
        dataType: "json",
        data: {
            "supplier": supplierid
        },
        success: function (result) {
            if (result.error.status == true) {
                var message = result.error.message;
                alert(message);
            }
            else {
                var wrapper = `<h1 class="m-0">${result.data.remain_point}</h1>`;
                $("#SubPoints").append(wrapper);
            }
        },
        error: function (result) {
            alert('error');
        }
    });
}

function LoadSentOffersBySupplier(supplierid)
{
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/tasks/relateds/suppliers",
        method: 'POST',
        dataType: "json",
        data: {
            "page": 1, "supplier": supplierid
        },
        success: function (result) {
            if (result.error.status == true) {
                var message = result.error.message;
                aler(message);
            }
            else {
                let taskArr = result.data, img="", wrapper = "";
                for(let item of taskArr)
                {
                    
                    if(item.client_image){
                        img = `${'http://88.80.184.99/tasker/web/'  + item.client_image}`;
                    }else{
                        img = "https://via.placeholder.com/150";
                    }

                     wrapper +=`
                                    <li class ="my-2 border p-2">
                                        <div class ="row">
                                            <div class ="col-sm-3">
                                                <div class="task-img">
                                                    <img class ="img-service"
                                                        src="${img}" alt="" />
                                            
                                                </div>
                                            </div>
                                            <div class ="col-sm-9">
                                                <div class ="moving-tasks">
                                                    <div class ="agency-tasks">
                                                        <div class ="moving-agency">
                                                            <div class ="d-flex">
                                                                <h6 class ="main-color m-0 mr-2"><a href="sentitems-details.html?${item.id}">${getCategory(Number(item.category)).name_en}</a></h6>
                                                                <p class ="main-color m-0">${item.client_name}</p>
                                                            </div>
                                                            <span class ="date">${item.date}</span>
                                                            <p class ="mt-3">
                                                            ${item.description}
                                                            </p>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </li>


                                  `

                                }
                                $("#SentOffers .moving-tasks-list").html(wrapper);


            }

        },
        error: function (result) {
            alert('error: ' + result.statusText);
        }
    });
}





function GetMessagesByOffer(id)
{
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/offers/messages/retrieves",
        method: 'POST',
        dataType: "json",
        data: {
            "id": id
        },
        success: function (result) {
            if (result.error.status == true) {
                var message = result.error.message;
                alert(message);
            }
            else {
                let taskArr = result.data;
                for(let item of taskArr)
                {
                    console.log(item);
                }
            }

        },
        error: function (result) {
            alert('error');
        }
    });
    
}



LoadRecievedTasksBySupplier(supplierid);
LoadHotOffersBySupplier(supplierid);
LoadPointsnumBySupplier(supplierid);
LoadSentOffersBySupplier(supplierid);



  