import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';

export default function Welcome({ services, portfolios, testimonials, settings, products }) {
    // Gabungkan settings dari server dengan state lokal untuk keperluan live preview
    const [liveSettings, setLiveSettings] = useState(settings || {});
    
    // Dengarkan event postMessage dari iframe parent untuk real-time update
    React.useEffect(() => {
        const handleMessage = (event) => {
            if (event.data && event.data.type === 'updateSettings') {
                setLiveSettings(prev => ({ ...prev, ...event.data.settings }));
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    // Helper untuk mengambil nilai setting atau fallback ke default
    const getSetting = (key, defaultValue) => {
        return liveSettings[key] || defaultValue;
    };

    const heroLabel = getSetting('hero_label', "Digital Agency · Creative Studio");
    const heroTitle = getSetting('hero_title', "Tingkatkan Kehadiran Digital Brand Anda");
    const heroSubtitle = getSetting('hero_subtitle', `${getSetting('brand_name', 'Jasomedia_')} adalah agensi digital kreatif yang siap menghidupkan ide-ide Anda ke dalam karya visual dan strategi digital yang berdampak.`);
    
    const [form, setForm] = useState({ name: '', email: '', requirements: '' });
    const [status, setStatus] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const testimonialScrollRef = useRef(null);
    useEffect(() => {
        if (!testimonials || testimonials.length <= 2) return;
        
        // Auto-scroll logic every 3 seconds (but takes 0.5s to transition via CSS smooth scroll)
        const interval = setInterval(() => {
            if (testimonialScrollRef.current) {
                const container = testimonialScrollRef.current;
                const scrollWidth = container.scrollWidth;
                const clientWidth = container.clientWidth;
                
                // If we reached the end, scroll back to start
                if (container.scrollLeft + clientWidth >= scrollWidth - 10) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Scroll by one card width
                    const card = container.children[0];
                    const cardWidth = card ? card.clientWidth + 24 /* gap-6 = 24px */ : clientWidth;
                    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
                }
            }
        }, 3000); // 3 seconds interval
        
        return () => clearInterval(interval);
    }, [testimonials]);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post('/leads', form, {
            preserveScroll: true,
            onSuccess: () => {
                setStatus('Pesan berhasil terkirim! Tim kami akan segera menghubungi Anda.');
                setForm({ name: '', email: '', requirements: '' });
                setTimeout(() => setStatus(''), 2000);
            },
            onError: (errors) => {
                console.error(errors);
                setStatus('Terjadi kesalahan pengisian form. Silakan cek kembali.');
                setTimeout(() => setStatus(''), 2000);
            }
        });
    };

    const primaryColor = getSetting('primary_color', '#DD7809');
    const bgColor = getSetting('bg_color', '#F8FAFC');
    const bgAltColor = getSetting('bg_alt_color', '#F1F5F9');
    const textColor = getSetting('text_color', '#0F172A');
    const textMutedColor = getSetting('text_muted_color', '#475569');
    const formBgColor = getSetting('form_bg_color', '#020617');
    const footerBgColor = getSetting('footer_bg_color', '#020617');
    
    // Helper to generate darker color
    const getDarkColor = (hex) => {
        if (!hex || hex.length !== 7) return '#C74903';
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        r = Math.floor(r * 0.85);
        g = Math.floor(g * 0.85);
        b = Math.floor(b * 0.85);
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    };
    
    const primaryDark = primaryColor === '#DD7809' ? '#C74903' : getDarkColor(primaryColor);

    const themeStyles = `
        :root {
            --primary: ${primaryColor};
            --primary-dark: ${primaryDark};
            --bg-color: ${bgColor};
            --bg-alt-color: ${bgAltColor};
            --text-color: ${textColor};
            --text-muted-color: ${textMutedColor};
            --form-bg-color: ${formBgColor};
            --footer-bg-color: ${footerBgColor};
        }
        
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        
        /* Tema Warna Utama */
        .text-\\[\\#DD7809\\] { color: var(--primary) !important; }
        .text-\\[\\#C74903\\] { color: var(--primary-dark) !important; }
        .from-\\[\\#DD7809\\] { --tw-gradient-from: var(--primary) var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
        .to-\\[\\#C74903\\] { --tw-gradient-to: var(--primary-dark) var(--tw-gradient-to-position) !important; }
        .hover\\:from-\\[\\#C74903\\]:hover { --tw-gradient-from: var(--primary-dark) var(--tw-gradient-from-position) !important; --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) !important; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
        .hover\\:to-\\[\\#C74903\\]:hover { --tw-gradient-to: var(--primary-dark) var(--tw-gradient-to-position) !important; }
        .bg-\\[\\#DD7809\\]\\/10 { background-color: color-mix(in srgb, var(--primary) 10%, transparent) !important; }
        .bg-\\[\\#DD7809\\]\\/15 { background-color: color-mix(in srgb, var(--primary) 15%, transparent) !important; }
        .bg-\\[\\#DD7809\\]\\/20 { background-color: color-mix(in srgb, var(--primary) 20%, transparent) !important; }
        .bg-\\[\\#DD7809\\]\\/30 { background-color: color-mix(in srgb, var(--primary) 30%, transparent) !important; }
        .border-\\[\\#DD7809\\]\\/10 { border-color: color-mix(in srgb, var(--primary) 10%, transparent) !important; }
        .border-\\[\\#DD7809\\]\\/30 { border-color: color-mix(in srgb, var(--primary) 30%, transparent) !important; }
        .focus\\:border-\\[\\#DD7809\\]:focus { border-color: var(--primary) !important; }
        .focus\\:ring-\\[\\#DD7809\\]:focus { --tw-ring-color: var(--primary) !important; }
        .group:hover .group-hover\\:text-\\[\\#DD7809\\] { color: var(--primary) !important; }
        .selection\\:bg-\\[\\#DD7809\\]\\/20 *::selection { background-color: color-mix(in srgb, var(--primary) 20%, transparent) !important; }

        /* Tombol CTA (Mulai Sekarang dsb) */
        .bg-gray-900 { background-color: var(--primary) !important; }
        .hover\\:bg-gray-800:hover { background-color: var(--primary-dark) !important; }

        /* Tema Background & Teks Umum */
        body { background-color: var(--bg-color) !important; }
        .bg-\\[\\#f5f8f7\\] { background-color: var(--bg-color) !important; }
        .bg-\\[\\#f9fbfb\\] { background-color: var(--bg-alt-color) !important; }
        .text-gray-900 { color: var(--text-color) !important; }
        .text-gray-800 { color: var(--text-color) !important; }
        
        /* Tema Teks Deskripsi (Muted) di Atas Background Terang */
        .text-gray-700 { color: var(--text-muted-color) !important; }
        .text-gray-600 { color: var(--text-muted-color) !important; }
        .text-gray-500 { color: var(--text-muted-color) !important; }

        /* Tema Footer & Contact Form (Background Gelap) */
        .bg-\\[\\#1c0d03\\] { background-color: var(--form-bg-color) !important; }
        .bg-\\[\\#140902\\] { background-color: var(--footer-bg-color) !important; }
    `;

    return (
        <div className="min-h-screen bg-[#f5f8f7] text-gray-900 font-sans selection:bg-[#DD7809]/20 relative">
            <style dangerouslySetInnerHTML={{__html: themeStyles}} />
            <Head title={`${getSetting('brand_name', 'Jasomedia_')} | Creative Digital Agency`} />

            {/* Floating Navbar (WagWay pill concept) */}
            <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl transition-all duration-300">
                <div className="bg-white/80 backdrop-blur-md shadow-lg border border-white/60 rounded-full px-2 py-2 flex items-center justify-between">
                    <div className="flex items-center pl-4">
                        <a href="/" className="text-lg md:text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
                            {settings.brand_icon ? (
                                <div className="w-4 h-4 md:w-5 md:h-5 text-[#DD7809] flex items-center justify-center" dangerouslySetInnerHTML={{ __html: settings.brand_icon }} />
                            ) : (
                                <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-tr from-[#DD7809] to-[#C74903] rounded-full"></div>
                            )}
                            {getSetting('brand_name', 'Jasomedia_')}
                        </a>
                    </div>
                    <nav className="hidden md:flex items-center space-x-1 px-4">
                        <Link href="/tentang" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#C74903] hover:bg-gray-100/50 rounded-full transition">Tentang Kami</Link>
                        <Link href="/faq" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#C74903] hover:bg-gray-100/50 rounded-full transition">FAQ</Link>
                        <a href="#services" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#C74903] hover:bg-gray-100/50 rounded-full transition">Layanan</a>
                        <a href="#catalog" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#C74903] hover:bg-gray-100/50 rounded-full transition">Katalog</a>
                        <a href="#portfolio" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#C74903] hover:bg-gray-100/50 rounded-full transition">Karya</a>
                        <a href="#testimonials" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#C74903] hover:bg-gray-100/50 rounded-full transition">Testimoni</a>
                    </nav>
                    <div className="flex items-center space-x-2 pr-1">
                        <a href="#contact" className="hidden md:inline-flex bg-gradient-to-r from-[#DD7809] to-[#C74903] hover:from-[#C74903] hover:to-[#C74903] text-white text-sm font-medium px-5 py-2.5 rounded-full transition shadow-md">
                            Konsultasi
                        </a>
                        {/* Burger Menu Button */}
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                            className="md:hidden w-10 h-10 flex items-center justify-center text-gray-800 bg-gray-100 rounded-full hover:bg-gray-200 transition focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl rounded-3xl p-4 flex flex-col space-y-2 z-40 transform origin-top transition-all">
                        <Link href="/tentang" className="px-5 py-3.5 font-semibold text-gray-800 rounded-xl hover:bg-orange-50 hover:text-[#C74903] transition">Tentang Kami</Link>
                        <Link href="/faq" className="px-5 py-3.5 font-semibold text-gray-800 rounded-xl hover:bg-orange-50 hover:text-[#C74903] transition">FAQ</Link>
                        <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-3.5 font-semibold text-gray-800 rounded-xl hover:bg-orange-50 hover:text-[#C74903] transition">Layanan</a>
                        <a href="#catalog" onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-3.5 font-semibold text-gray-800 rounded-xl hover:bg-orange-50 hover:text-[#C74903] transition">Katalog</a>
                        <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-3.5 font-semibold text-gray-800 rounded-xl hover:bg-orange-50 hover:text-[#C74903] transition">Karya</a>
                        <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-3.5 font-semibold text-gray-800 rounded-xl hover:bg-orange-50 hover:text-[#C74903] transition">Testimoni</a>
                        <div className="h-px bg-gray-100 my-2"></div>
                        <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="px-5 py-3.5 font-bold text-center bg-gradient-to-r from-[#DD7809] to-[#C74903] text-white rounded-xl shadow-md">
                            Konsultasi Sekarang
                        </a>
                    </div>
                )}
            </header>

            {/* Backdrop for closing mobile menu by clicking outside */}
            {isMobileMenuOpen && (
                <div 
                    className="md:hidden fixed inset-0 z-30"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {/* Hero Section */}
            <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="text-center md:text-left pt-10 lg:pt-0">
                        <div className="inline-block px-3 py-1 bg-[#DD7809]/15 text-[#C74903] text-xs font-semibold rounded-full mb-6 tracking-wide uppercase">
                            {heroLabel}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6 text-gray-900">
                            {heroTitle}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
                            {heroSubtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <a href="#contact" className="bg-gray-900 text-white px-6 py-3.5 rounded-full font-medium hover:bg-gray-800 transition shadow-lg text-center flex items-center justify-center gap-2">
                                {getSetting('hero_cta_1', 'Mulai sekarang')}
                            </a>
                            <a href="#catalog" className="bg-white text-gray-900 border border-gray-200 px-6 py-3.5 rounded-full font-medium hover:bg-gray-50 transition text-center flex items-center justify-center gap-2 shadow-sm">
                                {getSetting('hero_cta_2', 'Lihat katalog')} <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                        <ul className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 text-sm text-gray-600 font-medium">
                            <li className="flex items-center justify-center gap-2"><svg className="w-4 h-4 text-[#DD7809]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> {getSetting('hero_feature_1', 'Strategi Akurat')}</li>
                            <li className="flex items-center justify-center gap-2"><svg className="w-4 h-4 text-[#DD7809]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> {getSetting('hero_feature_2', 'Visual Memukau')}</li>
                            <li className="flex items-center justify-center gap-2"><svg className="w-4 h-4 text-[#DD7809]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> {getSetting('hero_feature_3', 'Support Terbaik')}</li>
                        </ul>
                    </div>
                    
                    {/* Hero Graphic */}
                    <div className="relative mt-4 lg:mt-0 px-4 md:px-0">
                        <div className="absolute inset-0 bg-[#DD7809]/30 rounded-3xl blur-3xl opacity-30 transform -rotate-6"></div>
                        <div className="relative rounded-3xl shadow-2xl border border-gray-100 overflow-hidden group bg-white">
                            <img src={settings.hero_image ? (settings.hero_image.startsWith('http') ? settings.hero_image : `/storage/${settings.hero_image}`) : "/banner.png"} alt="Jasomedia Creative Banner" className="w-full h-auto object-cover group-hover:scale-105 transition duration-700 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition duration-500 flex items-end">
                                <div className="p-6 md:p-8 w-full">
                                    <p className="text-white font-bold text-xl mb-1">Creative Studio</p>
                                    <p className="text-gray-200 text-sm">Crafting digital experiences</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-16 md:py-24 border-t border-gray-200/60 bg-white">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{getSetting('services_title', 'Yang Anda dapat')}</h2>
                        <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto lg:mx-0">{getSetting('services_subtitle', 'Fokus pada pertumbuhan brand Anda melalui eksekusi digital yang matang, bukan sekadar janji manis.')}</p>
                        <a href="#contact" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition">
                            {getSetting('services_cta', 'Mulai proyek')}
                        </a>
                    </div>
                    <div className="lg:col-span-8">
                        {services && services.length > 0 ? (
                            <div className="flex flex-col gap-6">
                                {services.map((service) => (
                                    <div key={service.id} className="flex flex-col sm:flex-row gap-5 p-6 md:p-8 rounded-3xl bg-[#f5f8f7] border border-transparent hover:border-gray-200 transition group text-center sm:text-left">
                                        <div className="flex-shrink-0 mx-auto sm:mx-0 mt-1">
                                            <div className="w-14 h-14 bg-white shadow-sm rounded-2xl text-gray-900 flex items-center justify-center opacity-90 group-hover:opacity-100 transition group-hover:text-[#DD7809] group-hover:scale-110 duration-300">
                                                {service.icon_svg ? (
                                                    <div dangerouslySetInnerHTML={{ __html: service.icon_svg }} className="w-7 h-7 flex items-center justify-center" />
                                                ) : (
                                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{service.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 bg-[#f5f8f7] p-8 rounded-3xl text-center">Layanan belum ditambahkan. Silakan kelola di Dashboard.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Catalog Section */}
            <section id="catalog" className="py-16 md:py-24 border-t border-gray-200/60 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{getSetting('catalog_title', 'Katalog Paket')}</h2>
                        <p className="text-gray-600 text-lg">{getSetting('catalog_subtitle', 'Pilih paket layanan digital yang paling sesuai dengan kebutuhan dan skala bisnis Anda.')}</p>
                    </div>
                    
                    {products && products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-md transition flex flex-col">
                                    {product.image && (
                                        <div className="mb-6 -mx-8 -mt-8 overflow-hidden rounded-t-3xl aspect-[4/3]">
                                            <img src={product.image.startsWith('http') ? product.image : `/storage/${product.image}`} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
                                    {product.price && (
                                        <div className="text-3xl font-extrabold text-[#C74903] mb-6">
                                            Rp {new Intl.NumberFormat('id-ID').format(product.price)}
                                        </div>
                                    )}
                                    {product.description && (
                                        <p className="text-gray-600 mb-8 whitespace-pre-line flex-1">{product.description}</p>
                                    )}
                                    <a href="#contact" className="w-full py-3 px-4 bg-gray-50 border border-gray-200 text-gray-900 rounded-xl font-bold text-center hover:bg-gray-100 transition mt-auto">
                                        Pesan Sekarang
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 bg-white p-8 rounded-3xl text-center border border-gray-100">Katalog produk sedang dalam pembaruan.</p>
                    )}
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="py-16 md:py-24 border-t border-gray-200/60 bg-white">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
                    <div className="lg:col-span-4 lg:col-start-9 lg:sticky lg:top-32 h-fit order-first lg:order-last text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{getSetting('portfolio_title', 'Karya Terbaik')}</h2>
                        <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto lg:mx-0">{getSetting('portfolio_subtitle', 'Dari kampanye sosial media hingga identitas visual, lihat bagaimana kami membantu klien mencapai tujuan bisnis mereka.')}</p>
                        <Link href="/karya" className="inline-flex items-center justify-center gap-2 text-gray-900 font-semibold hover:text-[#C74903] transition group">
                            {getSetting('portfolio_cta', 'Lihat semua karya')} <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                    <div className="lg:col-span-8 lg:col-start-1 lg:row-start-1">
                        {portfolios && portfolios.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {portfolios.map((portfolio) => (
                                    <div key={portfolio.id} className="group relative overflow-hidden rounded-3xl shadow-sm border border-gray-100 bg-white cursor-pointer hover:shadow-md transition">
                                        <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                                            <img src={portfolio.image_url ? (portfolio.image_url.startsWith('http') ? portfolio.image_url : `/storage/${portfolio.image_url}`) : 'https://via.placeholder.com/600x400?text=Portfolio'} alt={portfolio.title} className="object-cover w-full h-56 sm:h-72 group-hover:scale-105 transition duration-500" />
                                        </div>
                                        <div className="p-6 bg-white relative z-10">
                                            <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#DD7809] transition">{portfolio.title}</h3>
                                            <p className="text-gray-500 text-sm flex items-center gap-2">
                                                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                                <span className="truncate">{portfolio.client_name}</span>
                                            </p>
                                            {portfolio.description && (
                                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300 ease-out">
                                                    <div className="overflow-hidden">
                                                        <p className="text-gray-600 text-sm mt-3 pt-3 border-t border-gray-100 leading-relaxed">
                                                            {portfolio.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 bg-white p-8 rounded-3xl text-center border border-gray-100">Belum ada karya yang diunggah.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-16 md:py-24 border-t border-gray-200/60 bg-[#f9fbfb]">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
                     <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{getSetting('testimonial_title', 'Testimoni Klien')}</h2>
                        <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto lg:mx-0">{getSetting('testimonial_subtitle', 'Kepercayaan mereka adalah bukti dedikasi kami dalam memberikan hasil yang melampaui ekspektasi.')}</p>
                    </div>
                    <div className="lg:col-span-8 overflow-hidden relative">
                        {testimonials && testimonials.length > 0 ? (
                            <div ref={testimonialScrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar" style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {testimonials.map((testimonial) => (
                                    <div key={testimonial.id} className="min-w-full md:min-w-[calc(50%-12px)] snap-center bg-white p-8 rounded-3xl flex flex-col justify-between group hover:shadow-lg border border-gray-100 hover:border-transparent transition duration-300 flex-shrink-0">
                                        <div>
                                            <div className="text-[#DD7809] mb-6 flex gap-1">
                                                {[...Array(testimonial.rating || 5)].map((_, i) => (
                                                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                                ))}
                                            </div>
                                            <p className="text-gray-700 text-base leading-relaxed mb-8">"{testimonial.review}"</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#DD7809]/10 text-[#C74903] rounded-full flex items-center justify-center font-bold text-sm">
                                                {testimonial.client_name.charAt(0)}
                                            </div>
                                            <div className="font-medium text-gray-900 text-sm">{testimonial.client_name}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 bg-white p-8 rounded-3xl text-center border border-gray-100">Belum ada testimoni.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Contact / Close Section */}
            <section id="contact" className="py-16 md:py-24 bg-[#1c0d03] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-[#DD7809]/20 rounded-full blur-3xl"></div>
                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">{getSetting('cta_title', 'Mulai digitalisasi bisnis Anda hari ini.')}</h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">{getSetting('cta_subtitle', 'Konsultasikan kebutuhan Anda bersama tim ahli kami. Cepat, tepat sasaran, dan tanpa komitmen awal.')}</p>
                    
                    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl text-left max-w-2xl mx-auto">
                        {status && <div className="mb-6 p-4 bg-[#DD7809]/20 text-[#DD7809] rounded-xl border border-[#DD7809]/30 font-medium text-sm md:text-base">{status}</div>}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Nama Lengkap</label>
                                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:border-[#DD7809] focus:ring-1 focus:ring-[#DD7809] outline-none transition" placeholder="Budi Santoso" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">Email Kerja</label>
                                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:border-[#DD7809] focus:ring-1 focus:ring-[#DD7809] outline-none transition" placeholder="budi@perusahaan.com" />
                            </div>
                        </div>
                        <div className="mb-8">
                            <label className="block text-sm font-medium mb-2 text-gray-300">Detail Kebutuhan</label>
                            <textarea required rows="4" value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})} className="w-full px-4 py-3.5 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:border-[#DD7809] focus:ring-1 focus:ring-[#DD7809] outline-none transition resize-none" placeholder="Ceritakan singkat tentang proyek Anda..."></textarea>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button type="submit" className="flex-1 bg-gradient-to-r from-[#DD7809] to-[#C74903] hover:from-[#C74903] hover:to-[#C74903] text-white font-bold py-4 rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-lg">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                Kirim via Email
                            </button>
                            <button 
                                type="button" 
                                onClick={() => {
                                    const text = `Halo ${getSetting('brand_name', 'Jasomedia_')}, saya ${form.name || 'Calon Klien'}.%0A%0AEmail: ${form.email || '-'}%0A%0AKebutuhan: ${form.requirements || 'Saya ingin berdiskusi lebih lanjut mengenai layanan digital Anda.'}`;
                                    const waNumber = getSetting('whatsapp_number', '6281392240400');
                                    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
                                }} 
                                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl transition shadow-lg flex items-center justify-center gap-2 text-lg"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                Kirim via WhatsApp
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#140902] border-t border-white/5 pt-16 pb-8 text-gray-400">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                        <div className="flex flex-col items-center md:items-start gap-3">
                            <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
                                {settings.brand_icon ? (
                                    <div className="w-4 h-4 text-[#DD7809] flex items-center justify-center" dangerouslySetInnerHTML={{ __html: settings.brand_icon }} />
                                ) : (
                                    <div className="w-4 h-4 bg-gradient-to-tr from-[#DD7809] to-[#C74903] rounded-full"></div>
                                )}
                                {getSetting('brand_name', 'Jasomedia_')}
                            </div>
                            <p className="text-sm text-center md:text-left max-w-sm whitespace-pre-line text-gray-400">
                                {getSetting('company_address', 'Jl. Jenderal Sudirman No. 1, Jakarta Selatan')}
                            </p>
                        </div>
                        <nav className="flex flex-col items-center gap-y-4 text-sm font-medium">
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                                <Link href="/tentang" className="hover:text-white transition">Tentang Kami</Link>
                                <Link href="/faq" className="hover:text-white transition">FAQ</Link>
                                <a href="#services" className="hover:text-white transition">Layanan</a>
                                <a href="#catalog" className="hover:text-white transition">Katalog</a>
                            </div>
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                                <a href="#portfolio" className="hover:text-white transition">Karya</a>
                                <a href="#testimonials" className="hover:text-white transition">Testimoni</a>
                                <a href="#contact" className="hover:text-white transition">Kontak</a>
                            </div>
                        </nav>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm border-t border-white/5 pt-8 text-center md:text-left">
                        <p>&copy; {new Date().getFullYear()} {getSetting('footer_copyright', `${getSetting('brand_name', 'Jasomedia_')}. All rights reserved.`)}</p>
                        <div className="flex justify-center space-x-6">
                            <a href={getSetting('instagram_url', '#')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">Instagram</a>
                            <a href={getSetting('linkedin_url', '#')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">LinkedIn</a>
                            <a href={getSetting('tiktok_url', '#')} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">TikTok</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}





