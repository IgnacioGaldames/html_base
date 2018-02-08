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

                const productoNombre = String(response.name);
                const descripcionCorta = String(response.shortDescription);
                const descripcionlarga = String(response.longDescription);

                const urlProducto = String(response.url);

                const precioNormal = String(response.prices.formattedListPrice);
                const precioInternet = String(response.prices.formattedOfferPrice);
                const precioOpex = String(response.prices.formattedCardPrice);
                const totalDescuento = String(response.prices.formattedDiscount);

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

                miHtml += htmlPrecioNormal + htmlPrecioInternet + htmlPrecioOpex + htmlTotalDescuento;

                // En caso de que todos los precios sean distintos de null
                if (!isNaN(precioNormal) && !isNaN(precioInternet) && !isNaN(precioOpex)) {

                }
                else if (!isNaN(precioNormal) && !isNaN(precioInternet) && isNaN(precioOpex)) {

                }
                else if (!isNaN(precioNormal) && isNaN(precioInternet) && !isNaN(precioOpex)) {

                }
                else if (isNaN(precioNormal) && !isNaN(precioInternet) && !isNaN(precioOpex)) {

                }
                
                // Inyectar los datos obtenidos desde la url
                productoDinamico.append(miHtml);

                console.log(idCorta,idLarga,productoNombre,descripcionCorta,descripcionlarga,urlProducto,imagenThumbnail,imagenCompleta,esMarketplace,esSinStock,esNoDisponible,precioNormal,precioInternet,precioOpex,totalDescuento,porcentajeDescuento,puntosRipley);
            },
            error: function () {
                productoDinamico.remove();
            }
        });
    });
});