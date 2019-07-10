$(function(){
    let target  = Number(window.location.href.slice(window.location.href.lastIndexOf("?") +1));         
    let targetOffer;

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
                 <div class="accept mt-5 d-flex justify-content-end">
                     <a href="" class="main-btn px-5 py-2">Accept Offer</a>
                 </div>
             </div>
 
         </div>
     </div>
    
    `)
   },1200)

});