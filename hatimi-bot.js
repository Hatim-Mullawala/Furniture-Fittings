/* Hatimi Hardware Bot Loader - Top Cut-Off Fix */
(function() {
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://tars-file-upload.s3.amazonaws.com/bulb/js/widget.js';
    s.type = 'text/javascript';
    s.async = true;
    d.getElementsByTagName('head')[0].appendChild(s);

    window.tarsSettings = {
        "convid": "uLv41w",
        "mode": "widget",
        "mobile_view": "widget", 
        "redirect": false,
        "onInit": function() {
            // This part forces the window down on mobile
            const style = d.createElement('style');
            style.innerHTML = `
                #tars-widget-container.mobile {
                    top: 60px !important;    /* Force it down from the top */
                    height: calc(100% - 80px) !important; /* Shrink height to fit */
                    bottom: 20px !important;
                }
            `;
            d.head.appendChild(style);
            console.log("Hatimi Hardware Assistant: Top-fix Applied");
        }
    };
})();