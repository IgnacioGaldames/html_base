$(document).ready(function() {
    // Api
    $('.cardumen .producto-dinamico').each(function() {
        var producto_dinamico = $(this);
        var id_producto = String($(this).attr('id'));
        var url_ripley = "https://simple.ripley.cl";
        var html = '';

        $.ajax({
            url: 'https://simple.ripley.cl/api/products/' + id_producto,
            type: 'GET',
            dataType: 'json',
            success: function(response) {

                // Valores obtenidos de la URL
                var img_producto = String(response.fullImage);
                var thumb_producto = String(response.thumbnailImage);
                var nombre_producto = String(response.name);
                var descripcion = String(response.shortDescription);
                var url_producto = String(response.url);
                var precio_normal = parseInt(response.prices.listPrice);
                var precio_internet = parseInt(response.prices.offerPrice);
                var precio_otar = parseInt(response.prices.cardPrice);

                // Seteo de los precios para darles formato
                var precio_normal_format = formatNumber.new(precio_normal);
                var precio_internet_format = formatNumber.new(precio_internet);
                var precio_otar_format = formatNumber.new(precio_otar);

                // Empezar a pintar el html

                html += '<div class="col-md-3 text-left">';
                html += '<h2>Productos<br>';
                html += '<span class="h1">Destacados</span></h2>';
                html += '<p>' + nombre_producto + '</p>';

                // En caso de que todos los precios sean distintos de null
                if (!isNaN(precio_normal) && !isNaN(precio_internet) && !isNaN(precio_otar)) {
                    // En caso de que todos los precios sean iguales, se queda el precio otar
                    if (precio_normal == precio_internet && precio_normal == precio_otar && precio_internet == precio_otar_format) {
                        html += "<p class='precio_otar final'> $" + precio_otar_format + "</p>";
                        // En caso de que solo el precio normal sea igual al precio internet 
                    } else if (precio_normal == precio_internet && precio_normal != precio_otar && precio_internet != precio_otar) {
                        html += "<p class='precio_otar final'> $" + precio_otar_format + "</p>";
                        html += "<p class='precio_internet'>Precio internet: $" + precio_internet_format + "</p>";

                        // En caso de que el precio normal es igual al precio otar
                    } else if (precio_normal != precio_internet && precio_normal == precio_otar && precio_internet != precio_otar) {
                        html += "<p class='precio_otar final'> $" + precio_otar_format + "</p>";
                        html += "<p class='precio_internet'>Precio internet: $" + precio_internet_format + "</p>";

                        // En caso de que el precio internet sea igual al precio otar
                    } else if (precio_normal != precio_internet && precio_normal != precio_otar && precio_internet == precio_otar) {
                        html += "<p class='precio_otar final'> $" + precio_otar_format + "</p>";
                        //html += "<p class='precio_normal'>Precio normal: $"+precio_normal_format+" / <span class='stock'>"+stock+" unidades</span></p>";
                        html += "<p class='precio_normal'>Precio normal: $" + precio_normal_format + "</p>";
                        // En caso de que todos los precios sean distintos
                    } else if (precio_normal != precio_internet && precio_normal != precio_otar_format && precio_internet != precio_otar) {
                        html += "<p class='precio_otar final'> $" + precio_otar_format + "</p>";
                        html += "<p class='precio_normal'>Precio normal: $" + precio_normal_format + "</p>";
                        html += "<p class='precio_internet'>Precio internet: $" + precio_internet_format + "</p>";

                        //html += "<p class='precio_normal'>Precio normal: $"+precio_normal_format+" / <span class='stock'>"+stock+" unidades</span></p>";
                    }
                    // En caso de qu solo el precio otar sea null
                } else if (!isNaN(precio_normal) && !isNaN(precio_internet) && isNaN(precio_otar)) {
                    // En caso de que el precio normal sea igual al precio internet
                    if (precio_normal == precio_internet || precio_normal < precio_internet) {
                        html += "<p class='precio_internet final'> $" + precio_internet_format + "</p>";
                        // En caso de que los precios sean distintos
                    } else {
                        html += "<p class='precio_normal'>Precio normal: $" + precio_normal_format + "</p>";
                        html += "<p class='precio_internet final'> $" + precio_internet_format + "</p>";
                        //html += "<p class='precio_normal'>Precio normal: $"+precio_normal_format+" / <span class='stock'>"+stock+" unidades</span></p>";
                    }
                    // En caso de que solo el precio normal sea null
                } else if (isNaN(precio_normal) && !isNaN(precio_internet) && !isNaN(precio_otar)) {
                    // En caso de que el precio internet sea igual al precio otar
                    if (precio_internet == precio_otar || precio_internet < precio_otar) {
                        html += "<p class='precio_otar final'> $" + precio_otar_format + "</p>";
                        // En caso de que los precios sean distintos
                    } else {
                        html += "<p class='precio_otar final'> $" + precio_otar_format + "</p>";
                        html += "<p class='precio_internet'>Precio internet: $" + precio_internet_format + "</p>";

                    }
                    // En caso de que el precio internet sea null
                } else if (!isNaN(precio_normal) && isNaN(precio_internet) && !isNaN(precio_otar)) {
                    // En caso de que el precio normal sea igual al precio otar
                    if (precio_normal == precio_otar || precio_normal < precio_otar) {
                        html += "<p class='precio_otar final'> $" + precio_otar_format + "</p>";
                        // En caso de que los precios sean distintos
                    } else {
                        html += "<p class='precio_otar final'> $" + precio_otar_format + "</p>";
                        //html += "<p class='precio_normal'>Precio normal: $"+precio_normal_format+" / <span class='stock'>"+stock+" unidades</span></p>";

                        html += "<p class='precio_normal'>Precio normal: $" + precio_normal_format + "</p>";
                    }
                }

                html += '</div>';
                html += '<div class="col-md-6">';
                html += '<a href="' + url_ripley + url_producto + '">';
                html += '<figure class="item">';
                html += '<img src="' + img_producto + '" alt="' + nombre_producto.toLowerCase() + '">';
                html += '</figure></a>';
                html += '</div>';

                // Inyectar los datos obtenidos desde la url
                producto_dinamico.append(html);
            },
            error: function() {
                producto_dinamico.remove();
            }
        });
    });

    $('.cardumen .thumb-dinamico').each(function() {
        var thumb_dinamico = $(this);
        var id_producto = String($(this).attr('id'));
        var url_ripley = "https://simple.ripley.cl";
        var html = '';

        $.ajax({
            url: 'https://simple.ripley.cl/api/products/' + id_producto,
            type: 'GET',
            dataType: 'json',
            success: function(response) {

                // Valores obtenidos de la URL
                var thumb_producto = String(response.thumbnailImage);

                // Empezar a pintar el html
                html += '<figure class="" id="btn-nerf-1">';
                html += '<img src="' + thumb_producto + '" alt="">';
                html += '</figure>';



                // Inyectar los datos obtenidos desde la url
                thumb_dinamico.append(html);
            },
            error: function() {
                thumb_dinamico.remove();
            }
        });
    });
    var formatNumber = {
        separador: ".", // separador para los miles
        sepDecimal: ',', // separador para los decimales

        formatear: function(num) {
            num += '';
            var splitStr = num.split('.');
            var splitLeft = splitStr[0];
            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
            var regx = /(\d+)(\d{3})/;

            while (regx.test(splitLeft)) {
                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
            }
            return this.simbol + splitLeft + splitRight;
        },
        new: function(num, simbol) {
            this.simbol = simbol || '';
            return this.formatear(num);
        }
    }

    // $(".IDCAROUSEL").owlCarousel({
    // 	autoPlay: true, //Set AutoPlay to 3 seconds
    // 	items : 3, //10 items above 1000px browser width
    // 	itemsDesktop : [1199,3], //5 items between 1000px and 901px
    // 	itemsDesktopSmall : [991,2], // betweem 900px and 601px
    // 	itemsTablet: [543,1], //2 items between 600 and 0
    // 	itemsMobile : 1, // itemsMobile disabled - inherit from itemsTablet option
    // 	navigation: true,
    // 	pagination: false,
    // 	navigationText: [" "," "],
    // })

    new WOW().init();
});

