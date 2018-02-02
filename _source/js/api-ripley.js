$(document).ready(function () {
    // Api
    $('.minisitio .producto-dinamico').each(function () {
        var productoDinamico = $(this);
        var idProducto = String($(this).attr('id'));
        var urlRipley = "https://simple.ripley.cl";
        var html = '';

        $.ajax({
            url: 'https://simple.ripley.cl/api/products/' + idProducto,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // Valores obtenidos de la URL
                var idCorta = String(response.uniqueID);
                var idLarga = String(response.partNumber);

                var productoNombre = String(response.name);
                var descripcionCorta = String(response.shortDescription);
                var descripcionlarga = String(response.longDescription);

                var urlProducto = String(response.url);

                var precioNormal = String(response.prices.formattedListPrice);
                var precioInternet = String(response.prices.formattedOfferPrice);
                var precioOpex = String(response.prices.formattedCardPrice);
                var totalDescuento = String(response.prices.formattedDiscount);

                var porcentajeDescuento = parseInt(response.prices.discountPercentage);
                var puntosRipley = parseInt(response.prices.ripleyPuntos);

                var imagenThumbnail = String(response.thumbnailImage);
                var imagenCompleta = String(response.fullImage);

                var esMarketplace = Boolean(response.isMarketplaceProduct);
                var esSinStock = Boolean(response.isOutOfStock);
                var esNoDisponible = Boolean(response.isUnavailable);
                
                
                // Inyectar los datos obtenidos desde la url
                productoDinamico.append(html);
                console.log(idCorta,idLarga,productoNombre,descripcionCorta,descripcionlarga,urlProducto,imagenThumbnail,imagenCompleta,esMarketplace,esSinStock,esNoDisponible,precioNormal,precioInternet,precioOpex,totalDescuento,porcentajeDescuento,puntosRipley);
            },
            error: function () {
                productoDinamico.remove();
            }
        });
    });
});