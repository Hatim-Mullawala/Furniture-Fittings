/* Hatimi Hardware Bot Loader - Mobile Popup Fix */
(function() {
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://tars-file-upload.s3.amazonaws.com/bulb/js/widget.js';
    s.type = 'text/javascript';
    s.async = true;
    d.getElementsByTagName('head')[0].appendChild(s);

    window.tarsSettings = {
        "convid": "uLv41w",
        "mode": "widget",        // Keeps it as a popup
        "mobile_view": "widget", // Specifically for phones
        "open_in_tab": false,    // Prevents it from taking over the screen
        "onInit": function() {
            console.log("Hatimi Hardware Assistant Initialized");
        }
    };
})();