
$(document).ready(function(){
	
	// Next animation in the Intro section
	$('.section-intro__subtitle').hover(function(){ // задаем функцию при наведении курсора на элемент	
		$('.hover-intro__text:eq(0)').fadeIn(1500, function(){
			$(this).next().fadeIn(500, arguments.callee);
		});

	}, function(){ // задаем функцию, которая срабатывает, когда указатель выходит из элемента 	
		$('.hover-intro__text:eq(0)').fadeOut(1500, function(){
			$(this).next().fadeOut(500, arguments.callee);
		});
		
	});

	// Section scroll
	$.scrollify({
		section : ".section",
		scrollbars:true,
		overflowScroll: true,
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

	// Btn in the About section
	$('.skills-btn').on('click', function(){
		$('.interests-btn').removeClass('active')
		$(this).toggleClass('active');
		$('.section-about__interests').slideUp();
		$('.section-about__skills').slideToggle();
		$('.section-about__skills').toggleClass('active');
		if ($('.section-about__skills').hasClass('active')){
			$('.section-about__interests').removeClass('active');
			$('.section-about .section__column:first-child').addClass('active');
			console.log('visible')            
		} else {
			$('.section-about .section__column:first-child').toggleClass('active');  
			console.log('hidden')  ;
		}
		
	});

	$('.interests-btn').on('click', function(){
		$('.skills-btn').removeClass('active')
		$(this).toggleClass('active');
		$('.section-about__skills').slideUp();
		$('.section-about__interests').slideToggle();
		$('.section-about__interests').toggleClass('active');
		if ($('.section-about__interests').hasClass('active')){
			$('.section-about__skills').removeClass('active');
			$('.section-about .section__column:first-child').addClass('active');
			console.log('visible')            
		} else {
			$('.section-about .section__column:first-child').toggleClass('active');  
			console.log('hidden')  ;
		}
	});

	// Portfolio filter
	let filter = $("[data-filter]");
    $(".nav-portfolio__link[data-filter='all']").addClass('active')
    filter.on('click', function(event){
        event.preventDefault();
        
        let cat = $(this).data('filter');
        console.log(cat)
        if (cat =='all') {
			$(".nav-portfolio__link").removeClass('active');
			$(".nav-portfolio__link[data-filter='all']").addClass('active');
            $("[data-cat]").removeClass('hide');
        } else {
            $("[data-cat]").each(function(){
            
				let itemCat = $(this).data('cat');
				
				if(itemCat != cat){
					$(".nav-portfolio__link").removeClass('active');
					$(".nav-portfolio__link[data-filter='" + cat + "']").addClass('active');
					$(this).addClass('hide');
				} else{
					$(this).removeClass('hide');
				}
				
			}); 
        }
         
	});
	
	// quantity of filter items
	var categories = {},
    	category;
	$('.gallery-portfolio__item[data-cat]').each(function(i, el){
		category = $(el).data('cat');
		if (categories.hasOwnProperty(category)) {
			categories[category] += 1;
		}
		else {
			categories[category] = 1;
		}
	});

	// print results
	let allCount = $('.gallery-portfolio__item').length;
	$(".nav-portfolio__link[data-filter='all']").find('span').text(`(${allCount})`);
	for(var key in categories){
		$(".nav-portfolio__link[data-filter='" + key +"'] span").text(`(${categories[key]})`);
	}
});