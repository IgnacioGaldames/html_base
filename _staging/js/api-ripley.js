$(document).ready(function () {
    // Api
    $('.producto-dinamico').each(function () {
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
                var htmlPrecioOpex = '<p class="precio-opex opex">' + precioOpex + '</p>';
                var htmlTotalDescuento = '<p class="total-descuento">' + totalDescuento + '</p>';
                var htmlFinal = ' class="final" ';
                var htmlMiImagen = '<img src="http://' + imagenThumbnail + '" alt="' + nombreProducto.toLowerCase() + '">';

                //miHtml += htmlPrecioNormal + htmlPrecioInternet + htmlPrecioOpex;

                // Si todos los precios son distintos de null
                if (!isNaN(precioNormalNoformat) && !isNaN(preciointernetNoformat) && !isNaN(precioOpexNoformat)) {
                    //console.log('todos los precios son distintos de null');

                    // Si todos los precios son iguales, se queda el precio opex
                    if (precioNormalNoformat == preciointernetNoformat && precioNormalNoformat == precioOpexNoformat && preciointernetNoformat == precioOpexNoformat) {
                        miHtml += '<span' + htmlFinal + '> ' + htmlPrecioOpex + "</span>";
                    } 
                    // Si solo el precio normal es igual al precio internet
                    else if (precioNormalNoformat  == preciointernetNoformat && precioNormalNoformat  != precioOpexNoformat && preciointernetNoformat != precioOpexNoformat) {
                        miHtml += '<span' + htmlFinal + '> ' + htmlPrecioOpex + "</span>";
                        miHtml += htmlPrecioInternet;
                    }
                     // Si el precio normal es igual al precio opex
                    else if (precioNormalNoformat  != preciointernetNoformat && precioNormalNoformat  == precioOpexNoformat && preciointernetNoformat != precioOpexNoformat) {
                        miHtml += '<span' + htmlFinal + '> ' + htmlPrecioOpex + "</span>";
                        miHtml += htmlPrecioInternet;
                    } 
                     // Si el precio internet es igual al precio opex
                    else if (precioNormalNoformat  != preciointernetNoformat && precioNormalNoformat  != precioOpexNoformat && preciointernetNoformat == precioOpexNoformat) {
                        miHtml += '<span' + htmlFinal + '> ' + htmlPrecioOpex + "</span>";
                        miHtml += htmlPrecioNormal;
                    }
                    // Si todos los precios son distintos
                    else if (precioNormalNoformat  != preciointernetNoformat && precioNormalNoformat  != precioOpexNoformat_format && preciointernetNoformat != precioOpexNoformat) {
                        miHtml += '<span' + htmlFinal + '> ' + htmlPrecioOpex + "</span>";
                        miHtml += htmlPrecioNormal;
                        miHtml += htmlPrecioInternet;
                    }
                }
                // Si solo el precio normal es null
                else if (isNaN(precioNormalNoformat ) && !isNaN(preciointernetNoformat) && !isNaN(precio_otar)) {
                    //console.log('solo el precio normal es null');
                    // Si el precio internet es igual al precio opex
                    if (preciointernetNoformat == precioOpexNoformat || preciointernetNoformat < precio_otar) {
                        miHtml += '<span' + htmlFinal + '> ' + htmlPrecioOpex + "</span>";  
                    }
                    // Si los precios son distintos
                    else {
                        miHtml += '<span' + htmlFinal + '> ' + htmlPrecioOpex + "</span>";
                        miHtml += htmlPrecioInternet;
                    }
                }
                 // Si el precio internet es null
                 else if (!isNaN(precioNormalNoformat) && isNaN(preciointernetNoformat) && !isNaN(precioOpexNoformat)) {
                    //console.log('el precio internet es null');
                    // Si el precio normal es igual al precio opex
                    if (precioNormalNoformat  == precioOpexNoformat || precioNormalNoformat  < precio_otar) {
                        miHtml += '<span' + htmlFinal + '> ' + htmlPrecioOpex + "</span>";
                    } 
                    // Si los precios son distintos
                    else {
                        miHtml += '<span' + htmlFinal + '> ' + htmlPrecioOpex + "</span>";
                        miHtml += htmlPrecioNormal;
                    }
                }               
                // Si el precio Opex es null
                else if (!isNaN(precioNormalNoformat) && !isNaN(preciointernetNoformat) && isNaN(precioOpexNoformat)) {
                    //console.log('el precio opex es null');
                    // Si el precio normal es igual al precio internet
                    if (precioNormalNoformat == preciointernetNoformat|| precioNormalNoformat < preciointernetNoformat) {
                        miHtml += '<span' + htmlFinal + '> ' + htmlPrecioInternet + "</span>";
                    }
                    // Si los precios normal e internet son distintos
                    else {
                        miHtml += '<span' + htmlFinal + '> ' + htmlPrecioInternet + "</span>";
                        miHtml += htmlPrecioNormal;
                    }
                }

                // Inyectar los datos obtenidos desde la url
                miHtml += '<a href="' + urlRipley + urlProducto + '">';
                miHtml += '<figure class="item">';
                miHtml += htmlMiImagen;
                miHtml += '</figure></a>';
                productoDinamico.append(miHtml);

                //console.log(idCorta, idLarga, nombreProducto, descripcionCorta, descripcionlarga, urlProducto, imagenThumbnail, imagenCompleta, esMarketplace, esSinStock, esNoDisponible, precioNormal, precioInternet, precioOpex, totalDescuento, porcentajeDescuento, puntosRipley);
            },
            error: function () {
                productoDinamico.remove();
            }
        });
    });
});