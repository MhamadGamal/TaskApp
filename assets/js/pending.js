$(function(){
    $.ajax({
        url: "http://88.80.184.99/tasker/web/api/pendings/tasks/users",
        method: 'POST',
        cache: false,
        async: false,
        timeout: 30000,
        dataType: "json",
        data: {"client": loginnedUserData.id},
        success: function (result) {
            console.log(result)
           let data = result;
           if(data.error.status == true){
               alert(data.error.message);
               
           }else if(data.error.status == false){
               let data = result.data;
               let wrapper = "", img="";
               setTimeout(function(){
                for(let item of data){
                    if (item.image) {
                        img = `${'http://88.80.184.99/tasker/web/' + item.image}`;
                    } else {
                        img = "https://via.placeholder.com/150";
                    }
                       wrapper += `
                    <li>
                       <div class="row">
                           <div class="col-sm-3">
                               <div class="pending-img">
                               <img class="img-service" src="${img}" alt="" />
                               </div>
                           </div>
                           <div class="col-sm-9">
                               <div class="booking-details">
                                   <div class="details-head">
                                       <div>
                                           <a href="pendingDetails.html?${item.id}" class="service-name bold-font">${getCategory(Number(item.category)).name_en}</a> <span></span>
                                       </div>
                                       <p>${item.description} </p>
                                   </div>
                                   <div class="messges-offers">
                                       <div class="offers">
                                           <i class="fas fa-users"></i>
                                           <span>Providers Offers</span>
                                              <a href="#" class="offer-num">${item.offers_count}</a>
                                       </div>
                                       <div class="offers">
                                           <i class="fas fa-comments"></i>
                                           <span>Messages empty</span>
                                             <a href="#" class="offer-num"> 0</a>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </li>
                  
                       `;
                   }
                   $("#pending-offers .pending-bookings-list").html(wrapper);
               }, 500);
           }
        },
        error: function (result) {
            alert('error');
        }
    });
  
});

