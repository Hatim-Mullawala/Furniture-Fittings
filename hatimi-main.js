/**
 * HATIMI HARDWARE - MASTER CORE ENGINE v2.5
 * Shared across: Furniture, Wholesale, and Tools Catalogs
 */

// --- 1. GLOBAL DATABASES ---
const styleDatabase = {
    "rose gold": "Pairs perfectly with Rose Gold Profile Handles and Warm LED cabinet lights.",
    "matt black": "Modern Choice! Match with Black Auto Hinges and Graphite Grey baskets.",
    "antique": "Classic Look. Use with Antique Finish Tower Bolts for a traditional feel.",
    "pvd gold": "Premium Selection. Match with Gold finish butt hinges for a luxury look.",
    "satin": "Universal Finish. Pairs well with SS 304 Baskets and Chrome accessories.",
    "black": "Complete the 'Modern Black' look with Black Concealed Hinges and Black Profile Lights.",
    "gold": "Match this with PVD Gold hinges and Rose Gold profile handles.",
    "silver": "Matches with Satin Finish Channels and SS Door Stoppers.",
    "chrome": "Pairs with High-Gloss Chrome Bathroom Accessories."
};

const quickMatchData = {
    "kitchen trolley": { msg: "Recommended: 20-inch Soft-close Telescopic Channels.", color: "#0c4a6e" },
    "furniture handles": { msg: "Pro Tip: Usually requires 1-inch Star Screws for 19mm Plywood.", color: "#b38728" },
    "auto hinge": { msg: "Matches with: 0.5-inch Wood Screws (Star Head).", color: "#1e293b" },
    "adhesive": { msg: "Apply with: Plastic Spreader for even bonding.", color: "#15803d" }
};

// --- 2. SHARED MODAL ENGINE ---
function openModal(nameInput, cat, param, isAutoHinge, series) {
    try {
        const catName = decodeURIComponent(cat);
        const seriesName = decodeURIComponent(series || "");
        const prodName = decodeURIComponent(nameInput || "");
        const catLower = catName.toLowerCase();
        
        // Modal Header setup
        document.getElementById('modal-title').innerText = seriesName ? `${seriesName} SERIES` : prodName;
        document.getElementById('modal-subtitle').innerText = catName;

        // --- 1. QUICK-MATCH INJECTION ---
        const match = quickMatchData[catLower] || Object.values(quickMatchData).find(m => catLower.includes(Object.keys(quickMatchData).find(k => k === m)));
        const filterContainer = document.getElementById('modal-filter-container');
        
        const oldMatch = document.getElementById('quick-match-box');
        if (oldMatch) oldMatch.remove();

        if (match) {
            const matchBox = document.createElement('div');
            matchBox.id = "quick-match-box";
            matchBox.style = `background:#f8fafc; border-left:5px solid ${match.color}; padding:12px; margin-bottom:15px; border-radius:4px; display:flex; align-items:center; gap:10px; font-size:13px; font-weight:700; color:${match.color};`;
            matchBox.innerHTML = `💡 <span>${match.msg}</span>`;
            if (filterContainer) filterContainer.parentNode.insertBefore(matchBox, filterContainer.nextSibling);
        }

        // --- 2. STYLE MATCH INJECTION ---
        // We scan the Title and the Category for style keywords
        const styleInfo = getStyleTip(prodName + " " + catName);
        const oldStyle = document.getElementById('style-match-box');
        if (oldStyle) oldStyle.remove();

        if (styleInfo) {
            const styleBox = document.createElement('div');
            styleBox.id = "style-match-box";
            styleBox.style = `background:#fff9eb; border:1px solid #fef3c7; padding:10px; margin-top:10px; border-radius:8px; display:flex; align-items:center; gap:10px; font-size:12px; font-style:italic; color:#92400e;`;
            styleBox.innerHTML = `✨ <strong>${styleInfo.colorName.toUpperCase()} TIP:</strong> ${styleInfo.message}`;
            document.getElementById('modal-table-body').parentNode.appendChild(styleBox);
        }

        document.getElementById('order-modal-overlay').style.display = "flex";
    } catch (e) { console.error("Engine Error:", e); }
}

// --- 3. HELPER FUNCTIONS ---

function getStyleTip(text) {
    const lowerText = text.toLowerCase();
    for (const [color, tip] of Object.entries(styleDatabase)) {
        if (lowerText.includes(color)) {
            return { colorName: color, message: tip };
        }
    }
    return null;
}

function tryLoadImage(idOrElement, urls, name) {
    const imgElement = typeof idOrElement === 'string' ? document.getElementById(idOrElement) : idOrElement;
    if (!imgElement) return;
    
    let index = 0;
    function attemptLoad() {
        if (index < urls.length) {
            const imgTester = new Image();
            imgTester.onload = () => { imgElement.src = urls[index - 1]; };
            imgTester.onerror = attemptLoad;
            imgTester.src = urls[index++];
        } else {
            imgElement.src = 'https://placehold.co/300x300/f8fafc/b38728?text=Photo+Pending';
        }
    }
    attemptLoad();
}

// --- 4. SHARED CALCULATION ENGINE ---
function calculateOrderTotal() {
    let grandTotal = 0;
    const rows = document.querySelectorAll('#modal-table-body tr');

    rows.forEach(row => {
        const checkbox = row.querySelector('.row-select');
        if (!checkbox) return;
        
        const mrp = parseFloat(row.querySelector('.row-mrp').getAttribute('data-mrp')) || 0;
        const disc = parseFloat(row.querySelector('.row-disc').value) || 0;
        const qty = parseFloat(row.querySelector('.row-qty').value) || 0;

        const finalPrice = (mrp - (mrp * (disc / 100))) * qty;
        row.querySelector('.row-final').innerText = '₹' + Math.round(finalPrice);

        if (checkbox.checked) grandTotal += finalPrice;
    });

    document.getElementById('modal-grand-total').innerText = '₹' + Math.round(grandTotal);
}