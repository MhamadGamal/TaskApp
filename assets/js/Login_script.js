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
                            }else{
                                location.href = '../provider/dashboard.html';
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
                                location.href = '../provider/dashboard.html';
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