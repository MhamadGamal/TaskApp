$(function(){
    if(loginnedUserData.type == "user"){

        $(".navbar").html(`
        <div class="container">
        <a class="navbar-brand logo bold-font main-color" href="../../index.html">Task<span
                class="normal-font s-color">app </span></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class=""> <i class="fas fa-bars    "></i> </span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav ">
                <li class="nav-item active ">
                    <a class="nav-link" href="../../index.html">Services </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../client/providers.html">Providers</a>
                </li>
                <li class="nav-item notify dropdown">
                    <a class="nav-link dropdown-toggle " href="../client/bookings.html" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">My Bookings</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="../client/pendings.html"> <i class="far fa-address-card"></i> Pending Bookingst</a>
                        <a class="dropdown-item" href="../client/booking-list.html"><i class="far fa-address-card"></i>Bookings List</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="../client/rating.html"><i class="fas fa-star"></i>Ratings</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src="" alt="" srcset="">
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="../client/account.html"> <i class="far fa-address-card"></i> My Account</a>
                        <div class="dropdown-divider"></div>
                        <a  id="LogOut" class="dropdown-item" href="#"><i class="fas fa-sign-out-alt"></i>Logout</a>
                    </div>
                </li>
            </ul>
            
        </div>
    </div>
        `)
    }else{
        $(".navbar").html(`
        <div class="container">
        <a class="navbar-brand logo bold-font main-color" href="../../index.html">Task<span
                class="normal-font s-color">app </span></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class=""> <i class="fas fa-bars    "></i> </span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav ">
                <li class="nav-item active ">
                    <a class="nav-link main-btn px-3 py-2 normal" href="../provider/addNOffer.html">Add New Offer </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="../provider/dashboard.html">My Dashboard</a>
                </li>
                <li class="nav-item notify ">
                    <a class="nav-link " href="../provider/bookings.html">My Bookings</a>
                   
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src="" alt="" srcset="">
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="../provider/account.html"> <i class="far fa-address-card"></i> My Account</a>                        
                        <a class="dropdown-item" href="../provider/credit.html"> <i class="far fa-credit-card"></i> My Credit</a>
                        <a class="dropdown-item" href="../provider/rating.html"><i class="fas fa-star"></i>My Ratings</a>
                        <div class="dropdown-divider"></div>
                        <a id="LogOut" class="dropdown-item" href="#"><i class="fas fa-sign-out-alt"></i>Logout</a>
                    </div>
                </li>
            </ul>
            
        </div>
    </div>
        `)
    }
    if(loginnedUserData.image){
        $(".navbar-nav li a img ").attr("src", "http://88.80.184.99/tasker/web/"+loginnedUserData.image)
    }else{
        $(".navbar-nav li a img ").attr("src", "../../assets/img/client/user.png")
    }
    let imgBase64;
    console.log(loginnedUserData);
    let currtoken = localStorage.getItem("CurrentToken")
    $("#userImg").attr('src','http://88.80.184.99/tasker/web/'+loginnedUserData.image)
    $("#showUserName").text(loginnedUserData.name);
    $("#editUserName input").val(loginnedUserData.name);
    $("#phone").text(loginnedUserData.phone);
    $("#userEmail").text(loginnedUserData.email);
    $("#userAddress").text(loginnedUserData.info.address);
    $("#editAddress input").val(loginnedUserData.info.address);
    if(loginnedUserData.setting.language){
        document.querySelector("#language option[value='"+loginnedUserData.setting.language+"']").selected = true
    }
    debugger;
    let emailStatusBtn = document.querySelector(".switch-email input[type='checkbox']");
    //set email status
    if(loginnedUserData.setting.email == "true"){
        emailStatusBtn.checked = true
    }else{
        emailStatusBtn.checked = false

    }
    
    if(loginnedUserData.type == "supplier"){
        $("#showBusinessName").text(loginnedUserData.user_name);
        $("#businessName input").val(loginnedUserData.user_name);
        $("#userDesc").text(loginnedUserData.description)
        $("#userDiscEdit textarea").val(loginnedUserData.description);
        let chbx = document.querySelector("#activStatus input[type='checkbox']")
        if(loginnedUserData.worked == 1){   
            chbx.checked = true
        }else{
            chbx.checked = false

        }

        let categoriesWrapper = "";
        for(let cat of loginnedUserData.category){
            categoriesWrapper += `
            <label id="${getCategory(Number(cat)).id}"> ${getCategory(Number(cat)).name_en} </label>
            `;
        }
        $(".categories").html(categoriesWrapper);
        let CAwrapper="";
        for( let item of subCategoryArr){
             
            let id = String(item.id)
            if(loginnedUserData.category.includes(id)){
                CAwrapper += `
                      
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" checked="checked" class="custom-control-input" value="${item.name_en}" data-id="${item.id}"  id="${item.name_en}${item.id}">
                    <label class="custom-control-label" for="${item.name_en}${item.id}">${item.name_en} </label>
                </div>
            `;
            }
            else{
                CAwrapper += `
                  
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox"  class="custom-control-input" data-name="${item.name_en}" value="${item.name_en}" data-id="${item.id}"  id="${item.name_en}">
                        <label class="custom-control-label" for="${item.name_en}">${item.name_en} </label>
                    </div>
                `;
            }
        }
        $("#providersCategories .modal-body").html(CAwrapper);
        $("#editProvCateg").on("click", function(){
            $("#providersCategories").modal("show");
        });


        //modal
        $(document).on("click","#SaveCategories", function(e){
            e.preventDefault();
             checedArr = [];
            let els = document.querySelectorAll(".modal-body input[type='checkbox']")
            els.forEach((el)=>{
                if( el.checked == true ){  checedArr.push(el) }
            
            })
            console.log(checedArr);
            let categoriesWrapper = "";
            for(let cat of checedArr){
                categoriesWrapper += `
                <label id="${cat.getAttribute('data-id')}"> ${cat.value} </label>
                `;
            }
            $(".categories").html(categoriesWrapper);
            $('#providersCategories').modal('hide')
        });

        //Active stauts
        let activStatus = 0;
        $("#activStatus input[type='checkbox']").on("change", function(){
            debugger;
            let isWorked = 0;
            if($(this).is(":checked") == true ){
                isWorked = 1
            }
            debugger;
            $.ajax({
                url: "http://88.80.184.99/tasker/web/api/changes/statuses",
                method: 'POST',
                dataType: "json",
                async: false,
                cache: false,
                timeout: 30000,
                data: {
                    "token": currtoken,
                    "is_worked": isWorked
                },
                success: function (result) {
                    debugger;
                    if (result.error.status == true) {
                        var message = result.error.message;
                        $(".alert").fadeIn().html(message);                
                        //alert('error');
                    }
                    else {
    
                        console.log(result);
                          GetCurrentUserData(currtoken)

                        //location.reload()
                        
                    }
    
                },
                error: function (result) {
                    $(".alert").fadeIn().html("error");                
                
                    //alert('error');
                }
            }); 
    
        });

    }//supplieeeeeeeeeer

    //edit text
    $(document).on("click", "span.edit", function(){
        $($(this).attr("for")).fadeIn();
        $("#updateData").fadeIn().removeClass("d-none").addClass("d-flex");
    });
    $(document).on("click", "button#cancel", function(){
        $(".user-edit").fadeOut();
        $(this).parent().addClass("d-none").removeClass("d-flex");
    });
    //upload image
    $("#imgUpload").on("change", function(){
        let img = document.getElementById("userImg");
        let inpt = document.getElementById("imgUpload");
        let imgObj = upload(img, inpt);
        setTimeout(()=>{
            imgBase64 = imgObj.result.substring(23);
            $.ajax({
                url: "http://88.80.184.99/tasker/web/api/images/uploads",
                method: 'POST',
                dataType: "json",
                data: {
                    "token": currtoken,
                     "profile_image": imgBase64
                },
                success: function (result) {
                     
                    if (result.error.status == true) {
                        var message = result.error.message;
                        $(".alert").fadeIn().html(message)
                    }
                    else {
                        console.log(result);
                        GetCurrentUserData(currtoken)
                        location.reload();
                    }
                },
                error: function (result) {
                    $(".alert").fadeIn().html("server error")
                }
            });
        },1000)
    })
    //save data
    $(document).on("click", "button#save", function(){
         debugger;
        let userName = $("#editUserName input").val();
        let address = $("#editAddress input").val();
        let businessName = $("#businessName input").val();
        
        let description = $("#userDiscEdit textarea").val();
        let updatedData;
        let catWrapper = document.querySelectorAll(".categories label");
        let category =[];
        for(let item of catWrapper){
            category.push(item.getAttribute("id"))
        }
        if(loginnedUserData.type == "user"){
            updatedData = {
                "name": userName,
                "address": address,
                "token": currtoken
            }
        }else{

            updatedData = {
                "name": userName,
                "address": address,
                "user_name": businessName,
                "description": description,
                "category": category,
                "token": currtoken
            }
        }
        $.ajax({
            url: "http://88.80.184.99/tasker/web/api/profiles/edits",
            method: 'POST',
            dataType: "json",
            async: false,
            cache: false,
            timeout: 30000,
            data: updatedData,
            success: function (result) {
                 
                if (result.error.status == true) {
                    var message = result.error.message;
                    $(".alert").fadeIn().html(message);                
                    //alert('error');
                }
                else {

                    console.log(result);
                    GetCurrentUserData(currtoken)
                    location.reload()
                    
                }

            },
            error: function (result) {
                $(".alert").fadeIn().html("error");                
            
                //alert('error');
            }
        });
    });


    


     // setting

     $(".switch-email input[type='checkbox']").on("change", function(e){
         e.preventDefault();
         debugger;
        let emailStatus;
        if(document.querySelector(".switch input[type='checkbox']").checked){
            emailStatus = true;
        }else{
            emailStatus = false;
        }
        console.log(emailStatus);
        $.ajax({
            url: "http://88.80.184.99/tasker/web/api/adds/settings",
            method: 'POST',
            dataType: "json",
            async: false,
            cache: false,
            timeout: 30000,
            data: {
                "setting": {
                    "email": emailStatus,
                    "notification": loginnedUserData.setting.notification,
                    "sms": loginnedUserData.setting.sms
                },
                "token": currtoken
            },
            success: function (result) {
                 
                if (result.error.status == true) {
                    var message = result.error.message;
                    $(".alert").fadeIn().html(message);                
                    //alert('error');
                }
                else {

                    console.log(result);
                    GetCurrentUserData(currtoken)
                    //location.reload()
                    
                }

            },
            error: function (result) {
                $(".alert").fadeIn().html("error");                
            
                //alert('error');
            }
        });
    })



});