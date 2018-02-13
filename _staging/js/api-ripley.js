$(document).ready(function () {
    // Api
    $('.minisitio .producto-dinamico').each(function () {
        const productoDinamico = $(this);
        const idProducto = String($(this).attr('id'));
        var urlRipley = "https://simple.ripley.cl";
        var miHtml = '';

        $.ajax({
            url: 'https://simple.ripley.cl/api/products/' + idProducto,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // Valores obtenidos de la URL
                const idCorta = String(response.uniqueID);
                const idLarga = String(response.partNumber);

                const nombreProducto = String(response.name);
                const descripcionCorta = String(response.shortDescription);
                const descripcionlarga = String(response.longDescription);

                const urlProducto = String(response.url);

                const precioNormal = String(response.prices.formattedListPrice);
                const precioInternet = String(response.prices.formattedOfferPrice);
                const precioOpex = String(response.prices.formattedCardPrice);
                const totalDescuento = String(response.prices.formattedDiscount);

                var precioNormalNoformat = parseInt(response.prices.listPrice);
                var preciointernetNoformat = parseInt(response.prices.offerPrice);
                var precioOpexNoformat = parseInt(response.prices.cardPrice);

                const porcentajeDescuento = parseInt(response.prices.discountPercentage);
                const puntosRipley = parseInt(response.prices.ripleyPuntos);

                const imagenThumbnail = String(response.thumbnailImage);
                const imagenCompleta = String(response.fullImage);

                const esMarketplace = Boolean(response.isMarketplaceProduct);
                const esSinStock = Boolean(response.isOutOfStock);
                const esNoDisponible = Boolean(response.isUnavailable);
                
                var htmlPrecioNormal = '<p class="precio-normal">' + precioNormal + '</p>';
                var htmlPrecioInternet = '<p class="precio-internet">' + precioInternet + '</p>';
                var htmlPrecioOpex = '<p class="precio-opex">' + precioOpex + '</p>';
                var htmlTotalDescuento = '<p class="total-descuento">' + totalDescuento + '</p>';

                miHtml += htmlPrecioNormal + htmlPrecioInternet + htmlPrecioOpex ;

                if (!isNaN(precioNormalNoformat) && !isNaN(preciointernetNoformat) && !isNaN(precioOpexNoformat)) {
                    // En caso de que todos los precios sean iguales, se queda el precio otar
                    if (precioNormalNoformat == preciointernetNoformat && precioNormalNoformat == precioOpexNoformat && preciointernetNoformat == precioOpexNoformat) {
                        html += "<p class='precio-opex final'> $" + htmlPrecioOpex + "</p>";
                        // En caso de que solo el precio normal sea igual al precio internet 
                    } else if (precioNormalNoformat == preciointernetNoformat && precioNormalNoformat != precioOpexNoformat && preciointernetNoformat != precioOpexNoformat) {
                        html += "<p class='precio-opex final'> $" + htmlPrecioOpex + "</p>";
                        html += "<p class='preciointernetNoformat'>Precio internet: $" + preciointernetNoformat + "</p>";

                        // En caso de que el precio normal es igual al precio otar
                    } else if (precioNormalNoformat != preciointernetNoformat && precioNormalNoformat == precioOpexNoformat && preciointernetNoformat != precioOpexNoformat) {
                        html += "<p class='precio-opex final'> $" + htmlPrecioOpex + "</p>";
                        html += "<p class='preciointernetNoformat'>Precio internet: $" + preciointernetNoformat + "</p>";

                        // En caso de que el precio internet sea igual al precio otar
                    } else if (precioNormalNoformat != preciointernetNoformat && precioNormalNoformat != precioOpexNoformat && preciointernetNoformat == precioOpexNoformat) {
                        html += "<p class='precio-opex final'> $" + htmlPrecioOpex + "</p>";
                        //html += "<p class='precioNormalNoformat'>Precio normal: $"+precioNormalNoformat+" / <span class='stock'>"+stock+" unidades</span></p>";
                        html += "<p class='precioNormalNoformat'>Precio normal: $" + precioNormalNoformat + "</p>";
                        // En caso de que todos los precios sean distintos
                    } else if (precioNormalNoformat != preciointernetNoformat && precioNormalNoformat != precioOpexNoformat && preciointernetNoformat != precioOpexNoformat) {
                        html += "<p class='precioOpexNoformat final'> $" + precioOpexNoformat + "</p>";
                        html += "<p class='precioNormalNoformat'>Precio normal: $" + precioNormalNoformat + "</p>";
                        html += "<p class='preciointernetNoformat'>Precio internet: $" + preciointernetNoformat + "</p>";

                        //html += "<p class='precioNormalNoformat'>Precio normal: $"+precioNormalNoformat+" / <span class='stock'>"+stock+" unidades</span></p>";
                    }
                    // En caso de qu solo el precio otar sea null
                } else if (!isNaN(precioNormalNoformat) && !isNaN(preciointernetNoformat) && isNaN(precioOpexNoformat)) {
                    // En caso de que el precio normal sea igual al precio internet
                    if (precioNormalNoformat == preciointernetNoformat || precioNormalNoformat < preciointernetNoformat) {
                        html += "<p class='preciointernetNoformat final'> $" + preciointernetNoformat + "</p>";
                        // En caso de que los precios sean distintos
                    } else {
                        html += "<p class='precioNormalNoformat'>Precio normal: $" + precioNormalNoformat + "</p>";
                        html += "<p class='preciointernetNoformat final'> $" + preciointernetNoformat + "</p>";
                        //html += "<p class='precioNormalNoformat'>Precio normal: $"+precioNormalNoformat+" / <span class='stock'>"+stock+" unidades</span></p>";
                    }
                    
                }
                // Si el precio normal es undefined
                else if (isNaN(precioNormalNoformat) && !isNaN(preciointernetNoformat) && !isNaN(precioOpexNoformat)) {
                    // En caso de que el precio internet sea igual al precio otar
                    if (preciointernetNoformat == precioOpexNoformat || preciointernetNoformat < precioOpexNoformat) {
                        html += "<p class='precioOpexNoformat final'> $" + htmlPrecioOpex + "</p>";
                        // En caso de que los precios sean distintos
                    } else {
                        html += "<p class='precioOpexNoformat final'> $" + htmlPrecioOpex + "</p>";
                        html += "<p class='preciointernetNoformat'>Precio internet: $" + preciointernetNoformat + "</p>";

                    }
                    // En caso de que el precio internet sea null
                } else if (!isNaN(precioNormalNoformat) && isNaN(preciointernetNoformat) && !isNaN(precioOpexNoformat)) {
                    // En caso de que el precio normal sea igual al precio otar
                    if (precioNormalNoformat == precioOpexNoformat || precioNormalNoformat < precioOpexNoformat) {
                        html += "<p class='precioOpexNoformat final'> $" + htmlPrecioOpex + "</p>";
                        // En caso de que los precios sean distintos
                    } else {
                        html += "<p class='precioOpexNoformat final'> $" + htmlPrecioOpex + "</p>";
                        //html += "<p class='precioNormalNoformat'>Precio normal: $"+precioNormalNoformat+" / <span class='stock'>"+stock+" unidades</span></p>";
                        html += "<p class='precioNormalNoformat'>Precio normal: $" + precioNormalNoformat + "</p>";
                    }
                }
                
                // Inyectar los datos obtenidos desde la url

                html += '<a href="' + urlRipley + urlProducto + '">';
                html += '<figure class="item">';
                html += '<img src="' + imagenThumbnail + '" alt="' + nombreProducto.toLowerCase() + '">';
                html += '</figure></a>';
                productoDinamico.append(miHtml);

                console.log(idCorta,idLarga,nombreProducto,descripcionCorta,descripcionlarga,urlProducto,imagenThumbnail,imagenCompleta,esMarketplace,esSinStock,esNoDisponible,precioNormal,precioInternet,precioOpex,totalDescuento,porcentajeDescuento,puntosRipley);
            },
            error: function () {
                productoDinamico.remove();
            }
        });
    });
});