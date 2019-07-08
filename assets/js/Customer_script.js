$("#CustomerRegisterbtn").on("click", function (e) {
    e.preventDefault();
    let user_name = $("#customerUserName").val();
    let email = $("#customerEmail").val();
    let phone = $("#customerMobile").val();
    let password = $("#customerPassword").val();
    let locat = $("#customerLocation").val();
    if(!email){
        $("#customerEmail").addClass("error")
        
    }
    if(!password){
        $("#customerPassword").addClass("error")
    }
    if(!user_name){
        $("#customerUserName").addClass("error")
        
    }
    if(!phone){
        $("#customerMobile").addClass("error")
    }
    if(!locat){
        $("#customerLocation").addClass("error")
    }
    if (password && phone && user_name && email && password) {
      $.ajax({
            url: "http://88.80.184.99/tasker/web/api/adds/users",
            method: 'POST',
            dataType: "json",
            async: false,
            cache: false,
            timeout: 30000,
            data: {
                "user_name":user_name,
                "email":email,
                "name":name,
                "phone":phone,
                "password":password,
                "confirm_password":password,
                "type": "user",
                "info": {
                    "location": locat,
                    "lang": "554.5",
                    "lant": "544.54",
                    "address": "66 el salam str"
                },
                "category": ["1", "2", "3"]
                },
            success: function (result) {
                if (result.error.status == true) {
                    var message = result.error.message;
                    $("#alert").fadeIn().html(message);                
                //alert('error');
                }
                else {
                    let usertoken = result.data.token;
                    let usertype = "user";
                    localStorage.setItem('CurrentToken', usertoken);
                    localStorage.setItem('CurrentUserType', usertype);
                    GetCurrentUserData(usertoken);
                    alert("signed goto verify");
                    window.location.pathname = 'pages/login/verify.html';

                    
                }

            },
            error: function (result) {
                debugger;
                
                $("#alert").fadeIn().html("error in entered data");                
                //alert('error');
            }
        });
    }
  
    
});
$("#ProviderRegisterbtn").on("click", function (e) {
    e.preventDefault();
    let user_name = $("#providerUserName").val();
    let email = $("#providerEmail").val();
    let name = $("#providerBusinessName").val();
    let phone = $("#providerMobile").val();
    let password = $("#providerPassword").val();
    let add = $("#providersAddress").val();
    let categories = $("#providersServices").text().slice(0,-1).split(",");
    if(!email){
        $("#providerEmail").addClass("error")
        
    }
    if(!password){
        $("#providerPassword").addClass("error")
    }
    if(!user_name){
        $("#providerUserName").addClass("error")
        
    }
    if(!name){
        $("#providerBusinessName").addClass("error")
        
    }
    if(!phone){
        $("#providerMobile").addClass("error")
    }
    if(!add){
        $("#providersAddress").addClass("error")
    }
    if(categories.length <= 1){
        $("#providersServices").addClass("error")
    }
    if (password && phone && user_name && email && password && categories) {
        $.ajax({
            url: "http://88.80.184.99/tasker/web/api/adds/users",
            method: 'POST',
            dataType: "json",
            async: false,
            cache: false,
            timeout: 30000,
            data: {
                "user_name": user_name,
                "email": email,
                "name": name,
                "phone": phone,
                "password": password,
                "confirm_password": password,
                "type": "supplier",
                "info": {
                    "location": "egy",
                    "lang": "554.5",
                    "lant": "544.54",
                    "address": add
                },
                "category": categories
            },
            success: function (result) {
                if (result.error.status == true) {
                    var message = result.error.message;
                    $("#alert").fadeIn().html(message);                
                    //alert('error');
                }
                else {
                    let usertoken = result.data.token;
                    let usertype = "supplier";
                    localStorage.setItem('CurrentToken', usertoken);
                    localStorage.setItem('CurrentUserType', usertype);
                    GetCurrentUserData(usertoken);
                    window.location.pathname = 'pages/login/verify.html';

                }

            },
            error: function (result) {
                $("#alert").fadeIn().html("error in entered data");                           
                //alert('error');
            }
        });
    }
});
$("#confirmVerify").on("click", function (e) {
    e.preventDefault();
    let code = $("#verify").val();
    if(!code){
        $("#verify").addClass("error")
    }
    if (code) {
        let currtoken = localStorage.getItem('CurrentToken');
        let currusertype = localStorage.getItem('CurrentToken');
        $.ajax({
            url: "http://88.80.184.99/tasker/web/api/verifies/users",
            method: 'POST',
            dataType: "json",
            async: false,
            cache: false,
            timeout: 30000,
            data: {
                "code": code,
                "token": currtoken
            },
            success: function (result) {
                if (result.error.status == true) {
                    var message = result.error.message;
                    $("#alert").fadeIn().html(message);                
                    //alert('error');
                }
                else {

                    if (currusertype =="user") {
                        console.log(currusertype);
                        window.location.pathname = 'pages/login/customer-confirmed.html';
                    }

                    else {
                        console.log(currusertype);
                        window.location.pathname = 'pages/login/provider-confirmed.html';

                    }
                    
                }

            },
            error: function (result) {
                $("#alert").fadeIn().html("error in entered data");                
               
                //alert('error');
            }
        });
    }
});

//remove validatios
$(".form-control").on("keypress", function(){
    $("#alert").fadeOut()
})
