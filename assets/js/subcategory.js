let categoryArr, categoryArrFiltered = [], wrapper = "";
let target  = Number(window.location.href.slice(window.location.href.lastIndexOf("?") +1));         
let loginedType = localStorage.getItem("CurrentUserType");
var check = localStorage.getItem('CurrentToken')
console.log(target);

$.get("http://88.80.184.99/tasker/web/api/main/catgeory", function(data){
    let d = data;
    mainCategoryArr = d.data;
    for( let item of mainCategoryArr ){
        if( item.id == target ){
            console.log("heeeeeeeelo",item.main_id);
            $("header#subCatHead").css("background-image",`url(http://88.80.184.99/tasker/web/${item.image})`)
            $("#subCatHead .wrapper  h3").text(item.name_en)
        }        
     }
});


$.get("http://88.80.184.99/tasker/web/api/sub/category", function(data, status){
     let d = data;
     categoryArr = d.data;
     for( let item of categoryArr ){
        if( item.main_id == target ){
            categoryArrFiltered.push(item)
        }        
     }



     


     for(let item of categoryArrFiltered){
         if (check) {
             link = `<h4><a href="../client/describing-task.html?${item.id}">${item.name_en}<a/></h4>`
         }
         else {
             link = `  <h4>${item.name_en}</h4>`;
         }
       wrapper += `
        <div class="col-md-4 col-sm-6">
            <div class="item">
                <div class="img-holder">
                    <img src="${'http://88.80.184.99/tasker/web/'+item.image}" class="img-fluid" alt="">
                </div>
                <div class ="info">
                    ${link}
                    
                </div>
            </div>
        </div>
        
     `
     }
 
     $("#sub-services .row").html(wrapper);
     
 });



// get subcateories page testominals

$.ajax({
    url: "http://88.80.184.99/tasker/web/api/tops/suppliers",
    method: "POST",
    dataType: "json",
    async: false,
    cache: false,
    data: {"category": target},
    success: function (result) {
        let testominalsData = result.data, content = "";
        console.log("result");
        console.log(result);
        console.log(target);
        console.log(typeof target);
        
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

           $("#testmonials .slider-gallery").html(content);
           slider("#testmonials .slider-gallery");
        }
      

    },
    error: function (result) {
        alert('error');
    }
})



$(function(){
    
 if(loginedType == "user"){
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
                    <a id="LogOut" class ="dropdown-item" href="#"><i class ="fas fa-sign-out-alt"></i>Logout</a>
                </div>
            </li>
        </ul>
        <!-- <a href="../login/login.html" class="login-btn">
            <img src="../../assets/img/client/user.png"  alt="" srcset="">
        
        </a> -->
    </div>
</div>
    `)
}


})





