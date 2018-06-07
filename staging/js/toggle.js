// JavaScript Document
// start js for  tab 
$(document).ready(function(){
	$(".leftpantab ul").next("div").show();		
	$(".leftpantab").find('li a').first().addClass('active');
	$(".leftpantab").find("li").click(function(){
		if ($(this).find('a').hasClass('active')==false)
		{
			$(".leftpantab").find("li").find("a").removeClass('active');
			$(this).find("a").addClass('active');
		}
		$(".leftpantab").find("li").each(function(){
			var id=$(this).attr("class");
			$("#"+ id).hide();
		});
		$("#"+ $(this).attr("class")).show();
		
	});	
});	
	
	
	





