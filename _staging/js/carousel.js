$(document).ready(function() {
    $(".slider").owlCarousel({
        autoPlay: 5000,
        items: 1,
        itemsDesktop: [1214, 1],
        itemsDesktopSmall: [994, 1],
        itemsTablet: [543, 1],
        itemsMobile: 1,
        autoPlay: true,
        lazyLoad: true,
        navigationText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
        navigation: true,
        autoHeight: false,
        pagination: false,
        loop: true,
    });
    $(".slider-marcas").owlCarousel({
        autoPlay: 5000,
        items: 4,
        itemsDesktop: [1214, 4],
        itemsDesktopSmall: [994, 4],
        itemsTablet: [543, 4],
        itemsMobile: 4,
        autoPlay: true,
        lazyLoad: true,
        navigationText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>"],
        navigation: true,
        autoHeight: false,
        pagination: false,
        loop: true,
    });
});