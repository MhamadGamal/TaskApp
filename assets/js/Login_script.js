$("#loginbtn").on("click",function (e) {
    e.preventDefault();
    let email = $("#usermail").val();
    let password = $("#userpass").val();
    let token = "test";


    if(!email){
        $("#usermail").addClass("error")
        
    }
    if(!password){
        $("#userpass").addClass("error")
    }
    if (email && password) {
        var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{5})$/;
        if(email.match(phoneno)){
            $.ajax({
                url: "http://88.80.184.99/tasker/web/api/logins",
                method: 'POST',
                dataType: "json",
                async: false,
                cache: false,
                timeout: 3000,
                data: { 'phone': email, 'password': password},
                success: function (result) {
                    debugger;
    
                    if (result.error.status==true) {
                        var message = result.error.message;
                        $("#alert").fadeIn().html(message);
                    }
                    else {
    
                        let usertoken = result.data.token;
                        let usertype = result.data.type;
                        if (usertoken && usertype) {
                            localStorage.setItem('CurrentToken', usertoken);
                            localStorage.setItem('CurrentUserType', usertype);
                            email = "";
                            password = "";
                            if (localStorage.getItem("CurrentUserType") == "user") {
                                location.href = '../../index.html';
                            }
                        }
    
                        else {
                        $("#alert").fadeIn().html(message);
                        //alert('error');
                        }
                    }
                  
    
                },
                error: function (result) {
                    
                    $("#alert").fadeIn().html(message);                
                    //alert('error');
                }
            });
        }
        else{
            $.ajax({
                url: "http://88.80.184.99/tasker/web/api/logins",
                method: 'POST',
                dataType: "json",
                async: false,
                cache: false,
                timeout: 3000,
                data: { 'email': email, 'password': password, 'device_token': token },
                success: function (result) {
                    debugger;
    
                    if (result.error.status==true) {
                        var message = result.error.message;
                        $("#alert").fadeIn().html(message);
                    }
                    else {
    
                        let usertoken = result.data.token;
                        let usertype = result.data.type;
                        if (usertoken && usertype) {
                            localStorage.setItem('CurrentToken', usertoken);
                            localStorage.setItem('CurrentUserType', usertype);
                            email = "";
                            password = "";
                            if (localStorage.getItem("CurrentUserType") == "user") {
                                location.href = '../../index.html';
                            }else{
                                location.href = '../../index.html';
                            }
                        }
    
                        else {
                        $("#alert").fadeIn().html(message);
                        //alert('error');
                        }
                    }
                  
    
                },
                error: function (result) {
                    
                    $("#alert").fadeIn().html(message);                
                    //alert('error');
                }
            });
        }
    } 
   
  
   
});
$("#fbloginbtn").on("click", function (e) {
    debugger;
            
    // FB.init({
    //     appId: '{2090271437933678}',
    //     autoLogAppEvents : true,
    //     xfbml: true,
    //     version: 'v2.7'
    // });

// FB.login(function(response) {
//     if (response.authResponse) {
//     var access_token =   FB.getAuthResponse()['accessToken'];
//     console.log('Access Token = '+ access_token);
//     FB.api('/me', function(response) {
//     console.log('Good to see you, ' + response.name + '.');
//     });
//     } else {
//     console.log('User cancelled login or did not fully authorize.');
//     }
// }, {scope: ''});



    //}
    // // initialize and setup facebook js sdk
    // window.fbAsyncInit = function () {
    //     FB.init({
    //         appId: '2750690094972349',
    //         xfbml: true,
    //         version: 'v2.5'
    //     });
    //     FB.getLoginStatus(function (response) {
    //         if (response.status === 'connected') {
    //             document.getElementById('status').innerHTML = 'We are connected.';
    //             document.getElementById('login').style.visibility = 'hidden';
    //         } else if (response.status === 'not_authorized') {
    //             document.getElementById('status').innerHTML = 'We are not logged in.'
    //         } else {
    //             document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
    //         }
    //     });
    // };
    // (function (d, s, id) {
    //     var js, fjs = d.getElementsByTagName(s)[0];
    //     if (d.getElementById(id)) { return; }
    //     js = d.createElement(s); js.id = id;
    //     js.src = "//connect.facebook.net/en_US/sdk.js";
    //     fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));

    // // login with facebook with extra permissions
    // function login() {
    //     FB.login(function (response) {
    //         if (response.status === 'connected') {
    //             document.getElementById('status').innerHTML = 'We are connected.';
    //             document.getElementById('login').style.visibility = 'hidden';
    //         } else if (response.status === 'not_authorized') {
    //             document.getElementById('status').innerHTML = 'We are not logged in.'
    //         } else {
    //             document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
    //         }
    //     }, { scope: 'email' });
    // }

    // // getting basic user info
    // function getInfo() {
    //     FB.api('/me', 'GET', { fields: 'first_name,last_name,name,id,picture.width(150).height(150)' }, function (response) {
    //         document.getElementById('status').innerHTML = "<img src='" + response.picture.data.url + "'>";
    //     });
    // }


    // var access_token;
    // //FB.login(function (response) {
    // //    debugger;
    // //    if (response.authResponse) {
    // //        access_token = FB.getAuthResponse()['accessToken'];
    // //        console.log('Access Token = ' + access_token);
    // //        FB.api('/me', function (response) {
    // //            console.log('Good to see you, ' + response.name + '.');
    // //        });
    // //    }
    // //    else {
    // //        alert('User cancelled login or did not fully authorize.');
    // //    }
    // //}, { scope: '' });

    // (function (d, s, id) {
    //     var js, fjs = d.getElementsByTagName(s)[0];
    //     if (d.getElementById(id)) { return; }
    //     js = d.createElement(s); js.id = id;
    //     js.src = "//connect.facebook.net/en_US/sdk.js";
    //     fjs.parentNode.insertBefore(js, fjs);
    // }(document, 'script', 'facebook-jssdk'));

    // if (access_token) {
    //     $.ajax({
    //         url: "http://88.80.184.99/tasker/web/api/logins",
    //         method: 'POST',
    //         data: { 'fbtoken': access_token },
    //         success: function (result) {
    //             debugger;
    //             let usertoken = result.data.token;
    //             let usertype = result.data.type;
    //             if (usertoken && usertype) {
    //                 localStorage.setItem('CurrentToken', usertoken);
    //                 localStorage.setItem('CurrentUserType', usertype);
    //                 email = "";
    //                 password = "";
    //                 if (localStorage.getItem("CurrentUserType") == "user") {
    //                     location.href = '../../index.html';
    //                 }
    //             }

    //             else {
    //                 alert('error');
    //             }

    //         },
    //         error: function (result) {
    //             alert('error');
    //         }
    //     });
    // }
});