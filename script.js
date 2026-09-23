const fs = require('fs');
const files = [
    'D:/laragon/www/WEB/LP-Dona/resources/js/Pages/Welcome.jsx',
    'D:/laragon/www/WEB/LP-Dona/resources/js/Pages/Tentang.jsx',
    'D:/laragon/www/WEB/LP-Dona/resources/js/Pages/Faq.jsx',
    'D:/laragon/www/WEB/LP-Dona/resources/js/Pages/Karya.jsx'
];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace in title
    content = content.replace(/<Head title="Jasomedia_ /g, "<Head title={\${getSetting('brand_name', 'Jasomedia_')} ");
    
    // Replace in navbar/footer tags (the literal text inside </a> or </Link> or </div>)
    // Looking for exactly: "Jasomedia_" that is preceded by whitespace and followed by newline or tags
    content = content.replace(/(\s+)Jasomedia_(\s*<\/(a|div|Link)>)/g, "\{getSetting('brand_name', 'Jasomedia_')}\");

    fs.writeFileSync(file, content);
});
