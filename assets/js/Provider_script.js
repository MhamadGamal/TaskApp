var currentuserdata = JSON.parse(localStorage.getItem('CurrentUserData'));
var supplierid = currentuserdata.id;
let Rcounter = 1, Scounter = 1, Hcounter = 1;
function LoadRecievedTasksBySupplier(supplierid, page) {

    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/pendings/tasks/suppliers/categories",
        method: 'POST',
        dataType: "json",
        data: {
            "supplier": supplierid,
            "page": page
        },
        success: function (result) {
            if (result.error.status == true) {
                var message = result.error.message;
                $("#alert").fadeIn().html(message);
            }
            else {

                let taskArr = result.data.result, wrapper = "", read = "", img = "";
                if (taskArr.length>0) {
                    for(let item of taskArr)
                    {

                        if (item.is_read == "0") {
                            read = `
                           <a href="seeTask.html?${item.id}" class ="seeTask main-color"> <span class ="position-relative">${item.category_point}</span> <i class="fas fa-chevron-right   pt-1 "></i></a>
                        `;
                        } else {
                            read = ""
                        }

                        if (item.client_image) {
                            img = `${'http://88.80.184.99/tasker/web/' + item.client_image}`;
                        } else {
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
                }
                else {
                    wrapper = `
                    <li class ="page-item"><a class ="page-link" href="#">No Tasks Found</a></li>
                        `;
                }
                $("#RecievedTasks .moving-tasks-list").html(wrapper);
                let pages = result.data.pages;
                let paganation = "";
                if (Number(pages) > 1) {
                    paganation += `
                                <li class ="page-item"><a class ="page-link Recivedpagerback" href="#">Back</a></li>
                                `;
                    for (var i = 1; i <= pages; i++) {
                        paganation += `
                                <li class ="page-item"><a pagenumber=${i} class ="page-link Recivedpager" href="#">${i}</a></li>
                                `;
                    }
                    paganation += `
                                <li class ="page-item"><a class ="page-link Recivedpagernext" href="#">Next</a></li>
                                `;
                    $("#RecievedTasks .pagination").html(paganation);

                    var ul = $("#RecievedTasks .pagination");
                    for (var i = 0; i <= ul.length; i++) {
                        //if (ul[i].attr('pagenumber') == Rcounter) {
                        //    ul[i].addClass("active");
                        //}
                    }
                }
            }

        },
        error: function (result) {
            alert('error');
        }
    });
}

