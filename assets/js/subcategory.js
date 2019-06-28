let categoryArr, categoryArrFiltered = [], wrapper = "";
let target  = window.location.href.slice(window.location.href.lastIndexOf("?") +1);         
console.log(target);
$.get("http://88.80.184.99/tasker/web/api/sub/category", function(data, status){
     let d = data;
     categoryArr = d.data;
     for( let item of categoryArr ){
        if( item.main_id == target ){
            categoryArrFiltered.push(item)
        }        
     }
     for(let item of categoryArrFiltered){
        wrapper += `
        <div class="col-md-4 col-sm-6">
            <div class="item">
                <div class="img-holder">
                    <img src="${'http://88.80.184.99/tasker/web/'+item.image}" class="img-fluid" alt="">
                </div>
                <div class="info">
                    <h4>${item.name_en}</h4>
                </div>
            </div>
        </div>
        
     `
     }
 
     $("#sub-services .row").html(wrapper);
     
 });