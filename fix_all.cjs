const fs = require('fs');

const files = [
    'D:/laragon/www/WEB/LP-Dona/resources/js/Pages/Faq.jsx',
    'D:/laragon/www/WEB/LP-Dona/resources/js/Pages/Karya.jsx',
    'D:/laragon/www/WEB/LP-Dona/resources/js/Pages/Tentang.jsx'
];

files.forEach(file => {
    let c = fs.readFileSync(file, 'utf8');

    c = c.replace(/<Head title="[^"]+ - Jasomedia_"\s*\/>/g, function(match) {
        let titlePart = match.split('-')[0].replace('<Head title="', '').trim();
        return "<Head title={\" + titlePart + " - \\} />";
    });

    c = c.replace(/                            Jasomedia_\r?\n                        <\/Link>/g, "                            {getSetting('brand_name', 'Jasomedia_')}\n                        </Link>");
    c = c.replace(/'Jasomedia_\\. All rights/g, "\. All rights");
    
    // For Tentang.jsx "Tentang Jasomedia_"
    c = c.replace(/'Tentang Jasomedia_'/g, "Tentang \");
    c = c.replace(/'Mengapa Jasomedia_ ada'/g, "Mengapa \ ada");

    // Replace the long text block in Tentang.jsx
    c = c.replace(/'Jasomedia_ hadir /g, "\ hadir ");
    c = c.replace(/Jasomedia_ lahir bukan/g, "\ lahir bukan");

    fs.writeFileSync(file, c);
});
