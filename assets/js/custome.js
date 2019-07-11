$( document ).ready(function() {
    $('.rating span').on('click', function(){
        $('.rating  span').removeClass('active');
        $(this).addClass('active');
        $(this).nextAll('span').addClass('active');
       
    })

$('.clientReviews').simpleLoadMore({
  item:'div',
  count: 6,
  btnHTML:'<div class="text-right semiItalicbold "><a href="#" class="load-more__btn">see more</a></div>'
});
});