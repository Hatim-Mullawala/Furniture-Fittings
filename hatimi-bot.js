/* Hatimi Hardware Bot Loader - Mobile Top-Cut Fix */
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
            const style = d.createElement('style');
            style.innerHTML = `
                /* The magic fix for mobile top cut-off */
                #tars-widget-container.mobile {
                    height: 90dvh !important;   /* Uses 'Dynamic Viewport Height' */
                    top: 5dvh !important;      /* Centers it vertically */
                    bottom: 5dvh !important;
                    margin: 0 auto !important;
                    position: fixed !important;
                    border-radius: 15px !important;
                    overflow: hidden !important;
                    box-shadow: 0px 10px 30px rgba(0,0,0,0.3) !important;
                }
                
                /* Ensure the inner content doesn't bleed out */
                #tars-widget-container.mobile iframe {
                    height: 100% !important;
                    border-radius: 15px !important;
                }
            `;
            d.head.appendChild(style);
            console.log("Hatimi Hardware Assistant: Dynamic Viewport Applied");
        }
    };
})();