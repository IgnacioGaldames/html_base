$(document).ready(function() {
    $(".carrusel").show();
    $("#owl-carousel").owlCarousel({
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayHoverPause: true,
        nav: true,
        items: 1,
        loop: true,
        center: true,
        smartSpeed: 450
    });
    $("#owl-carousel-marcas").owlCarousel({
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayHoverPause: true,
        nav: true,
        items: 5,
        loop: true,
        center: true,
        smartSpeed: 450
    });
    $('.nav-item').button('toggle').addClass('active')
});