function LoadHotOffersBySupplier(supplierid, page)
{
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/lists/hots/offers/suppliers",
        method: 'POST',
        dataType: "json",
        data: {
            "supplier": supplierid,
            "page": page
        },
        success: function (result) {
            if (result.error.status == true) {
                var message = result.error.message;
                alert(message);
            }
            else {

                let offerArr = result.data, img = "", wrapper = "";
               
                if (offerArr.length>0) {
                    for(let item of offerArr)
                    {

                        if (item.image[0]) {
                            img = `${'http://88.80.184.99/tasker/web/' + item.image[0]}`;
                        } else {
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
                                                                        <p class ="main-color m-0">${item.supplier.name}</p>
                                                                    </div>
                                                                    <span class ="date">${item.start_date}</span>
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

                    

                    let pages = result.data.pages;
                    let paganation = "";
                    if (Number(pages) > 1) {
                        paganation += `
                                <li class ="page-item"><a class ="page-link Hotofferpagerback" href="#">Back</a></li>
                                `;
                        for (var i = 1; i <= pages; i++) {
                            paganation += `
                                <li class ="page-item"><a pagenumber=${i} class ="page-link Hotofferpager" href="#">${i}</a></li>
                                `;
                        }
                        paganation += `
                                <li class ="page-item"><a class ="page-link Hotofferpagernext" href="#">Next</a></li>
                                `;
                        $("#HotOffers .pagination").html(paganation);

                        var ul = $("#RecievedTasks .pagination");
                        for (var i = 0; i <= ul.length; i++) {
                            //if (ul[i].attr('pagenumber') == Rcounter) {
                            //    ul[i].addClass("active");
                            //}
                        }
                    }

                }
                else {
                    wrapper = `
                    <li class ="page-item"><a class ="page-link" href="#">No Tasks Found</a></li>
                        `;
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

function LoadSentOffersBySupplier(supplierid, page)
{
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/tasks/relateds/suppliers",
        method: 'POST',
        dataType: "json",
        data: {
            "page": page, "supplier": supplierid
        },
        success: function (result) {
            if (result.error.status == true) {
                var message = result.error.message;
                aler(message);
            }
            else {
                let taskArr = result.data.result, img = "", wrapper = "";
                if (taskArr.length > 0)
                {
                    for(let item of taskArr)
                    {

                        if (item.client_image) {
                            img = `${'http://88.80.184.99/tasker/web/' + item.client_image}`;
                        } else {
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
                }

                else {
                    wrapper = `
                    <li class ="page-item"><a class ="page-link" href="#">No Tasks Found</a></li>
                        `;
                }
               
                $("#SentOffers .moving-tasks-list").html(wrapper);



                let pages = result.data.pages;
                let paganation = "";
                if (Number(pages) > 1) {
                    paganation += `
                                <li class ="page-item"><a class ="page-link Sentpagerback" href="#">Back</a></li>
                                `;
                    for (var i = 1; i <= pages; i++) {
                        paganation += `
                                <li class ="page-item"><a pagenumber=${i} class ="page-link Sentpager" href="#">${i}</a></li>
                                `;
                    }
                    paganation += `
                                <li class ="page-item"><a class ="page-link Sentpagernext" href="#">Next</a></li>
                                `;
                    $("#SentOffers .pagination").html(paganation);

                    var ul = $("#RecievedTasks .pagination");
                    for (var i = 0; i <= ul.length; i++) {
                        //if (ul[i].attr('pagenumber') == Rcounter) {
                        //    ul[i].addClass("active");
                        //}
                    }
                }


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

function ReadTaskBySupplier(supplierid, taskid) {
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/tasks/reads/suppliers",
        method: 'POST',
        dataType: "json",
        data: {
            "supplier": supplierid, "task": taskid
        },
        success: function (result) {

            if (result.error.status == true) {
                var message = result.error.message;
                alert(message);
            }
            else {
            }

        },
        error: function (result) {
            alert('error');
        }
    });
}

function GetOneTask(taskid, supplierid) {

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
                alert(message);
            }
            else {
                allTasks = result.data.result;
                let targetTask;
                for(let item of allTasks) {
                    if (item.id == taskid) {
                        targetTask = item;


                    }
                }



                if (targetTask) {
                    let target = Number(window.location.href.slice(window.location.href.lastIndexOf("?") + 1));
                    if (targetTask.is_read == 0) {
                        ReadTaskBySupplier(supplierid, target);
                    }

                    stLocation = targetTask.start_location;
                    endLocation = targetTask.end_location;

                    console.log(targetTask);
                    $("#catname").text(getCategory(Number(targetTask.category)).name_en);

                    var dd = `
                                <div class ="row">
                        <div class ="col-md-8">
                            <div class ="row no-gutters">
                                <div class ="col-sm-8">
                                    <div class ="my-2">
                                        <span class ="main-color">Start Address</span>
                                        <p> <i class ="fas fa-map-marker-alt    "></i> ${targetTask.start_location.location}</p>
                                    </div>
                                    <div class ="my-2">
                                        <span class ="main-color">Destination</span>
                                        <p> <i class ="fas fa-map-marker-alt    "></i> ${targetTask.end_location.location}</p>
                                    </div>

                                </div>
                                <div class ="col-sm-4 text-center">
                                    <div class="task-img">
                                        <img src="${'http://88.80.184.99/tasker/web/' + targetTask.client_image}" class ="img-fluid client-image" alt="">

                                    </div>
                                    <h6 class ="normal main-color m-0">${targetTask.client_name}</h6>
                               
                                </div>
                            </div>
                            <div class ="">
                                <span class ="main-color">Service Details</span>
                                <p>
                                    ${targetTask.description}
                                </p>
                            </div>
                        </div>
                        <div class ="col-md-4">
                                <div id="map-container-google" class="z-depth-1-half map-container">
                                </div>
                        </div>
                    </div>
            `;
                    $("#seetask").html(dd);
                }
            }

        },
        error: function (result) {
            alert('error');
        }
    });
}

function AddOfferForTask(supplierid, taskid) {
    let price = $("#offprice").val();
    let type = "task";
    let note = $("#offdesc").val();

    if (!price) {
        $("#offprice").addClass("error")
    }

    if (!note) {
        $("#offdesc").addClass("error")
    }
    if (price && note) {
        $.ajax({
            url: "http://88.80.184.99/tasker/web/api/creates/offers",
            method: 'POST',
            dataType: "json",
            data: {
                "price": price, "supplier": supplierid, "task": taskid, "type": type, "note": note
            },
            success: function (result) {

                if (result.error.status == true) {
                    var message = result.error.message;
                    alert(message);
                }
                else {
                    location.href = 'dashboard.html';
                }
            },
            error: function (result) {
                alert('error');
            }
        });
    }

};

function GetOneTaskdetails(taskid, supplierid) {

    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/tasks/relateds/suppliers",
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
                allTasks = result.data.result;
                let targetTask;
                for(let item of allTasks) {
                    if (item.id == taskid) {
                        targetTask = item;
                    }
                }

                if (targetTask) {
                    stLocation = targetTask.start_location;
                    endLocation = targetTask.end_location;
                    $("#Servicename").text(getCategory(Number(targetTask.category)).name_en);
                    var dd = `
                                <div class ="row">
                        <div class ="col-md-8">
                            <div class ="row no-gutters">
                                <div class ="col-sm-8">
                                    <div class ="my-2">
                                        <span class ="main-color">Start Address</span>
                                        <p> <i class ="fas fa-map-marker-alt    "></i> ${targetTask.start_location.location}</p>
                                    </div>
                                    <div class ="my-2">
                                        <span class ="main-color">Destination</span>
                                        <p> <i class ="fas fa-map-marker-alt    "></i> ${targetTask.end_location.location}</p>
                                    </div>

                                </div>
                                <div class ="col-sm-4 text-center">
                                    <div class="task-img">
                                        <img src="${'http://88.80.184.99/tasker/web/' + targetTask.client_image}" class ="img-fluid client-image" alt="">

                                    </div>
                                    <h6 class ="normal main-color m-0">${targetTask.client_name}</h6>
                                    <div class ="rating main-color">
                                        <span class ="fa fa-star checked"></span>
                                        <span class ="fa fa-star checked"></span>
                                        <span class ="fa fa-star checked"></span>
                                        <span class ="fa fa-star"></span>
                                        <span>4.5</span>
                                    </div>
                                </div>
                            </div>
                            <div class ="">
                                <span class ="main-color">Service Details</span>
                                <p>
                                    ${targetTask.description}
                                </p>
                            </div>
                        </div>
                        <div class ="col-md-4">
                            <div id="map-container-google" class="z-depth-1-half map-container">
                                </div>
                        </div>
                    </div>
            `;
                    $("#viewsentitem").html(dd);
                }
            }

        },
        error: function (result) {
            alert('error');
        }
    });
}

function LoadPointsnumBySupplier_details(supplierid) {
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
                $("#Points").append(wrapper);
            }
        },
        error: function (result) {
            alert('error');
        }
    });
}

