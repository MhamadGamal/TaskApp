//beforeSend: function (xhr) { xhr.setRequestHeader('key', 'Content-Type'); },
//data: {user_name: "A12345", email: "dev.abdou@gmail.com",name:"mohamed",phone:"012838483444",password:"12345336",
//    confirm_password:"12345336",type:"supplier",fbtoken:"testtest",device_token:"testtesttest",info:info,category:category
//},
//data: { email: "Hagar.abdelghafar@gmail.com", password: "000000", device_token: "test" },
//beforeSend: function (xhr) {
//    debugger;
//    xhr.setRequestHeader('Header', Header);
//},
// headers: { 'Content-Type': 'application/json' },
//  beforeSend: function (xhr) { xhr.setRequestHeader('Content-Type', 'application/json'); },

$("#loginbtn").on("click",function (e) {
    e.preventDefault();
    let email = $("#usermail").val();
    let password = $("#userpass").val();
    let token = "test";
    if (email && password) {
        $.ajax({
            url: "http://88.80.184.99/tasker/web/api/logins",
            method: 'POST',
            dataType: "json",
            async: false,
            cache: false,
            timeout: 30000,
            data: { 'email': email, 'password': password, 'device_token': token },
            success: function (result) {
                let usertoken = result.data.token;
                let usertype = result.data.type;
                if (usertoken && usertype) {
                    localStorage.setItem('CurrentToken', usertoken);
                    localStorage.setItem('CurrentUserType', usertype);
                    //alert('Ok');
                    email = "";
                    password = "";
                    if(localStorage.getItem("CurrentUserType") == "user"){
                        location.href = '../home/index.html';
                    }
                }

                else {
                    alert('error');
                }

            },
            error: function (result) {
                alert('error');
            }
        });
    }
});