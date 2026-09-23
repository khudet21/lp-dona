const fs = require('fs');
let p = 'D:/laragon/www/WEB/LP-Dona/resources/js/Pages/Tentang.jsx';
let c = fs.readFileSync(p, 'utf8');
c = c.split("\\Titik awalnya").join("`Titik awalnya");
fs.writeFileSync(p, c);
