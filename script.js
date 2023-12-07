function addCssClassBriefly(elemSelector, className, applyTimeInMs, timerVarObj, timerKey) {
    clearTimeout(timerVarObj[timerKey]);
    $(elemSelector).addClass(className);
    timerVarObj[timerKey] = setTimeout(function () {
        $(elemSelector).removeClass(className);
    }, applyTimeInMs);
}

function onFullScreen(isFullscreenCallback, notFullscreenCallback) {
    const isFullscreen =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement;
    if (isFullscreen) {
        isFullscreenCallback && isFullscreenCallback();
    } else {
        notFullscreenCallback && notFullscreenCallback();
    }
}

$(document).ready(function () {
    $(".overlay-carousel").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        infinite: false,
        prevArrow: '<button type="button" class="slick-prev">&lt;</button>',
        nextArrow: '<button type="button" class="slick-next">&gt;</button>',
    });

    const appearanceTimers = {};
    $(".overlay-carousel").on("mouseenter mousemove", function () {
        addCssClassBriefly(".slick-arrow", "shown", 3000, appearanceTimers, ".slick-arrow");
        onFullScreen(
            // when in fullscreen
            function () {
                addCssClassBriefly(".exit-fullscreen-btn", "shown", 3000, appearanceTimers, ".exit-fullscreen-btn");
            },
            // when not in fullscreen
            undefined
        );
    });
});

function enterFullscreen() {
    const elem = document.documentElement;
    let correctEnterFullscreen =
        elem.requestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen || elem.msRequestFullscreen;
    correctEnterFullscreen.call(elem);
}

function exitFullscreen() {
    let correctExitFullscreen =
        document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen;
    correctExitFullscreen.call(document);
}

$(document).on("fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange", function () {
    onFullScreen(
        // when in fullscreen
        function () {
            $("header").hide();
        },
        // when not in fullscreen
        function () {
            $("header").show();
            $(".exit-fullscreen-btn").removeClass("shown");
        }
    );
});
