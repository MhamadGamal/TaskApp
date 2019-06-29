$("#CustomerRegisterbtn").on("click",function () {
    let user_name = $("#customerUserName").val();
    let email = $("#customerEmail").val();
    let name = $("#customerUserName").val();
    let phone = $("#customerMobile").val();
    let password = $("#customerPassword").val();
    let fbtoken = "testtest";
    let device_token = "testtesttest";
    let info = {};
    customerLocation
    let category = {};
    if (email && password) {
        $.ajax({
            url: "http://88.80.184.99/tasker/web/api/adds/users",
            method: 'POST',
            dataType: "json",
            data: {
                user_name: user_name, email: email, name: name, phone: phone, password: password,
                confirm_password: password, type: "customer", fbtoken: fbtoken, device_token: device_token, info: info, category: category
                },
            success: function (result) {
                debugger;
                let usertoken = result.data.token;
                let usertype = result.data.type;
                if (usertoken && usertype) {
                  
                    localStorage.setItem('CurrentToken', usertoken);
                    localStorage.setItem('CurrentUserType', usertype);
                    alert('Ok');
                    location.href = '../../index.html';
                }

                else {
                    alert('err');
                }

            },
            error: function (result) {
                alert('error');
            }
        });
    }
});


$("#CustomerSignup").click(function () {
    localStorage.setItem('NewUserType', "Customer");
});
$("#ProviderSignup").click(function () {
    localStorage.setItem('NewUserType', "Provider");
});

