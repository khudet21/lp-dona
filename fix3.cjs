const fs = require('fs');
['Welcome.jsx', 'Faq.jsx', 'Karya.jsx', 'Tentang.jsx'].forEach(file => {
    let p = 'D:/laragon/www/WEB/LP-Dona/resources/js/Pages/' + file;
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/reserved\.\\\)\}/g, "reserved.\)}");
    c = c.replace(/tepat\.\\\)\}/g, "tepat.\)}");
    c = c.replace(/nyata\.\\\)\}/g, "nyata.\)}");
    fs.writeFileSync(p, c);
});
