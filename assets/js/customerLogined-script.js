let type = localStorage.getItem("CurrentUserType");
$.get("", function(data){

});

$.ajax({
    url: "http://88.80.184.99/tasker/web/api/list/hot/offer",
    method: 'GET',
    dataType: "json",
    success: function (result) {
        console.log(result)
    },
    error: function (result) {
        alert('error');
    }
});

if(type  == "user"){
    $("header").addClass("customer");
    $("header").html(`
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
                        <a class="dropdown-item" href="#"><i class="fas fa-sign-out-alt"></i>Logout</a>
                    </div>
                </li>
            </ul>
            <!-- <a href="../login/login.html" class="login-btn">
                <img src="../../assets/img/client/user.png"  alt="" srcset="">
            
            </a> -->
        </div>
    </div>
</nav>
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="../../assets/img/home/service-slider1.png" class="d-block w-100" alt="...">
        <div class="offer-details">
            <h1 class="main-color">Check All Offers</h1>
            <h3>Our Providers here to help you</h3>
            <a href="pages/client/offers.html" class="btn btn-default">SEE MORE <i class="fas fa-chevron-right    "></i></a>
        </div>  
      </div>
      <div class="carousel-item">
        <img src="../../assets/img/home/service-slider1.png" class="d-block w-100" alt="...">
        <div class="offer-details">
            <h1 class="main-color">Check All Offers</h1>
            <h3>Our Providers here to help you</h3>
            <a href="pages/client/offers.html" class="btn btn-default">SEE MORE <i class="fas fa-chevron-right    "></i></a>
        </div>
      </div>
      
    </div>
  </div>

    
    `);
}