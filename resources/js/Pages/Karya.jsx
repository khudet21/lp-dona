import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';

export default function Karya({ portfolios, settings = {} }) {
    const getSetting = (key, defaultValue = '') => {
        return settings[key] || defaultValue;
    };

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F8FAFC] selection:bg-[#DD7809] selection:text-white font-sans text-gray-900">
            <Head title={`FAQ - ${getSetting('brand_name', 'Jasomedia_')}`} />

            {/* Navbar (Same as Tentang) */}
            <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900 group">
                        {settings.brand_icon ? (
                            <div className="w-5 h-5 text-[#DD7809] flex items-center justify-center group-hover:scale-110 transition-transform" dangerouslySetInnerHTML={{ __html: settings.brand_icon }} />
                        ) : (
                            <div className="w-5 h-5 bg-gradient-to-tr from-[#DD7809] to-[#C74903] rounded-full group-hover:scale-110 transition-transform"></div>
                        )}
                        {getSetting('brand_name', 'Jasomedia_')}
                    </Link>
                    <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
                        <Link href="/" className="text-gray-600 hover:text-[#DD7809] transition">Beranda</Link>
                        <Link href="/tentang" className="text-gray-600 hover:text-[#DD7809] transition">Tentang Kami</Link>
                        <Link href="/faq" className="text-gray-600 hover:text-[#DD7809] transition">FAQ</Link>
                        <a href="/#contact" className="px-5 py-2.5 bg-gradient-to-r from-[#DD7809] to-[#C74903] hover:from-[#C74903] hover:to-[#C74903] text-white rounded-full transition shadow-md shadow-[#DD7809]/20 font-bold">Hubungi Kami</a>
                    </nav>
                </div>
            </header>

            <main className="pt-32 pb-24">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Header Section */}
                    <div className="mb-16 text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">{getSetting('portfolio_title', 'Karya Terbaik')}</h1>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto whitespace-pre-wrap">
                            {getSetting('portfolio_subtitle', 'Dari kampanye sosial media hingga identitas visual, lihat bagaimana kami membantu klien mencapai tujuan bisnis mereka.')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolios && portfolios.length > 0 ? (
                            portfolios.map((portfolio) => (
                                <div key={portfolio.id} className="group relative overflow-hidden rounded-3xl shadow-sm border border-gray-100 bg-white cursor-pointer hover:shadow-md transition">
                                    <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                                        <img src={portfolio.image_url ? (portfolio.image_url.startsWith('http') ? portfolio.image_url : `/storage/${portfolio.image_url}`) : 'https://via.placeholder.com/600x400?text=Portfolio'} alt={portfolio.title} className="object-cover w-full h-56 sm:h-64 group-hover:scale-105 transition duration-500" />
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
                            ))
                        ) : (
                            <div className="col-span-full">
                                <p className="text-gray-500 bg-white p-8 rounded-3xl text-center border border-gray-100">Belum ada karya yang diunggah.</p>
                            </div>
                        )}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-24 bg-gradient-to-br from-[#1c0d03] to-[#140902] rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap berkolaborasi bersama kami?</h2>
                            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">Konsultasikan kebutuhan digital brand Anda. Gratis konsultasi awal tanpa komitmen finansial apa pun.</p>
                            <a href="/#contact" className="inline-block px-8 py-4 bg-gradient-to-r from-[#DD7809] to-[#C74903] hover:from-[#C74903] hover:to-[#C74903] text-white font-bold rounded-xl transition shadow-lg text-lg">Mulai Diskusi Proyek</a>
                        </div>
                    </div>
                    
                    <div className="mt-12 text-center">
                        <Link href="/" className="inline-flex items-center text-gray-500 hover:text-[#DD7809] font-medium transition">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Kembali ke Beranda
                        </Link>
                    </div>
                </div>
            </main>

            {/* Simple Footer */}
            <footer className="bg-[#140902] py-8 text-center border-t border-white/5">
                <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} {getSetting('footer_copyright', `${getSetting('brand_name', 'Jasomedia_')}. All rights reserved.`)}</p>
            </footer>
        </div>
    );
}



