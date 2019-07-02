function back(){
    $("#changedContainer").html(`
        <ul class="steps d-flex justify-content-between">
            <li> <span class="active">1</span> Step 1 </li>
            <li> <span class="">2</span> Step 2 </li>
            <li> <span class="">3</span> Step 3 </li>
            </ul>
            <form action="" autocomplete="off">
            <label for="" class="control-label">Email Address</label>
            <input type="email" class="form-control" id="email" placeholder="example@email.com">
            </form>
            <div class="d-flex justify-content-end my-3">
            <a href="#" id="f-step" class="btn main-btn px-5">Next</a>
        </div>
    `)
    return false;
}    

$(function(){

    let token;

    $(".forgot").on("click","#f-step", function(e){
        debugger;
        e.preventDefault();
        let email = String($("#email").val());
       if(email){
        $.ajax({
            url: "http://88.80.184.99/tasker/web/api/inits/resets",
            method: 'POST',
            dataType: "json",
            async: false,
            cache: false,
            timeout: 30000,
            data: {"email": email},
            success: function (result) {
                if (result.error.status == true) {
                    var message = result.error.message;
                    $("#alert").fadeIn().html(message);                
                    //alert('error');
                }
                else {
                    console.log(result);
                    token = result.data.token;
                    $("#changedContainer").html(`
                    <ul class="steps d-flex justify-content-between">
                        <li> <span class="done"><i class="fas fa-check    "></i></span> Step 1 </li>
                        <li> <span class="active">2</span> Step 2 </li>
                        <li> <span class="">3</span> Step 3 </li>
                    </ul>
                    <form action="" autocomplete="off">
                        <label for="" class="control-label">Verification Code</label>
                        <input type="password" class="form-control" id="verCode" placeholder="00000">
                    </form>
                    <div class="d-flex justify-content-end my-3">
                        <a href="#" class="main-color pt-1 d-inline-block mx-3" onclick="back()">Back</a>
                        <a href="#" id="s-step" class="btn main-btn px-5">Next</a>
                    </div>
                `);
                    
                }

            },
            error: function (result) {
                $("#alert").fadeIn().html("error in entered data");                
               
                //alert('error');
            }
        });
       }else{
           $("#email").addClass("error")
       }
        


    });



    $(".forgot").on("click","#s-step", function(e){
        e.preventDefault();
        let verCode = $("#verCode").val()
       if(verCode){
        $.ajax({
            url: "http://88.80.184.99/tasker/web/api/inits/resets",
            method: 'POST',
            dataType: "json",
            async: false,
            cache: false,
            timeout: 30000,
            data: {"code": verCode, "token": token},
            success: function (result) {
                if (result.error.status == true) {
                    var message = result.error.message;
                    $("#alert").fadeIn().html(message);                
                    //alert('error');
                }
                else {
                    console.log("2d");
                    console.log(result);
                    $("#changedContainer").html(`
                    <ul class="steps d-flex justify-content-between">
                        <li> <span class="done"><i class="fas fa-check    "></i></span> Step 1 </li>
                        <li> <span class="done"><i class="fas fa-check    "></i></span> Step 2 </li>
                        <li> <span class="active">3</span> Step 3 </li>
                    </ul>
                    <form action="" autocomplete="off">
                        <label for="" class="control-label">Confirm Password</label>
                        <input type="password" class="form-control" id="conPassword" placeholder="******">
                    </form>
                    <div class="d-flex justify-content-end my-3">
                        <a href="#" id="th-step" class="btn main-btn px-5">Save Password</a>
                    </div>
                `)
                    
                }

            },
            error: function (result) {
                $("#alert").fadeIn().html("error in entered data");                
               
                //alert('error');
            }
        });
       }else{
           $("#verCode").addClass("error")
       }
        
    });

   
});//ready