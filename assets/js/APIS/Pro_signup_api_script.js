



 

$(function(){





     //get main category
 let categoryArr, wrapper = "";        
 $.get("http://88.80.184.99/tasker/web/api/sub/category", function(data, status){
     let d = data;
     categoryArr = d.data;
     for( let item of categoryArr ){
     wrapper += `
         <div class="custom-control custom-checkbox">
             <input type="checkbox" class="custom-control-input" value="${item.name_en}" data-id="${item.id}"  id="${item.name_en}">
             <label class="custom-control-label" for="${item.name_en}">${item.name_en} </label>
         </div>
     `
     }
 
     
 });
    // provider can do popup
    $("#providersServices").on("click", function(){
        $("#providersCategories").modal("show").find(".modal-body").html(wrapper)
    })
    
    // provider can do selection
    $("#providersCategories #Select").on("click", function(e){
        e.preventDefault();
        let divContent = "";

        let checkbox = document.querySelectorAll("#providersCategories input[type='checkbox']");
        for(let checkitem of checkbox){
            if(checkitem.checked == true ){
                
                divContent += `${checkitem.getAttribute('data-id')},`
            }
        }
        $("#providersServices").html(divContent).removeClass("error");
        $("#providersCategories").modal("hide")



    })


   
 });
 
 