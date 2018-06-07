// JavaScript Document

// Coursel Home Page
$(document).ready(function() {
	
	
	
	
    $("#home_coursel").owlCarousel({
        autoPlay : true,
        items:1,
        margin:10,
        stopOnHover : false,
        navigation:false,
        paginationSpeed:1000,
        goToFirstSpeed:2000,
        singleItem:true,
        autoHeight:true,
        touchDrag: true,
        mouseDrag: true
    });
     $("#home_coursel-1").owlCarousel({
        autoPlay : true,
        items:1,
        margin:10,
        stopOnHover : false,
        navigation:false,
        paginationSpeed:1000,
        goToFirstSpeed:2000,
        singleItem:true,
        autoHeight:true,
        touchDrag: true,
        mouseDrag: true
    });
    

	 
	
	
	
});
	

// QR Code Footer
$(document).ready(function() {
    $( ".qr_button" ).click(function() {
        $( ".qr_code" ).slideToggle( "slow", function() {
            });
    });
});


// Store Locations Page
$(document).ready(function(){
    $(".location").click(function(){
        $(".store_search_result").show(0);
    });
});




$(document).ready(function() {
    $("#related_products").owlCarousel({
        autoPlay : true,
        items:4,
        margin:10,
        stopOnHover : true,
        navigation:true,
        pagination:false,
        paginationSpeed:1000,
        goToFirstSpeed:2000,
        singleItem:false,
        autoHeight:true,
        touchDrag: true,
        mouseDrag: true,
        navigationText: ["<img src='../../../images/left-arrow.png'>","<img src='../../../images/right-arrow.png'>"],
    });
});

			