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
                var productoNombre = String(response.name);
                var productoNombre = String(response.name);
                var idCorta = String(response.uniqueID);
                var idLarga = String(response.partNumber);
                
                // Inyectar los datos obtenidos desde la url
                productoDinamico.append(html);
            },
            error: function () {
                productoDinamico.remove();
            }
        });
    });
});