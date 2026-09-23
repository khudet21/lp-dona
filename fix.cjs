const fs = require('fs');
let c = fs.readFileSync('D:/laragon/www/WEB/LP-Dona/resources/js/Pages/Welcome.jsx', 'utf8');

c = c.replace(/Jasomedia_ adalah agensi/g, "\ adalah agensi");
c = c.replace(/                            Jasomedia_\r?\n                        <\/a>/g, "                            {getSetting('brand_name', 'Jasomedia_')}\n                        </a>");
c = c.replace(/Halo Jasomedia_, saya/g, "Halo \, saya");
c = c.replace(/                                Jasomedia_\r?\n                            <\/div>/g, "                                {getSetting('brand_name', 'Jasomedia_')}\n                            </div>");
c = c.replace(/'Jasomedia_\\. All rights/g, "\. All rights");

fs.writeFileSync('D:/laragon/www/WEB/LP-Dona/resources/js/Pages/Welcome.jsx', c);
