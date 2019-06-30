let loginnedNavbar = `
<nav class="navbar navbar-expand-lg fixed-top">
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
                <a class="nav-link" href="../provider/Providers.html">Providers</a>
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
                    <img src="../../assets/img/client/user.png" alt="" srcset="">
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="../client/account.html"> <i class="far fa-address-card"></i> My Account</a>
                    <a class="dropdown-item" href="../client/rating.html"><i class="fas fa-star"></i>My Ratings</a>
                    <div class="dropdown-divider"></div>
                    <a  id="LogOut" class="dropdown-item" href="#"><i class="fas fa-sign-out-alt"></i>Logout</a>
                </div>
            </li>
        </ul>
        <!-- <a href="../login/login.html" class="login-btn">
            <img src="../../assets/img/client/user.png"  alt="" srcset="">
        
        </a> -->
    </div>
</div>
</nav>

`;






let mainCategoryArr = [], subCategoryArr = [];
$.get("http://88.80.184.99/tasker/web/api/main/catgeory", function(data){
    let d = data;
    mainCategoryArr = d.data;

});
$.get("http://88.80.184.99/tasker/web/api/sub/category", function(data){
    let d = data;
    subCategoryArr = d.data;

});

function getCategory(id){
    let allCat = mainCategoryArr.concat(subCategoryArr), targetCateg;
    for(let categ of allCat){
        if( categ.id == id ){
            targetCateg = categ;
            break;
        }
    }
    console.log(allCat);
    return targetCateg;
}

$(function(){
    
    if(localStorage.getItem("CurrentUserType") == "user"){
        $(".navbar").html(loginnedNavbar);
    }else if(localStorage.getItem("CurrentUserType") == "supplier"){
        //$(".navbar").html(loginnedNavbar);
    }
    
    $(document).on("click","[href='#'], [type='submit']", function(e){
        e.preventDefault()
    })
    //logout
    $(document).on("click","#LogOut",function () {
        let Token = localStorage.getItem("CurrentToken");
        if (Token) {
            $.ajax({
                url: "http://88.80.184.99/tasker/web/api/logouts",
                method: 'POST',
                data: { 'token': Token },
                success: function (result) {
                    localStorage.removeItem('CurrentToken');
                    localStorage.removeItem('CurrentUserType');
                    window.location.pathname = 'index.html';
                    if(window.location.pathname == 'index.html'){
                        location.reload()
                    }
                },
                error: function (result) {
                    alert('error');
                }
            });
        }

    });
    

    //accordian
    $(".accord-item ").on("click",".accord-link", function(e){
        e.preventDefault();
        $(this).find("i").toggleClass("fa-chevron-up")
        $(this).addClass("active").parent().siblings().find("a.accord-link").removeClass("active");
        $(this).siblings(".item-content").slideToggle().parent().siblings().find(".item-content").slideUp();
    });

});