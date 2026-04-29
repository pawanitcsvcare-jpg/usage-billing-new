(function($) {
	
	"use strict";
	
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.usage-billing-preloader').length){
			$('.usage-billing-preloader').delay(200).fadeOut(500);
		}
	}
	
	
	
	//Update Header Style and Scroll to Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-to-top');
			/* Use bar height — .main-header.height() is often 0 with absolute children, which kept fixed-header on at scroll 0 */
			var bar = siteHeader.find('.header-lower').first();
			var headerTrigger = Math.max(bar.outerHeight(true) || 0, siteHeader.outerHeight(true) || 0, 1);
			if (windowpos > headerTrigger) {
				siteHeader.addClass('fixed-header');
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-header');
				scrollLink.fadeOut(300);
			}
			
		}
	}
	
	headerStyle();
	
	
	
	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown ul').length){
		$('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');
		
		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('ul').slideToggle(500);
		});
		
		//Dropdown Menu / Fullscreen Nav
		$('.fullscreen-menu .navigation li.dropdown > a').on('click', function() {
			$(this).next('ul').slideToggle(500);
		});
		
		//Disable dropdown parent link
		$('.navigation li.dropdown > a').on('click', function(e) {
			e.preventDefault();
		});
		
		//Disable dropdown parent link
		$('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
			e.preventDefault();
		});
		
		$('.contact-dropdown .dropdown-menu').click(function(e) {
			e.stopPropagation();
		});
		
		$('.select-categories').on('click', function(e){
			//hiddenBar.removeClass('visible-sidebar');
			$('body').toggleClass('category-open');
		})
		
		
		// Dropdown Price
		//$('.price-block .features .arrow').on('click', function() {
			//$('body').toggleClass('price-filter');
			//$(this).prev('.price-filter').toggleClass(500);
		//});

		
	}
	if ($("input.product-count").length) {
        $("input.product-count").TouchSpin({
            min: 1,
            max: 1000,
            step: 1,
            buttondown_class: "btn btn-link",
            buttonup_class: "btn btn-link",
        });
    }  
	
	// Add Current Class Auto
	function dynamicCurrentMenuClass(selector) {
		let FileName = window.location.href.split("/").reverse()[0];

		selector.find("li").each(function () {
			let anchor = $(this).find("a");
			if ($(anchor).attr("href") == FileName) {
				$(this).addClass("current");
			}
		});
		// if any li has .current elmnt add class
		selector.children("li").each(function () {
			if ($(this).find(".current").length) {
				$(this).addClass("current");
			}
		});
		// if no file name return
		if ("" == FileName) {
			selector.find("li").eq(0).addClass("current");
		}
	}
	
	if ($('.main-header .header-lower .main-menu .navigation').length) {
		dynamicCurrentMenuClass($('.main-header .header-lower .main-menu .navigation'));
	}
	
	
	//Header Search
	if($('.search-box-outer').length) {
		$('.search-box-outer').on('click', function() {
			$('body').addClass('search-active');
		});
		$('.close-search').on('click', function() {
			$('body').removeClass('search-active');
		});
		
		$('.search-popup .color-layer').on('click', function() {
			$('body').removeClass('search-active');
		});
	}
	
	
	
	
	
	
	
	//Mobile Nav Hide Show
	if($('.mobile-menu').length){
		
		$('.mobile-menu .menu-box').mCustomScrollbar();
		
		var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);
		
		//Hide / Show Submenu
		$('.mobile-menu .navigation > li.dropdown > .dropdown-btn').on('click', function(e) {
			e.preventDefault();
			var target = $(this).parent('li').children('ul');
			
			if ($(target).is(':visible')){
				$(this).parent('li').removeClass('open');
				$(target).slideUp(500);
				$(this).parents('.navigation').children('li.dropdown').removeClass('open');
				$(this).parents('.navigation').children('li.dropdown > ul').slideUp(500);
				return false;
			}else{
				$(this).parents('.navigation').children('li.dropdown').removeClass('open');
				$(this).parents('.navigation').children('li.dropdown').children('ul').slideUp(500);
				$(this).parent('li').toggleClass('open');
				$(this).parent('li').children('ul').slideToggle(500);
			}
		});

		//3rd Level Nav
		$('.mobile-menu .navigation > li.dropdown > ul  > li.dropdown > .dropdown-btn').on('click', function(e) {
			e.preventDefault();
			var targetInner = $(this).parent('li').children('ul');
			
			if ($(targetInner).is(':visible')){
				$(this).parent('li').removeClass('open');
				$(targetInner).slideUp(500);
				$(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
				$(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
				return false;
			}else{
				$(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
				$(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
				$(this).parent('li').toggleClass('open');
				$(this).parent('li').children('ul').slideToggle(500);
			}
		});

		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function() {
			$('body').addClass('mobile-menu-visible');

		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
			$('body').removeClass('mobile-menu-visible');
			$('.mobile-menu .navigation > li').removeClass('open');
			$('.mobile-menu .navigation li ul').slideUp(0);
		});

		$(document).keydown(function(e){
	        if(e.keyCode == 27) {
				$('body').removeClass('mobile-menu-visible');
			$('.mobile-menu .navigation > li').removeClass('open');
			$('.mobile-menu .navigation li ul').slideUp(0);
        	}
	    });
		
	}
	
	
	
	//Tabs Box
	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var targetFind = $($(this).attr('data-tab'));
			var target = $(this).parents('.tabs-box').find(targetFind);
			
			if ($(this).parents('.tabs-box').find(target).is(':visible')){
				return false;
			}else{
				$(this).parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
				$(target).fadeIn(300);
				$(target).addClass('active-tab');
			}
		});
	}
	
	
	
	
	//Hidden Sidebar
	if ($('.hidden-bar,.fullscreen-menu').length) {
		var hiddenBar = $('.hidden-bar');
		var hiddenBarOpener = $('.nav-toggler');
		var hiddenBarCloser = $('.hidden-bar-closer,.close-menu');
		$('.hidden-bar-wrapper').mCustomScrollbar();
		
		//Show Sidebar
		hiddenBarOpener.on('click', function () {
			$('body').addClass('visible-menu-bar');
			hiddenBar.addClass('visible-sidebar');
		});
		
		//Hide Sidebar
		hiddenBarCloser.on('click', function () {
			$('body').removeClass('visible-menu-bar');
			hiddenBar.removeClass('visible-sidebar');
		});
	}
	
	
	
	//Gallery Filters
	if($('.filter-list').length){
		$('.filter-list').mixItUp({});
	}
	
	
	
	
	//Parallax Scene for Icons
	if($('.parallax-scene-1').length){
		var scene = $('.parallax-scene-1').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-2').length){
		var scene = $('.parallax-scene-2').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-3').length){
		var scene = $('.parallax-scene-3').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	if($('.parallax-scene-4').length){
		var scene = $('.parallax-scene-4').get(0);
		var parallaxInstance = new Parallax(scene);
	}
	
	
	
	if($('.paroller').length){
		$('.paroller').paroller({
			  factor: 0.2,            // multiplier for scrolling speed and offset, +- values for direction control  
			  factorLg: 0.4,          // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control  
			  type: 'foreground',     // background, foreground  
			  direction: 'horizontal' // vertical, horizontal  
		});
	}
	
	
	
	
	// Single Item Carousel (skipped when hero is static HTML without .single-item-carousel)
	function sliderHeroTwoActive($scope, $) {
		var $carousel = $scope.find('.single-item-carousel');
		if (!$carousel.length) {
			return;
		}
		$carousel.owlCarousel({
			//animateOut: 'fadeOut',
    		//animateIn: 'fadeIn',
			loop:true,
			margin:0,
			nav:false,
			smartSpeed: 500,
			autoplay: false,
			navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1024:{
					items:1
				},
				1200:{
					items:1
				}
			}
		});
	}
	
	
	
	
	// Testimonial Carousel
	function testimonialActiveTwo($scope, $) {
		$('.testimonial-carousel').owlCarousel({
			//animateOut: 'fadeOut',
    		//animateIn: 'fadeIn',
			loop:true,
			margin:0,
			nav:true,
			//autoHeight: true,
			smartSpeed: 500,
			autoplay: 6000,
			navText: [ '<span class="flaticon-left"></span>', '<span class="flaticon-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:1
				},
				1024:{
					items:1
				},
				1200:{
					items:1
				}
			}
		});
	}
	
	
	
	
	// Two Item Carousel
	function testimonialActive($scope, $) {
		$('.two-item-carousel').owlCarousel({
			//animateOut: 'fadeOut',
    		//animateIn: 'fadeIn',
			loop:true,
			margin:30,
			nav:true,
			//autoHeight: true,
			smartSpeed: 500,
			autoplay: 6000,
			navText: [ '<span class="flaticon-left"></span>', '<span class="flaticon-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:2
				},
				1024:{
					items:2
				},
				1200:{
					items:2
				}
			}
		});
	}
	
	
	
	
	//Accordion Box
	if($('.accordion-box').length){
		$(".accordion-box").on('click', '.acc-btn', function() {
			
			var outerBox = $(this).parents('.accordion-box');
			var target = $(this).parents('.accordion');
			
			if($(this).hasClass('active')!==true){
				$(outerBox).find('.accordion .acc-btn').removeClass('active');
			}
			
			if ($(this).next('.acc-content').is(':visible')){
				return false;
			}else{
				$(this).addClass('active');
				$(outerBox).children('.accordion').removeClass('active-block');
				$(outerBox).find('.accordion').children('.acc-content').slideUp(300);
				target.addClass('active-block');
				$(this).next('.acc-content').slideDown(300);	
			}
		});	
	}
	
	
	
	
	// Sponsors Carousel
	function sponsorActive($scope, $) {
		$('.sponsors-carousel').owlCarousel({
			loop:true,
			margin:30,
			nav:true,
			smartSpeed: 500,
			autoplay: 4000,
			navText: [ '<span class="flaticon-left-arrow"></span>', '<span class="flaticon-right-arrow"></span>' ],
			responsive:{
				0:{
					items:2
				},
				480:{
					items:3
				},
				600:{
					items:3
				},
				800:{
					items:5
				},
				1024:{
					items:5
				}
			}
		});    		
	}

	//Packages Carousel
	if ($('.packages-carousel-box').length) {
		var slider = new Swiper ('.gallery-slider', {
		slidesPerView: 1,
		centeredSlides: false,
		loop: true,
		spaceBetween: 50,
		effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
		loopedSlides: 5, //スライドの枚数と同じ値を指定
		navigation: {
		//nextEl: '.swiper-button-next',
		//prevEl: '.swiper-button-prev',
		},
		autoplay: false
		});

		var thumbs = new Swiper ('.gallery-thumbs', {
		slidesPerView: 'auto',
		spaceBetween: 0,
		centeredSlides: true,
		loop: true,
		slideToClickedSlide: true,
		autoplay: false,
		// Responsive breakpoints
	  breakpoints: {
	    // when window width is >= 480px
	    320: {
	      slidesPerView: 1,
	      centeredSlides: false
	    },
	    // when window width is >= 640px
	    600: {
	      slidesPerView: 2,
	      centeredSlides: false
	    },
	    // when window width is >= 640px
	    768: {
	      slidesPerView: 3,
	      centeredSlides: false
	    },
	    // when window width is >= 640px
	    992: {
	      slidesPerView: 4,
	      centeredSlides: false
	    },
	    // when window width is >= 640px
	    1200: {
	      slidesPerView: 5
	    }
	  }
		});

		//slider.params.control = thumbs;
		//thumbs.params.control = slider;

		slider.controller.control = thumbs;
		thumbs.controller.control = slider;
	}

	
	// LightBox Image
	if($('.lightbox-image').length) {
		$('.lightbox-image').magnificPopup({
		  type: 'image',
		  gallery:{
		    enabled:true
		  }
		});
	}
	

  
  
  /////////////////////////////////////////////////////
    // 32. Offcanvas Toggle
    $("#open_offcanvas").click(function () {
      // $('body').css('overflow', 'hidden');
      $('.offcanvas__area').css('transform', 'perspective(300px) rotateY(0deg)');
      $('.offcanvas__area').css('opacity', '1');
      $('.offcanvas__area').css('visibility', 'visible');
    });
    $("#close_offcanvas").click(function () {
      $('body').css('overflow', 'visible');
      $('.offcanvas__area').css('transform', 'perspective(300px) rotateY(18deg)');
      $('.offcanvas__area').css('opacity', '0');
      $('.offcanvas__area').css('visibility', 'hidden');
    });
    /////////////////////////////////////////////////////
	
	
	
	 // jQuery Codes
  jQuery(document).ready(function () {

    /////////////////////////////////////////////////////
    // 30. Side Navbar
    $('.side__navbar').meanmenu({
      meanScreenWidth: "5000",
      meanMenuContainer: '.side__navbar-wrapper',
      meanMenuCloseSize: '36px',
    });
	 });
  
    /////////////////////////////////////////////////////
	
	
	
	//LightBox Video
	if($('.lightbox-video').length) {
		$('.lightbox-video').magnificPopup({
	      // disableOn: 700,
	      type: 'iframe',
	      mainClass: 'mfp-fade',
	      removalDelay: 160,
	      preloader: false,
	      iframe:{
	        patterns:{
	          youtube:{
	          index: 'youtube.com',
	          id: 'v=',
	          src: 'https://www.youtube.com/embed/%id%'
	        },
	      },
	      srcAction:'iframe_src',
	    },
	      fixedContentPos: false
	    });
	}
	
	
	// Odometer
	if ($(".odometer").length) {
		$('.odometer').appear();
		$('.odometer').appear(function(){
			var odo = $(".odometer");
			odo.each(function() {
				var countNumber = $(this).attr("data-count");
				$(this).html(countNumber);
			});
			window.odometerOptions = {
				format: 'd',
			};
		});
	}
	
	
	//Custom Seclect Box
	// if($('.custom-select-box').length){
	// 	$('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
	// }
	
	
	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				phone: {
					required: true
				},
				services: {
					required: true
				},
				email: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}
	
	
	
	// Scroll to a Specific Div
	if($('.scroll-to-target').length){
		$(".scroll-to-target").on('click', function() {
			var target = $(this).attr('data-target');
		   // animate
		   $('html, body').animate({
			   scrollTop: $(target).offset().top
			 }, 1500);
	
		});
	}
	
	
	
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}

	function testimonialActiveThree($scope, $) {
		$('.three-item-carousel').owlCarousel({
			//animateOut: 'fadeOut',
    		//animateIn: 'fadeIn',
			loop:true,
			margin:30,
			nav:true,
			//autoHeight: true,
			smartSpeed: 500,
			autoplay: 6000,
			navText: [ '<span class="flaticon-left"></span>', '<span class="flaticon-right"></span>' ],
			responsive:{
				0:{
					items:1
				},
				600:{
					items:1
				},
				800:{
					items:2
				},
				1024:{
					items:2
				},
				1200:{
					items:3
				}
			}
		});
	}
	function domainSearchActive($scope, $) {
		var element = $scope.find('#usage-billing-domain-search');
		if (!element.length) {
			return;
		}

            /* Domain Check */
            var DomainCheck = {
                submit: function (e) {
                    e.preventDefault();
                    
                    var obj = e.data,
                        el = obj.wap.find("#usage-billing-domain-results"),
                        domainDefault = "",
                        basename = obj.input.val() !== "" ? obj.input.val() : domainDefault,
                        ext = obj.select.val() !== "" ? obj.select.val() : '',
                        whmcs_url = obj.whmcs_url.val() !== "" ? obj.whmcs_url.val() : '',
                        extension = DomainCheck.dotExt(obj.input.val());

                    var domainName = "";
                    if (basename.indexOf('.') > -1) {
                        domainName = basename;
                    } else if (basename.indexOf('.') == -1) {
                        domainName = basename + (ext ? '.' + ext : '.com');
                    }

                    obj.security = obj.form.find("input[name=security]").val();
                    obj.el = el;
                    var domainData = {},
                        domainResultTable = $(
                            '<div id="usage_billing_result_item" class="usage-billing-result-domain-box" role="alert"> </div>'
                        ),
                        domainResult = $(
                            '<div class="inner-block-result-item">' +
                            '<div class="spinner usage-billing-loading-results text-center">' +
                            '<i class="fal fa-spinner-third fa-spin fa-lg fa-fw"></i>' +
                            '<span> Seaching...</span>' +
                            '<span class="sr-only">...</span>' +
                            "</div>"
                        );

                    $.extend(domainData, obj);
                    domainData.domain = domainName;
                    domainData.extension = extension;
                    domainData.whmcs_url = whmcs_url;
                    domainData.el = domainResult;

                    domainResult.data("domain", domainData.domain);

                    if (obj.el.find("#usage_billing_result_item").length == 0) {
                        obj.el.append(domainResultTable);
                        obj.el.find("#usage_billing_result_item").append(domainResult);
                    } else {
                        obj.el.find("#usage_billing_result_item").remove();
                        obj.el.append(domainResultTable);
                        obj.el.find("#usage_billing_result_item").append(domainResult);
                    }

                    DomainCheck.checkAjax(domainData);
                },

                name: function (domain) {
                    return domain.replace(/^.*\/|\.[^.]*$/g, "");
                },

                dotExt: function (ext) {
                    var fExt,
                        tExt = ext.split(".", 3);

                    if (tExt[1] === undefined) {
                        fExt = "com";
                    } else if (tExt[0] === "www") {
                        fExt = tExt[2];
                    } else {
                        fExt = tExt[1];
                    }

                    return fExt;
                },

                checkAjax: function (obj) {
                    var data = {
                        domain: obj.domain,
                        whmcs_url: obj.whmcs_url,
                        action: "usage_billing_ajax_search_domain",
                        security: obj.security,
                    };

                    $.ajax({
                        url: usage_billing_ajax_url,
                        type: "POST",
                        dataType: "json",
                        data: data,
                        success: function (data) {
                            obj.el.find(".spinner").remove();
                            obj.el.append(data.results_html);
                            console.log(data);
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            console.log(xhr);
                            console.log(thrownError);
                        },
                    });
                },
            };

            element.is(function () {
                var id = $(this),
                    submitEl = id.find("#hostim-search-btn"),
                    inputEl = id.find("#usage-billing-domain-field"),
                    selectEl = id.find("#domainextension"),
                    formEl = id.find("#hos-main-hero-id"),
                    acEl = id.find('input[name="whmcs_url"]'),
                    data;

                data = {
                    submit: submitEl,
                    input: inputEl,
                    select: selectEl,
                    whmcs_url: acEl,
                    form: formEl,
                    div: id,
                    wap: id,
                };

                submitEl.attr("disabled", false);
                inputEl.keyup(function () {
                    if ($(this).val().length != 0) submitEl.attr("disabled", false);
                    else submitEl.attr("disabled", true);
                });

                submitEl.on("click", data, DomainCheck.submit);
            });

            // Disable Enter Key Domain Search Form
            document.addEventListener('keypress', function (e) {
                if (e.keyCode === 13 || e.which === 13) {
                    e.preventDefault();
                    return false;
                }
            });

	}
	/**
	 * Main Domain
	 * @param {*} $scope 
	 * @param {*} $ 
	 */
	function mainDomainSearchActive($scope, $) {
		var element = $scope.find('#usage-billing-domain-search');
		if (!element.length) {
			return;
		}

            /* Domain Check */
            var DomainCheck = {
                submit: function (e) {
                    e.preventDefault();
                    
                    var obj = e.data,
                        el = obj.wap.find("#usage-billing-domain-results"),
                        domainDefault = "",
                        basename = obj.input.val() !== "" ? obj.input.val() : domainDefault,
                        ext = obj.select.val() !== "" ? obj.select.val() : '',
                        whmcs_url = obj.whmcs_url.val() !== "" ? obj.whmcs_url.val() : '',
                        extension = DomainCheck.dotExt(obj.input.val());

                    var domainName = "";
                    if (basename.indexOf('.') > -1) {
                        domainName = basename;
                    } else if (basename.indexOf('.') == -1) {
                        domainName = basename + (ext ? '.' + ext : '.com');
                    }

                    obj.security = obj.form.find("input[name=security]").val();
                    obj.el = el;
                    var domainData = {},
                        domainResultTable = $(
                            '<div id="usage_billing_result_item" class="usage-billing-result-domain-box" role="alert"> </div>'
                        ),
                        domainResult = $(
                            '<div class="inner-block-result-item">' +
                            '<div class="spinner usage-billing-loading-results text-center">' +
                            '<i class="fal fa-spinner-third fa-spin fa-lg fa-fw"></i>' +
                            '<span> Seaching...</span>' +
                            '<span class="sr-only">...</span>' +
                            "</div>"
                        );

                    $.extend(domainData, obj);
                    domainData.domain = domainName;
                    domainData.extension = extension;
                    domainData.whmcs_url = whmcs_url;
                    domainData.el = domainResult;

                    domainResult.data("domain", domainData.domain);

                    if (obj.el.find("#usage_billing_result_item").length == 0) {
                        obj.el.append(domainResultTable);
                        obj.el.find("#usage_billing_result_item").append(domainResult);
                    } else {
                        obj.el.find("#usage_billing_result_item").remove();
                        obj.el.append(domainResultTable);
                        obj.el.find("#usage_billing_result_item").append(domainResult);
                    }

                    DomainCheck.checkAjax(domainData);
                },

                name: function (domain) {
                    return domain.replace(/^.*\/|\.[^.]*$/g, "");
                },

                dotExt: function (ext) {
                    var fExt,
                        tExt = ext.split(".", 3);

                    if (tExt[1] === undefined) {
                        fExt = "com";
                    } else if (tExt[0] === "www") {
                        fExt = tExt[2];
                    } else {
                        fExt = tExt[1];
                    }

                    return fExt;
                },

                checkAjax: function (obj) {
                    var data = {
                        domain: obj.domain,
                        whmcs_url: obj.whmcs_url,
                        action: "usage_billing_ajax_search_domain",
                        security: obj.security,
                    };

                    $.ajax({
                        url: usage_billing_ajax_url,
                        type: "POST",
                        dataType: "json",
                        data: data,
                        success: function (data) {
                            obj.el.find(".spinner").remove();
                            obj.el.append(data.results_html);
                            console.log(data);
                        },
                        error: function (xhr, ajaxOptions, thrownError) {
                            console.log(xhr);
                            console.log(thrownError);
                        },
                    });
                },
            };

            element.is(function () {
                var id = $(this),
                    submitEl = id.find("#hostim-search-btn"),
                    inputEl = id.find("#usage-billing-domain-field"),
                    selectEl = id.find("#domainextension"),
                    formEl = id.find("#hos-main-dc-c-id"),
                    acEl = id.find('input[name="whmcs_url"]'),
                    data;

                data = {
                    submit: submitEl,
                    input: inputEl,
                    select: selectEl,
                    whmcs_url: acEl,
                    form: formEl,
                    div: id,
                    wap: id,
                };

                submitEl.attr("disabled", false);
                inputEl.keyup(function () {
                    if ($(this).val().length != 0) submitEl.attr("disabled", false);
                    else submitEl.attr("disabled", true);
                });

                submitEl.on("click", data, DomainCheck.submit);
            });


            // Disable Enter Key Domain Search Form
            document.addEventListener('keypress', function (e) {
                if (e.keyCode === 13 || e.which === 13) {
                    e.preventDefault();
                    return false;
                }
            });

	}
	


