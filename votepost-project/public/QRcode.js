// Extract the pollId from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const pollId = urlParams.get('pollId');
const code = document.getElementById('qrcode');
const testButton = document.getElementById('testButton');
// const end_btn = document.getElementById("end");

// Generate QR code when the page loads
document.addEventListener('DOMContentLoaded', function() {
    if (pollId) {
        generateQRCode(pollId);
    } else {
        console.error('No pollId provided in URL');
    }
});

// end_btn.addEventListener('click', function() {
//     const end = true;
//     window.location.href = `end_results.html?pollId=${pollId}&end=true`;
// });

testButton.addEventListener('click', function() {
    window.location.href = `votepage.html?pollId=${pollId}`;
})

function generateQRCode(pollId) {
    alert('Generating QR code');
    const url = `https://jmjones03.github.io/votepage.html?pollId=${pollId}`;
    
    // Clear any existing content
    document.getElementById("qrcode").innerHTML = '';
    
    // Create QR code with QR Code Styling library
    const qrCode = new QRCodeStyling({
        width: 200,
        height: 200,
        data: url,
        dotsOptions: {
            color: "#000000",
            type: "square"
        },
        backgroundOptions: {
            color: "#ffffff",
        }
    });
    
    qrCode.append(document.getElementById("qrcode"));
}