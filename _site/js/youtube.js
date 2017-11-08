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
$(".youtube-player").load(function() {
    var myId = $(this).data("id");
    $('.youtube-player').attr('id', myId);
});

$(".youtube-player").click(function() {
    var embedA = '<iframe class="embed-responsive-item" src="https://www.youtube.com/embed/';
    var myId = $(this).data("id");
    var embedB = '?autoplay=1&rel=0" allowfullscreen></iframe>';
    var myYoutube = embedA + myId + embedB;
    $('.youtube-main-player').html(myYoutube);
});
//End Youtube