function GetScheduledActiveTasks(supplierid) {
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/inprogres/tasks/suppliers",
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
                let taskArr = result.data;
                let scheduledArr = [], activedArr = [];

                for(let item of taskArr)
                {
                    let currentDate = new Date();

                    if (item.date = currentDate.toLocaleDateString()) {
                        activedArr.push(item)
                    } else {
                        scheduledArr.push(item)
                    }
                    if (item.images[0]) {
                        img = "http://88.80.184.99/tasker/web/" + item.images[0];
                    } else {
                        img = "https://via.placeholder.com/150"
                    }
                }

                let schedWrap = "", actWrap = ""
                if (scheduledArr.length > 0) {
                    for(let item of scheduledArr) {
                        schedWrap += `
                                <li>
                                <div class ="d-flex">
                                    <div class ="client-img-block">
                                        <img class ="client-img" src=${img} alt="" />
                                    </div>
                                    <div class ="booking-details">
                                        <div class ="details-head">
                                            <div class ="details">
                                                <div>
                                                    <h5 class ="bold-font">${getCategory(Number(item.category)).name_en}</h5> <span></span>
                                                </div>
                                                <p> ${item.description}</p>
                                            </div>

                                        </div>
                                        <div class ="offers-numbers">
                                            <div class ="messges-offers">
                                                <i class ="fas fa-comments"></i>
                                                <span>Messages</span>
                                                <span class ="offer-num">4</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </li>
                                `;
                    }
                   
                }
                else {
                    schedWrap = `
                    <li class ="page-item"><a class ="page-link" href="#">No Tasks Found</a></li>
                        `;
                }

                $("#Scheduled .pending-bookings-list").html(schedWrap);

                if (activedArr.length > 0) {

                    for(let item of activedArr) {
                        actWrap += `
                                <li>
                                <div class ="d-flex">
                                    <div class ="client-img-block">
                                        <img class ="client-img" src=${img} alt="" />
                                    </div>
                                    <div class ="booking-details">
                                        <div class ="details-head">
                                            <div class ="details">
                                                <div>
                                                    <h5 class ="bold-font">${item.category_name}</h5> <span></span>
                                                </div>
                                                <p> ${item.description}</p>
                                            </div>
                                            <div>
                                                <a data-id="${item.id}" class ="end-task" href="#"><i class ="fas fa-check-circle"></i> End
                                                    Task</a>
                                            </div>
                                        </div>
                                        <div class ="offers-numbers">
                                            <div class ="messges-offers">
                                                <i class ="fas fa-comments"></i>
                                                <span>Messages</span>
                                                <span class ="offer-num">4</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </li>
                                `;
                    }
                }
                else {
                    actWrap = `
                    <li class ="page-item"><a class ="page-link" href="#">No Tasks Found</a></li>
                        `;
                }

                $("#activetasks").html(actWrap);
            }
        },
        error: function (result) {
            alert('error');
        }
    });
}

