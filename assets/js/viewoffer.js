$(function(){
    let target  = Number(window.location.href.slice(window.location.href.lastIndexOf("?") +1));         
    let targetOffer;
    let userData = JSON.parse(localStorage.getItem("CurrentUserData"))
   setTimeout(function(){
    for( let offer of offersArr ){
        if(offer.id == target){
            targetOffer = offer;
            break;
        }
    }
    console.log(target,targetOffer)
   }, 1000)
   setTimeout(function(){
    //console.log()
    let polits = "", imgs = "", rate="";
    for(let image= 0 ; image <  targetOffer.image.length; image ++){
        if(image == 0){
            polits += `<li data-target="#carouselExampleIndicators" data-slide-to="${image}"
            class="active">
            <img class="d-block" src="${'http://88.80.184.99/tasker/web/'+targetOffer.image[image]}">
        </li>`;
        imgs += `
        <div class="carousel-item active">
            <img class="d-block w-100"
                src="${'http://88.80.184.99/tasker/web/'+targetOffer.image[image]}">
        </div>
        `
        }else{
            polits += `<li data-target="#carouselExampleIndicators" data-slide-to="${image}"
            class="">
            <img class="d-block" src="${'http://88.80.184.99/tasker/web/'+targetOffer.image[image]}">
        </li>`;
        imgs += `
        <div class="carousel-item">
            <img class="d-block w-100"
                src="${'http://88.80.184.99/tasker/web/'+targetOffer.image[image]}">
        </div>
        `
        }

    }

    for(let i=1; i <=  targetOffer.supplier.rate; i++){
        rate += `
        <span class="fa fa-star checked"></span>
        `
    }


    $("#HotOffers-details .tab-pane").html(`

    <div class="row">
         <div class="col-md-4">
         
             <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                 <ol class="carousel-indicators">
                    ${polits}     
                </ol>
                 <div class="carousel-inner">
                     ${imgs}
                 </div>
             </div>
         </div>
         <div class="col-md-8">
             <div class="moving-tasks">
                 <div class="agency-tasks">
                     <div class="moving-agency">
                         <div>
                             <div class="d-flex agency">
                                 <img src="${'http://88.80.184.99/tasker/web/'+getCategory(Number(targetOffer.category)).image}" alt=""
                                     srcset="">
                                 <a href="#" class="bold">${getCategory(Number(targetOffer.category)).name_en}</a>
                             </div>
                             <div class="rating main-color mb-3">
                                 ${rate}
                                 <span>${targetOffer.supplier.rate}</span>
                             </div>
                         </div>
                         <div class="tasks-numbers main-color mb-3">
                             <i class="fas fa-business-time"></i>
                             <span>72 Moving Tasks</span>
                             </i>
                         </div>
                     </div>
 
                 </div>
                 <div>
                     <p class="mb-4">
                        ${targetOffer.description}
                     </p>
                 </div>
 
                 <div class="starEndDate d-flex">
                     <div>
                         <i class="fas fa-calendar-alt main-color"></i>
                         <span>${targetOffer.start_date} </span>
                     </div>
                     <span class="mx-3">TO</span>
                     <div>
                         <i class="fas fa-calendar-alt main-color"></i>
                         <span>${targetOffer.end_date} </span>
                     </div>
                 
                 </div>
                 <div>
                    <div class="form-group row nogutters mt-3">
                        <div class="col-sm-2">Select Date </div>
                        <div class="col-sm-8">
                            <input type="text" class="datepicker form-control"  data-select="datepicker" date-format="DD-MM-YYYY">
                        </div>

                    </div>
                 </div>
                 <div class="accept mt-5 d-flex justify-content-end">
                     <a href="#" id="AcceptOffer" class="main-btn px-5 py-2">Accept Offer</a>
                 </div>
             </div>
 
         </div>
     </div>
    
    `);
    $("body").append('<script src="../../assets/js/jquery.datepicker2.min.js"></script>');
    // $.datePicker.defaults.dateFormat =  function(date) {
    //     return  date.getDate() + '-' +(date.getMonth() + 1)  + '-' + date.getFullYear();
    //   }
   },1200)





   $("#HotOffers-details").on("click", "#AcceptOffer", function(){
       debugger;
    let selectedData = $(".datepicker").val();
    let selectedDate = new Date(selectedData);
    let start =  targetOffer.start_date;
    let startArr = start.split("-");
    let startData = new Date(`${startArr[1]}-${startArr[0]}-${startArr[2]}`);
    let end =  targetOffer.end_date;
    let endArr = end.split("-");
    let endData = new Date(`${endArr[1]}-${endArr[0]}-${endArr[2]}`);
    let selected_date;
    if(startData <= selectedDate && selectedDate <= endData){
            selected_date = selectedData;
            $("#alert").fadeOut();
            $(".datepicker").removeClass("error");
            $.ajax({
                url: "http://88.80.184.99/tasker/web/api/creates/tasks/hots/offers",
                method: 'POST',
                cache: false,
                async: false,
                timeout: 30000,
                dataType: "json",
                data: {
                    "offer": targetOffer.id,
                    "client": userData.id,
                    "selected_date": selected_date
                },
                success: function (result) {
                   console.log(result);
                   let data = result;
                   if(data.error.status == true){
                       $("#alert").html(data.error.message).fadeIn();
                       $('body, html').animate({
                           scrollTop: 0
                       }, 400)
                   }else if(data.error.status == false){
                       location.href = "pending.html"
                   }
                },
                error: function (result) {
                    alert('error');
                }
            });
        
    }else{
        if(!selectedData){
            $(".datepicker").addClass("error");
        }else{
            $(".datepicker").removeClass("error");
            $("#alert").html("please entered date between the end & the start date ").fadeIn();
            $('body, html').animate({
                scrollTop: 0
            }, 400);
        }
    }
   
   });








});