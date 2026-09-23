const fs = require('fs');
let c = fs.readFileSync('D:/laragon/www/WEB/LP-Dona/resources/js/Pages/Welcome.jsx', 'utf8');
console.log('Before count: ' + c.split('reserved.)}').length);
c = c.split('reserved.)}').join('reserved.\)}');
console.log('After count: ' + c.split('reserved.)}').length);