document.addEventListener("DOMContentLoaded",
    function() {
        var div, n,
            v = document.getElementsByClassName("youtube-player");
        for (n = 0; n < v.length; n++) {
            div = document.createElement("div");
            div.setAttribute("data-id", v[n].dataset.id);
            div.innerHTML = labnolThumb(v[n].dataset.id);
            div.onclick = labnolIframe;
            v[n].appendChild(div);
        }
    });
/*
function labnolThumb(id) {
    var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
        play = '<div class="play"></div>';
    return thumb.replace("ID", id) + play;
}

function labnolIframe() {
    var iframe = document.createElement("iframe");
    var embed = "https://www.youtube.com/embed/ID?autoplay=1&rel=0";
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    this.parentNode.replaceChild(iframe, this);
}
*/

 //Youtube
 function youtube() {
    var div, n, m,
        v = document.getElementsByClassName("youtube-player");
        w = document.getElementsByClassName("youtube-main-player");
        x = document.getElementsByClassName("youtube-player-mini");
    for (n = 0; n < v.length; n++) {
        div = document.createElement("div");
        div.setAttribute("data-id", v[n].dataset.id);
        div.innerHTML = labnolThumb(v[n].dataset.id);
        //div.onclick = labnolIframe;
        v[n].appendChild(div);
      }
      for (m = 0; m < w.length; m++) {
        div = document.createElement("div");
        div.setAttribute("data-id", w[m].dataset.id);
        div.innerHTML = labnolMainThumb(w[m].dataset.id);
        //div.onclick = labnolIframe;
        w[m].appendChild(div);
      }
      for (o = 0; o < x.length; o++) {
        div = document.createElement("div");
        div.setAttribute("data-id", x[o].dataset.id);
        div.innerHTML = labnolMainThumb(x[o].dataset.id);
        div.onclick = labnolIframe;
        x[o].appendChild(div);
      }
  }
  youtube();
  function labnolThumb(id) {
    var thumb = '<img src="http://i.ytimg.com/vi/ID/hqdefault.jpg">',
        play = '<div class="play"></div>';
    return thumb.replace("ID", id) + play;
  }
  function labnolMainThumb(id) {
    var thumb = '<img src="http://i.ytimg.com/vi/ID/hqdefault.jpg">',
        play = '<div class="play"></div>';
    return thumb.replace("ID", id) + play;
  }
  function labnolIframe() {
    var iframe = document.createElement("iframe");
    var embed = "https://www.youtube.com/embed/ID?autoplay=1&rel=0";
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    iframe.setAttribute("class", "embed-responsive-item");
    this.parentNode.replaceChild(iframe, this);
  }
  $( ".youtube-player" ).load(function() {
    var myId = $(this).data("id");
    $('.youtube-player').attr('id', myId);
  });

  $( ".youtube-player" ).click(function() {
    var embedA = '<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/';
    var myId = $(this).data("id");
    var embedB = '?autoplay=1&rel=0" allowfullscreen></iframe>';
    var myYoutube = embedA + myId + embedB;
    $('.youtube-main-player').html(myYoutube);
  });
  //End Youtube