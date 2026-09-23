const fs = require('fs');

const files = [
    'D:/laragon/www/WEB/LP-Dona/resources/js/Pages/Welcome.jsx',
    'D:/laragon/www/WEB/LP-Dona/resources/js/Pages/Faq.jsx',
    'D:/laragon/www/WEB/LP-Dona/resources/js/Pages/Karya.jsx',
    'D:/laragon/www/WEB/LP-Dona/resources/js/Pages/Tentang.jsx'
];

files.forEach(file => {
    let c = fs.readFileSync(file, 'utf8');

    // Fix footer copyright mismatched quote
    c = c.replace(/Jasomedia_'\)\. All rights reserved\.'\)/g, "Jasomedia_'})}. All rights reserved.\)");
    // Wait, the previous replacement did: ${getSetting('brand_name', 'Jasomedia_')}. All rights reserved.')}
    c = c.replace(/Jasomedia_'\)}\. All rights reserved\.'\)/g, "Jasomedia_'})}. All rights reserved.\)");
    
    // Actually let's just use regex for the whole string:
    // {getSetting('footer_copyright', ${getSetting('brand_name', 'Jasomedia_')}. All rights reserved.')}
    // Should be:
    // {getSetting('footer_copyright', \\. All rights reserved.\)}
    c = c.replace(/\{getSetting\('footer_copyright', \$\{getSetting\('brand_name', 'Jasomedia_'\)\}\. All rights reserved\.'\)\}/g, "{getSetting('footer_copyright', \\. All rights reserved.\)}");

    // For Tentang.jsx
    // {getSetting('about_hero_subtitle', ${getSetting('brand_name', 'Jasomedia_')} hadir... ke audiens yang tepat.')}
    // Should end with \)}
    c = c.replace(/ke audiens yang tepat\.\\?'\)\}/g, "ke audiens yang tepat.\)}");

    // For Welcome.jsx
    // {getSetting('hero_subtitle', ${getSetting('brand_name', 'Jasomedia_')} adalah agensi... strategi digital yang berdampak.")}
    // Wait, it might be berdampak.)"
    c = c.replace(/berdampak\.?\)"/g, "berdampak.\)\"");
    // actually, wait, no it's in Welcome.jsx:
    c = c.replace(/yang berdampak\.(?:\\)"|\)"|"\))/g, "yang berdampak.\)}");
    c = c.replace(/\{getSetting\('hero_subtitle', \$\{getSetting\('brand_name', 'Jasomedia_'\)\} adalah agensi digital kreatif yang siap menghidupkan ide-ide Anda ke dalam karya visual dan strategi digital yang berdampak\.[^}]+\}/g, "{getSetting('hero_subtitle', \\ adalah agensi digital kreatif yang siap menghidupkan ide-ide Anda ke dalam karya visual dan strategi digital yang berdampak.\)}");

    fs.writeFileSync(file, c);
});
