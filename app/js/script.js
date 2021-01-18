
$(document).ready(function(){
		
	$('.section-intro__subtitle').hover(function(){ // задаем функцию при наведении курсора на элемент	
		$('.hover-intro__text:eq(0)').fadeIn(1500, function(){
			$(this).next().fadeIn(500, arguments.callee);
		});

	}, function(){ // задаем функцию, которая срабатывает, когда указатель выходит из элемента 	
		$('.hover-intro__text:eq(0)').fadeOut(1500, function(){
			$(this).next().fadeOut(500, arguments.callee);
		});
		
	});

	$.scrollify({
		section : ".section",
		scrollbars:false,
		before:function(i, section) {
	
		  var ref = section[i].attr("data-section-name");
	
		  $(".nav-header__link.active").removeClass("active");
	
		  $(".nav-header__item").find("a[href=\"#" + ref + "\"]").addClass("active");
		},
		afterRender:function() {
		  var pagination = "<ul class=\"nav-header__list\">";
		  var activeClass = "";
		  $(".section").each(function(i) {
			activeClass = "";
			if(i===$.scrollify.currentIndex()) {
			  activeClass = "active";
			}
			pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
		  });
	
		  $(".nav-header__item a").on("click",$.scrollify.move);
		}
	  });
});