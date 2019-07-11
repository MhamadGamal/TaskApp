let type = localStorage.getItem("CurrentUserType");
let offersArr = [], offersSliderArr = [], polits ="", slides = "", pageContent =""; 

   
if(type  == "user"){
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/list/hot/offer",
        method: 'GET',
        dataType: "json",
        success: function (result) {
            offersArr = result.data;
            for(let item of offersArr){
                if( item.image.length > 0 ){
                    offersSliderArr.push(item)
                }
            }
            // prepairing home slider
            for(let i = 1 ; i<offersSliderArr.length; i++){
                if( i == 5){
                    break;
                }
                polits += `<li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>`
                slides += `
                <div class="carousel-item">
                    <img src="http://88.80.184.99/tasker/web/${offersSliderArr[i].image[0]}" class="d-block w-100" alt="...">
                    <div class="offer-details">
                        <h1 class="main-color">Check All Offers</h1>
                        <h3>Our Providers here to help you</h3>
                        <a href="pages/client/offers.html" class="btn btn-default">SEE MORE <i class="fas fa-chevron-right    "></i></a>
                    </div>
                </div>
                
                `
            }
          
            pageContent = `
            ${loginnedNavbar}
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              ${polits}
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
              ${slides}
            </div>
          </div>
        
            
            `

            $("header").addClass("customer");
            $("header").html(pageContent);
            if(loginnedUserData.image){
                $(".navbar-nav li a img ").attr("src", "http://88.80.184.99/tasker/web/"+loginnedUserData.image)
            }else{
                $(".navbar-nav li a img ").attr("src", "../../assets/img/client/user.png")
            }
        },
        error: function (result) {
            alert('error');
        }
    });
   
}
setTimeout(function(){

 
$('#carouselExampleIndicators').carousel({
    interval: 2000,
    cycle: true
  }); 
},500)