function GetCompletedTaslsBySupplier(supplierid) {
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/completes/tasks/suppliers",
        method: 'POST',
        dataType: "json",
        data: {
            "supplier": supplierid,
            "page":1
        },
        success: function (result) {
            if (result.error.status == true) {
                var message = result.error.message;
                alert(message);
            }
            else {
                let taskArr = result.data, div="";
                if (true) {
                    for(let item of taskArr)
                    {
                        if (item.images[0]) {
                            img = "http://88.80.184.99/tasker/web/" + item.images[0];
                        } else {
                            img = "https://via.placeholder.com/150"
                        }
                         div += `
                                <li>
                                <div class ="d-flex">
                                    <div class ="client-img-block">
                                        <img class ="client-img" src=${img} alt="" />
                                    </div>
                                    <div class ="booking-details">
                                        <div class ="details-head">
                                            <div>
                                                <h5 class ="bold-font">${getCategory(Number(item.category)).name_en}</h5> <span></span>
                                            </div>
                                            <p>${item.description}</p>
                                        </div>
                                        <div class ="offers-numbers">
                                            <div class ="messges-offers">
                                                <i class ="fas fa-comments"></i>
                                                <span>Messages</span>
                                                <span class ="offer-num">4</span>
                                            </div>
                                            <!-- <div class ="offers">
                                            <i class ="fas fa-users"></i>
                                            <span>Providers Offers</span>
                                            <span class ="offer-num">2</span>
                                    </div> -->
                                        </div>

                                    </div>
                                </div>
                            </li>
                                `;
                       
                    }
                }

                else {
                    div = `
                    <li class ="page-item"><a class ="page-link" href="#">No Tasks Found</a></li>
                        `;
                }

                $("#closedtasks").html(div);
            }

        },
        error: function (result) {
            alert('error');
        }
    });
}

