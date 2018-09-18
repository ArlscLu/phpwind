// JavaScript Document

$(document).ready(function(e) {
    $(".navbar-toggle").click(function(){
		$(".menu").slideToggle();
	});
});

$(document).ready(function () {
	if ($(window).width() > 640) {
		$(function () {
			var height_attr = $('.profile-detail').height();
				height_attr = parseInt(height_attr + 40) + 'px';
			$('.profile-left').css('min-height', height_attr);

		});
	}
		
});