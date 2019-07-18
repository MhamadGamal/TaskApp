$( document ).ready(function() {
  // rating
    $('.rating span').on('click', function(){
        $('.rating  span').removeClass('active');
        $(this).addClass('active');
        $(this).nextAll('span').addClass('active');
       
    })

    // load more
$('.clientReviews').simpleLoadMore({
  item:'div',
  count: 6,
  btnHTML:'<div class="text-right semiItalicbold "><a href="#" class="load-more__btn">see more</a></div>'
});

});