function EndTask(taskid) {
    debugger;
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/marks/completeds",
        method: 'POST',
        dataType: "json",
        data: {
            "id": taskid
        },
        success: function (result) {
            debugger;
            if (result.error.status == true) {
                var message = result.error.message;
                alert(message);
            }
            else {
                location.reload();
            }

        },
        error: function (result) {
            alert('error');
        }
    });
}

function GetHotOfferDetails(offerid, supplierid) {
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/lists/hots/offers/suppliers",
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
                allTasks = result.data;
                let targetTask;
                for(let item of allTasks) {
                    if (item.id == offerid) {
                        targetTask = item;
                    }
                }

                console.log(targetTask);
                if (targetTask) {
                    let img1 = "", img2 = "", img3 = "", imgCl = "";

                    if (targetTask.image[0]) {
                        img1 = `${'http://88.80.184.99/tasker/web/' + targetTask.image[0]}`;
                    } else {
                        img1 = "https://via.placeholder.com/150";
                    }

                    if (targetTask.image[1]) {
                        img2 = `${'http://88.80.184.99/tasker/web/' + targetTask.image[1]}`;
                    } else {
                        img2 = "https://via.placeholder.com/150";
                    }

                    if (targetTask.image[2]) {
                        img3 = `${'http://88.80.184.99/tasker/web/' + targetTask.image[2]}`;
                    } else {
                        img3 = "https://via.placeholder.com/150";
                    }

                    if (targetTask.supplier.image) {
                        imgCl = `${'http://88.80.184.99/tasker/web/' + targetTask.supplier.image}`;
                    } else {
                        imgCl = "https://via.placeholder.com/100";
                    }

                    var d = `

            <div class ="row">

                                        <div class ="col-md-4">

                                            <div id="carouselExampleIndicators" class ="carousel slide" data-ride="carousel">
                                                <ol class ="carousel-indicators">
                                                    <li data-target="#carouselExampleIndicators" data-slide-to="0"
                                                        class ="active">
                                                        <img class ="d-block" src="${img1}}">
                                                    </li>
                                                    <li data-target="#carouselExampleIndicators" data-slide-to="1">
                                                        <img class ="d-block" src="${img2}">
                                                    </li>
                                                    <li data-target="#carouselExampleIndicators" data-slide-to="2">
                                                        <img class ="d-block" src="${img3}">
                                                    </li>
                                                </ol>
                                                <div class ="carousel-inner">
                                                    <div class ="carousel-item active">
                                                        <img class ="d-block w-100"
                                                            src="${img1}">
                                                    </div>
                                                    <div class ="carousel-item">
                                                        <img class ="d-block w-100"
                                                            src="${img2}">
                                                    </div>
                                                    <div class ="carousel-item">
                                                        <img class ="d-block w-100"
                                                            src="${img3}">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class ="col-md-8">
                                            <div class ="moving-tasks">
                                                <div class ="agency-tasks">
                                                    <div class ="moving-agency">
                                                        <div>
                                                            <div class ="d-flex agency">
                                                                <img src="${imgCl}" alt=""
                                                                    srcset="">
                                                                <a href="#" class ="bold">${targetTask.supplier.name}</a>
                                                            </div>
                                                            <div class ="rating main-color mb-3">
                                                                <span class ="fa fa-star checked"></span>
                                                                <span class ="fa fa-star checked"></span>
                                                                <span class ="fa fa-star checked"></span>
                                                                <span class ="fa fa-star"></span>
                                                                <span class ="fa fa-star"></span>
                                                                <span>4.5</span>
                                                            </div>
                                                        </div>
                                                        <div class ="tasks-numbers main-color mb-3">
                                                            <i class ="fas fa-business-time"></i>
                                                            <span>${getCategory(Number(targetTask.category)).name_en}</span>
                                                            </i>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div>
                                                    <p class ="mb-4">
                                                   ${targetTask.description}

                                                    </p>
                                                </div>

                                                <div class ="starEndDate d-flex">
                                                    <div>
                                                        <i class ="fas fa-calendar-alt main-color mr-2"></i>
                                                        <span class ="mr-2">${targetTask.start_date}</span>


                                                    </div>
                                                    <span class ="mr-2">TO</span>
                                                    <div>
                                                        <i class ="fas fa-calendar-alt main-color mr-2"></i>
                                                        <span>${targetTask.end_date} </span>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>

            `;
                    $("#hotdetails").html(d);
                }
            }

        },
        error: function (result) {
            alert('error');
        }
    });
}

