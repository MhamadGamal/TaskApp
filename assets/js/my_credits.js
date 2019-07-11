$(function(){
    var currentuserdata = JSON.parse(localStorage.getItem('CurrentUserData'));
    var supplierid = currentuserdata.id;
$.ajax({
    url: "http://88.80.184.99/tasker/web/api/points/histories/suppliers",
    method: 'POST',
    dataType: "json",
    data: {
        "supplier": supplierid
    },
    success: function (result) {
        if (result.error.status == true) {
            var message = result.error.message;
            alert(message);
        }
        else {
            console.log(result.data);
            let data = result.data;
            let wrapper = "", img = "", catName = "test";
            for(let item of data){
                if(item.task){
                    catName = getCategory(Number(item.task.category)).name_en;
                    if (item.task.images[0]) {
                        img = `${'http://88.80.184.99/tasker/web/' + item.task.images[0]}`;
                    } else {
                        img = "https://via.placeholder.com/150";
                    }
                }else if(item.offer){
                    catName = getCategory(Number(item.offer.category)).name_en;
                    if (item.offer.images[0]) {
                        img = `${'http://88.80.184.99/tasker/web/' + item.offer.images[0]}`;
                    } else {
                        img = "https://via.placeholder.com/150";
                    }
                }                

                
                wrapper += `
                <li>
                    <div class="d-flex">
                        <div class="client-img-block">
                            <img class="img-service" src="${img}" alt="">
                        </div>
                        <div class="booking-details">
                            <div class="details-head">
                                <div class="details">
                                    <div>
                                        <h5 class="bold-font">${catName}</h5> <span></span>
                                    </div>
                                </div>
                                <div>
                                    <span class="price">$${item.point}</span>
                                </div>
                            </div>
                            <div class="payement-method text-right">
                                <div class="payement">
                                    <span>Payment method: </span>
                                    <span>Credit</span>
                                </div>
                                <div class="date">
                                    <span>${item.created}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                `
            }
            $("#credit .pending-bookings-list").html(wrapper)
        }
    },
    error: function (result) {
        alert('error');
    }
});
});