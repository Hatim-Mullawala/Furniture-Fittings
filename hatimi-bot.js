/* Hatimi Hardware Bot Loader - No-Redirect Version */
(function() {
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://tars-file-upload.s3.amazonaws.com/bulb/js/widget.js';
    s.type = 'text/javascript';
    s.async = true;
    d.getElementsByTagName('head')[0].appendChild(s);

    window.tarsSettings = {
        "convid": "uLv41w",
        "mode": "widget",        // Standard widget mode
        "mobile_view": "widget", // FORCES popup on mobile
        "redirect": false,       // STOPS the new screen from opening
        "onInit": function() {
            console.log("Hatimi Hardware Assistant Initialized");
        }
    };
})();