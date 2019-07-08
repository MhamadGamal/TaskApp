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

let providerNavbar = `
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
                <a class="nav-link main-btn px-3 py-2 normal" href="addNOffer.html">Add New Offer </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="pages/provider/dashboard.html">My Dashboard</a>
            </li>
            <li class="nav-item notify ">
                <a class="nav-link " href="pages/provider/bookings.html">My Bookings</a>
               
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <img src="assets/img/client/user.png" alt="" srcset="">
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="pages/provider/profile.html"> <i class="fas fa-user"></i>Profile</a>
                    <a class="dropdown-item" href="pages/provider/account.html"> <i class="far fa-address-card"></i> My Account</a>
                    <a class="dropdown-item" href="pages/provider/credit.html"> <i class="far fa-credit-card"></i> My Credit</a>
                    <a class="dropdown-item" href="pages/provider/rating.html"><i class="fas fa-star"></i>My Ratings</a>
                    <div class="dropdown-divider"></div>
                    <a id="LogOut" class="dropdown-item" href="#"><i class="fas fa-sign-out-alt"></i>Logout</a>
                </div>
            </li>
        </ul>
        <!-- <a href="../login/login.html" class="login-btn">
            <img src="../../assets/img/client/user.png"  alt="" srcset="">
        
        </a> -->
    </div>
</div>
`;


function slider(selector){
    $(selector).slick({
        autoplaySpeed: 2000,
        slidesToShow: 3,
        accessibility: false,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 2500,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 2,
                dots: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false
              }
            }
            
          ]
        });
}



// get categories and sub categories
let mainCategoryArr = [], subCategoryArr = [], allCat = [];
$.get("http://88.80.184.99/tasker/web/api/main/catgeory", function(data){
    let d = data;
    mainCategoryArr = d.data;
    
});
$.get("http://88.80.184.99/tasker/web/api/sub/category", function(data){
    let d = data;
    subCategoryArr = d.data;
});
$(function(){
    setTimeout(function(){
        allCat = mainCategoryArr.concat(subCategoryArr);
        console.log('allCat');
        console.log(allCat);
    },500)
})
function getCategory(data){
    allCat = mainCategoryArr.concat(subCategoryArr);
     let targetCateg, targetCategArr = [];
     if(typeof data == "number"){
        for(let categ of allCat){
            if( categ.id == data ){
                targetCateg = categ;
                break;
            }
        }
        
        
    }else if(typeof data == "string"){
        for(let categ of allCat){
            if( categ.name_en.toLowerCase().includes(data) == true ){
                targetCategArr.push(categ)
                
            }
        }
       
        targetCateg = targetCategArr;
    }
    return targetCateg;
}


// get home page testominals

$.ajax({
    url: "http://88.80.184.99/tasker/web/api/tops/suppliers",
    method: "POST",
    dataType: "json",
    async: false,
    cache: false,
    success: function (result) {
        let testominalsData = result.data, content = "";
        if (result.error.status==true) {
            var message = result.error.message;
            alert(message);
        }
        else {
            for(let item of testominalsData){
                if(item.reviews[0]){
                    if(item.image){
                        img = item.image
                    }else{
                        img = "image20190622114818.png"
                    }

                    content += `
                <div class="test-item">
                    <p>
                        ${item.reviews[0].message}
                    </p>
                    <div class="d-flex info">
                        <div class="img-wrapper">
                            <img src="http://88.80.184.99/tasker/web/${img}" alt="">
                        </div>
                        <div class="p-name">
                            <h5>${item.name}</h5>
                            <p class="main-color">EGYPT</p>
                        </div>
                    </div>
                </div>
                `
                }
            }

           $(".home-testmonials .slider-gallery").html(content);
           slider(".home-testmonials .slider-gallery");
        }
      

    },
    error: function (result) {
        alert('error');
    }
})






$(function(){
    

    

    // home filter category
    $(document).on("keyup", "#homeFilterService", function(e){
        $("script[src *= 'api_script.js']").remove();
        let searchVal = $(this).val();
        let filteredArr = getCategory(String(searchVal));
        let wrapper = "";
        console.log(filteredArr);

        if(filteredArr[0]){
            $("#services .single-service .img-holder img").attr("src", "http://88.80.184.99/tasker/web/"+filteredArr[0].image)
            $("#services .single-service .service-info h4").text(filteredArr[0].name_en)
            $("#services .single-service .service-info a").text(`Check ${filteredArr[0].name_en} Services`)
            $("#services .single-service .service-info a").attr("href", `pages/home/subcategory.html?${filteredArr[0].id}`)
    
        }
        wrapper = "";
        $("#services .slider-gallery").html("");
        for( let item of filteredArr ){
            wrapper += `
                <div class="gallery-item">
                  <div class="img-holder">
                      <img src="${'http://88.80.184.99/tasker/web/'+item.image}" class="img-fluid" alt="">
                  </div>
                  <div class="item-info">
                      <h4>
                              ${item.name_en}
                      </h4>
                      <a href="pages/home/subcategory.html?${item.id}" class="btn main-btn">Check ${item.name_en} Service</a>
                  </div>
                </div>
            `
          }
          $('#services .slider-gallery').slick("unslick");
          $("#services .slider-gallery").html(wrapper);
          slider("#services .slider-gallery");
        
          

    });//filter end





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
                    localStorage.removeItem('CurrentUserData');
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
    
    //remove validatios
    $(".error").on("keypress", function(){
        $(this).removeClass("error");
    })

});