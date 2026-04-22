/* Hatimi Hardware Bot Loader - Corrected */
(function() {
    // 1. Initialize the Tars Widget Script
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://tars-file-upload.s3.amazonaws.com/bulb/js/widget.js';
    s.type = 'text/javascript';
    s.async = true;
    
    // Add the script to the head of your page
    d.getElementsByTagName('head')[0].appendChild(s);

    // 2. Configure the Bot Settings
    window.tarsSettings = {
        "convid": "uLv41w", 
        "mode": "widget",  // <--- ADD THIS LINE to prevent full-screen on mobile
        "onInit": function() {
            console.log("Hatimi Hardware Assistant Initialized");
        }
    };
})();