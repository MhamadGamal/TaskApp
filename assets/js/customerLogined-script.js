let type = localStorage.getItem("CurrentUserType");

if(type  == "user"){
    $("header").addClass("customer");
    $("header").html(`
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
            <a href="offers.html" class="btn btn-default">SEE MORE <i class="fas fa-chevron-right    "></i></a>
        </div>  
      </div>
      <div class="carousel-item">
        <img src="../../assets/img/home/service-slider1.png" class="d-block w-100" alt="...">
        <div class="offer-details">
            <h1 class="main-color">Check All Offers</h1>
            <h3>Our Providers here to help you</h3>
            <a href="offers.html" class="btn btn-default">SEE MORE <i class="fas fa-chevron-right    "></i></a>
        </div>
      </div>
      
    </div>
  </div>

    
    `);
}