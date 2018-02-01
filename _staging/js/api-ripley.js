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
                var imagenThumbnail = String(response.thumbnailImage);
                var imagenCompleta = String(response.fullImage);
                var esMarketplace = Boolean(response.isMarketplaceProduct)
                
                
                // Inyectar los datos obtenidos desde la url
                productoDinamico.append(html);
                console.log(esMarketplace);
            },
            error: function () {
                productoDinamico.remove();
            }
        });
    });
});