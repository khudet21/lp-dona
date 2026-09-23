const fs = require('fs');
['Welcome.jsx', 'Faq.jsx', 'Karya.jsx', 'Tentang.jsx'].forEach(file => {
    let p = 'D:/laragon/www/WEB/LP-Dona/resources/js/Pages/' + file;
    let c = fs.readFileSync(p, 'utf8');
    c = c.split("reserved.)}").join("reserved.\)}");
    c = c.split("tepat.)}").join("tepat.\)}");
    c = c.split("nyata.)}").join("nyata.\)}");
    fs.writeFileSync(p, c);
});