/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
	});

	$(window).on('resize orientationchange', function() {
		headerStyle();
	});
	
   /* ==========================================================================
   When document is loading, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
	});
	
	$(window).on('elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction('frontend/element_ready/hos-hero-two-id.default', sliderHeroTwoActive);
		elementorFrontend.hooks.addAction('frontend/element_ready/hos-hero-three-id.default', sliderHeroTwoActive);
		elementorFrontend.hooks.addAction('frontend/element_ready/hos-sponsor-id.default', sponsorActive);
		elementorFrontend.hooks.addAction('frontend/element_ready/hos-brand-sponsors-v2-id.default', sponsorActive);
		elementorFrontend.hooks.addAction('frontend/element_ready/hos-brand-cont-id.default', sponsorActive);
		elementorFrontend.hooks.addAction('frontend/element_ready/hos-testimonial-id.default', testimonialActive);
		elementorFrontend.hooks.addAction('frontend/element_ready/hos-testimonial-v2-id.default', testimonialActiveTwo);
		elementorFrontend.hooks.addAction('frontend/element_ready/hos-testimonial-v3-id.default', testimonialActiveThree);
		elementorFrontend.hooks.addAction('frontend/element_ready/hos-main-hero-id.default', domainSearchActive);
		elementorFrontend.hooks.addAction('frontend/element_ready/hos-main-dc-c-id.default', mainDomainSearchActive);
	});

})(window.jQuery);