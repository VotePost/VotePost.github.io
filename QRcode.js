// Extract the pollId from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const pollId = urlParams.get('pollId');
const code = document.getElementById('qrcode');

// Generate QR code when the page loads
document.addEventListener('DOMContentLoaded', function() {
    if (pollId) {
        generateQRCode(pollId);
    } else {
        console.error('No pollId provided in URL');
    }
});

// generate QR Code
// what i had:
// function generateQRCode(pollId) {
//     alert('Generating QR code');
//     const url = `https://jmjones03.github.io/votepage.html?pollId=${pollId}`;
//     // should it be a different url ?
//     var qr = new QRCode(document.getElementById("qrcode"), url);
// }

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

// function generateQRCode(pollId) {
//     alert('Generating QR code');
//     const url = `https://jmjones03.github.io/votepage.html?pollId=${pollId}`;
    
//     // qrcode-generator usage
//     const qr = qrcode(0, 'L');
//     qr.addData(url);
//     qr.make();
    
//     // Display the QR code
//     document.getElementById("qrcode").innerHTML = qr.createImgTag(5);
// }