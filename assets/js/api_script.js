 //get main category
 $.get("http://88.80.184.99/tasker/web/api/main/catgeory", function(data, status){
   
  let d = data;
  
  let categoryArr = d.data, wrapper = "";
  for( let item of categoryArr ){
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

  $("#services .slider-wrapper .content .slider-gallery").html(wrapper);
  $(".slider-gallery").slick({
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    accessibility: false,
    slidesToScroll: 1,
    // prevArrow: $('.slider-gallery .prev'),
    // nextArrow: $('.slider-gallery .next'),
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
    let randServie = Math.floor(Math.random()* categoryArr.length);
    console.log(randServie);
    $("#services .single-service .img-holder img").attr("src", "http://88.80.184.99/tasker/web/"+categoryArr[randServie].image)
    $("#services .single-service .service-info h4").text(categoryArr[randServie].name_en)
    $("#services .single-service .service-info a").text(`Check ${categoryArr[randServie].name_en} Services`)
    $("#services .single-service .service-info a").attr("href", `pages/home/subcategory.html?${categoryArr[randServie].id}`)

});