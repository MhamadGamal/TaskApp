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
                    <a class="dropdown-item" href="../provider/account.html"> <i class="far fa-address-card"></i> My Account</a>                        <a class="dropdown-item" href="../provider/credit.html"> <i class="far fa-credit-card"></i> My Credit</a>
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

    $(document).on("click","#contactForm", function(e){
        e.preventDefault();
        let email = $("#userEmail");
        emailValid = false;
        let msg = $("#userMessage");
        if(email.val() == ""){
            email.addClass("error")
        }else{
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(String(email.val()).toLowerCase()) == true){
                emailValid = true;
            }else{
                email.parent().append("<span style='color: red'>Enter a valid email</span>")
            }
        }
        $(email).on("keypress", function(){
            $(this).parent().find("span").remove()
        });
        if(msg.val() == ""){
            msg.addClass("error")
        }
        if(emailValid && msg){
            $.ajax({
                url: "http://88.80.184.99/tasker/web/api/contacts/us",
                method: 'POST',
                cache: false,
                async: false,
                timeout: 30000,
                dataType: "json",
                data: {"email": email.val(), "message": msg.val()},
                success: function (result) {
                    console.log(result);
                    $(".alert").removeClass("alert-danger").html("your message sent successfuly").fadeIn();
                    $('body, html').animate({
                        scrollTop: 0
                    }, 400);
                },
                error: function (result) {
                    console.log(result);
                    $(".alert").addClass("alert-danger").html(result.statusText).fadeIn();
                    $('body, html').animate({
                        scrollTop: 0
                    }, 400);
                }
            });
         
        }
    });
});//ready function