function GetAllSuplyierRates(supplierid) {
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/suppliers/reviews",
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
                let ratesarr = result.data;
                for(let item of ratesarr)
                {
                    let stars, rate = item.rate;
                    if (rate == "1") {
                        stars = `
                                    <span class ="fa fa-star checked"></span>`
                    }
                    else if (rate == "2") {
                        stars = `
                                    <span class ="fa fa-star checked"></span>
                                    <span class ="fa fa-star checked"></span> `;
                    }
                    else if (rate == "3") {
                        stars = `
                                    <span class ="fa fa-star checked"></span>
                                    <span class ="fa fa-star checked"></span>
                                    <span class ="fa fa-star checked"></span>`

                    }
                    else if (rate == "4") {
                        stars = `
                                    <span class ="fa fa-star checked"></span>
                                    <span class ="fa fa-star checked"></span>
                                    <span class ="fa fa-star checked"></span>
                                    <span class ="fa fa-star"></span>`

                    }
                    else {
                        stars = `
                                    <span class ="fa fa-star checked"></span>
                                    <span class ="fa fa-star checked"></span>
                                    <span class ="fa fa-star checked"></span>
                                    <span class ="fa fa-star"></span>
                                    <span class ="fa fa-star"></span>`
                    }

                    var d = `
                                    <li>
                        <div class="d-flex">
                            <div class="provider-img-block">
                                <img class ="provider-img" src="${'http://88.80.184.99/tasker/web/' + item.client.image}" alt="" />
                            </div>
                            <div class="rating-details">
                                <div class="details-head">
                                    <div class="details">
                                        <div>
                                            <a href="#" class="bold-font provider-name">${item.client.name}</a>
                                        </div>
                                        <span class="service-name mb-2 d-block">Cleaning Service</span>
                                        <div class ="rating main-color ">

                                       ${stars}

                                        </div>
                                        <p>${item.message}</p>
                                    </div>
                                    <div class="starEndDate">
                                        <div>
                                            <i class="fas fa-calendar-alt mr-2"></i>
                                            <span class="mr-2">18 sep 2019 at 18:00 am</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>`;
                    $("#supplyerrates").append(d);
                }

            }


        },
        error: function (result) {
            alert('error');
        }
    });
}

function GetAllSupllierCredits(supplierid) {
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/points/histories/suppliers",
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

                let data = result.data;
                let wrapper = "", img = "", catName = "test";
                for(let item of data) {
                    if (item.task) {
                        catName = getCategory(Number(item.task.category)).name_en;
                        if (item.task.images[0]) {
                            img = `${'http://88.80.184.99/tasker/web/' + item.task.images[0]}`;
                        } else {
                            img = "https://via.placeholder.com/150";
                        }
                    } else if (item.offer) {
                        catName = getCategory(Number(item.offer.category)).name_en;
                        if (item.offer.images[0]) {
                            img = `${'http://88.80.184.99/tasker/web/' + item.offer.images[0]}`;
                        } else {
                            img = "https://via.placeholder.com/150";
                        }
                    }


                    wrapper += `
                <li>
                    <div class="d-flex">
                        <div class="client-img-block">
                            <img class="img-service" src="${img}" alt="">
                        </div>
                        <div class="booking-details">
                            <div class="details-head">
                                <div class="details">
                                    <div>
                                        <h5 class="bold-font">${catName}</h5> <span></span>
                                    </div>
                                </div>
                                <div>
                                    <span class="price">$${item.point}</span>
                                </div>
                            </div>
                            <div class="payement-method text-right">
                                <div class="payement">
                                    <span>Payment method: </span>
                                    <span>Credit</span>
                                </div>
                                <div class="date">
                                    <span>${item.created}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                `
                }
                $("#credit .pending-bookings-list").html(wrapper)
            }
        },
        error: function (result) {
            alert('error');
        }
    });
}










  