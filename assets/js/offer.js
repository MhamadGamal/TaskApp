let type = localStorage.getItem("CurrentUserType");
let offersArr = [], offers = "", targetMainCa = ""; 
let wrapper = "", imgs = "";


setTimeout(function(){

    
if(type  == "user"){
    
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/list/hot/offer",
        method: 'GET',
        cache: false,
        dataType: "json",
        success: function (result) {
            offersArr = result.data;
            
            // prepairing offers
            for(let offer of offersArr){
                let categName = "";
                if(getCategory(Number(offer.category))){
                    categName = getCategory(Number(offer.category)).name_en;
                }else{
                    categName = "not exist";
                }
                
                
                if(offer.image.length > 1){
                    imgs = "";
                    for(let img of offer.image){
                        imgs += `
                            <div class="wrap">
                            <img src="http://88.80.184.99/tasker/web/${img}" alt="${img}">
                            </div>
                        `
                    }
                    
                    wrapper += `
                    <div class="col-md-4 col-sm-6">
                            <div class="offer-item">
                                <div class="img-holder offres-slider">
                                    ${imgs}
                                </div>
                                <div class="offer-info">
                                    <h5 class="main-color">${categName}</h5>
                                    <p class="main-color m-0">${offer.supplier.name} </p>
                                    <p class="m-0">
                                        ${offer.description}

                                    </p>
                                    <div class="dates">
                                        <span class="main-color"> <i class="fas fa-calendar-alt    "></i> ${offer.start_date} </span>
                                        TO
                                        <span class="main-color"> <i class="fas fa-calendar-alt    "></i> ${offer.end_date} </span>
                                    </div>
                                    <a href="viewoffer.html?${offer.id}" class="btn main-btn">Check Offer</a>
                                </div>
                            </div>
                    </div>
                    `;
                    
                }else{
                    wrapper += `
                    <div class="col-md-4 col-sm-6">
                        <div class="offer-item">
                            <div class="img-holder">
                                <img src="http://88.80.184.99/tasker/web/${offer.image[0]}" alt="">
                            </div>
                            <div class="offer-info">
                                <h5 class="main-color">${categName}</h5>
                                <p class="main-color m-0">${offer.supplier.name} </p>
                                <p class="m-0">
                                    ${offer.description}
    
                                </p>
                                <div class="dates">
                                    <span class="main-color"> <i class="fas fa-calendar-alt    "></i> ${offer.start_date} </span>
                                    TO
                                    <span class="main-color"> <i class="fas fa-calendar-alt    "></i> ${offer.end_date} </span>
                                </div>
                                <a href="viewoffer.html?${offer.id}" class="btn main-btn">Check Offer</a>
                            </div>
                        </div>
                </div>
                
                    `
                }
                
                offers = wrapper
            }

            $(".offers-list .row").html(offers)


            $(".offres-slider").slick({
                prevArrow: null,
                nextArrow: null,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
            })

        },
        error: function (result) {
            alert('error');
        }
    });
 
}

}, 500);
