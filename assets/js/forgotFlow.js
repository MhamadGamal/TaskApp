function back(){
    $("#changedContainer").html(`
        <ul class="steps d-flex justify-content-between">
            <li> <span class="active">1</span> Step 1 </li>
            <li> <span class="">2</span> Step 2 </li>
            <li> <span class="">3</span> Step 3 </li>
            </ul>
            <form action="" autocomplete="off">
            <label for="" class="control-label">Email Address</label>
            <input type="email" class="form-control" id="email" placeholder="example@email.com">
            </form>
            <div class="d-flex justify-content-end my-3">
            <a href="#" id="f-step" class="btn main-btn px-5">Next</a>
        </div>
    `)
    return false;
}    

$(function(){

    

    $(".forgot").on("click","#f-step", function(e){
        e.preventDefault();

        $("#changedContainer").html(`
            <ul class="steps d-flex justify-content-between">
                <li> <span class="done"><i class="fas fa-check    "></i></span> Step 1 </li>
                <li> <span class="active">2</span> Step 2 </li>
                <li> <span class="">3</span> Step 3 </li>
            </ul>
            <form action="" autocomplete="off">
                <label for="" class="control-label">Your Password</label>
                <input type="password" class="form-control" id="password" placeholder="******">
            </form>
            <div class="d-flex justify-content-end my-3">
                <a href="#" class="main-color pt-1 d-inline-block mx-3" onclick="back()">Back</a>
                <a href="#" id="s-step" class="btn main-btn px-5">Next</a>
            </div>
        `)
    });
    $(".forgot").on("click","#s-step", function(e){
        e.preventDefault();

        $("#changedContainer").html(`
            <ul class="steps d-flex justify-content-between">
                <li> <span class="done"><i class="fas fa-check    "></i></span> Step 1 </li>
                <li> <span class="done"><i class="fas fa-check    "></i></span> Step 2 </li>
                <li> <span class="active">3</span> Step 3 </li>
            </ul>
            <form action="" autocomplete="off">
                <label for="" class="control-label">Confirm Password</label>
                <input type="password" class="form-control" id="conPassword" placeholder="******">
            </form>
            <div class="d-flex justify-content-end my-3">
                <a href="#" id="th-step" class="btn main-btn px-5">Save Password</a>
            </div>
        `)
    });

    
});//ready