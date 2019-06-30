$("#CustomerRegisterbtn").on("click", function (e) {
    debugger;
    e.preventDefault();
    let user_name = $("#customerUserName").val();
    let email = $("#customerEmail").val();
    let name = $("#customerUserName").val();
    let phone = $("#customerMobile").val();
    let password = $("#customerPassword").val();
    let locat = $("#customerLocation").val();
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
                "fbtoken": "testtest",
                "device_token": "testtesttest",
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
                    alert(message);
                }
                else {
                    let usertoken = result.data.token;
                    let usertype = "user";
                    localStorage.setItem('CurrentToken', usertoken);
                    localStorage.setItem('CurrentUserType', usertype);
                    alert("signed goto verify");
                    window.location.pathname = 'pages/login/verify.html';

                    
                }

            },
            error: function (result) {
                debugger;
                alert('error');
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
    if (password && phone && user_name && email && password) {
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
                "fbtoken": "testtest",
                "device_token": "testtesttest",
                "info": {
                    "location": "egy",
                    "lang": "554.5",
                    "lant": "544.54",
                    "address": add
                },
                "category": ["1", "2", "3"]
            },
            success: function (result) {
                if (result.error.status == true) {
                    var message = result.error.message;
                    alert(message);
                }
                else {
                    let usertoken = result.data.token;
                    let usertype = "supplier";
                    localStorage.setItem('CurrentToken', usertoken);
                    localStorage.setItem('CurrentUserType', usertype);
                    window.location.pathname = 'pages/login/verify.html';

                }

            },
            error: function (result) {
              
                alert('error');
            }
        });
    }
});
$("#confirmVerify").on("click", function (e) {
    e.preventDefault();
    let code = $("#verify").val();
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
                    alert(message);
                }
                else {

                    if (CurrentUserType =="user") {
                        console.log(CurrentUserType);
                        window.location.pathname = 'pages/login/customer-confirmed.html';
                    }

                    else {
                        console.log(CurrentUserType);
                        window.location.pathname = 'pages/login/provider-confirmed.html';

                    }
                    
                }

            },
            error: function (result) {
                alert('error');
            }
        });
    }
});


