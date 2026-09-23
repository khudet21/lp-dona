import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Tentang({ settings }) {
    const getSetting = (key, defaultValue) => {
        return settings[key] || defaultValue;
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-[#DD7809] selection:text-white">
            <Head title={`Tentang Kami - ${getSetting('brand_name', 'Jasomedia_')}`} />

            {/* Header / Navbar (Simplified) */}
            <header className="fixed w-full top-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
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
                        <Link href="/tentang" className="text-[#DD7809] font-bold">Tentang Kami</Link>
                        <Link href="/faq" className="text-gray-600 hover:text-[#DD7809] transition">FAQ</Link>
                        <a href="/#contact" className="px-5 py-2.5 bg-gradient-to-r from-[#DD7809] to-[#C74903] hover:from-[#C74903] hover:to-[#C74903] text-white rounded-full transition shadow-md shadow-[#DD7809]/20 font-bold">Hubungi Kami</a>
                    </nav>
                </div>
            </header>

            <main className="pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Hero Section */}
                    <div className="mb-20 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">{getSetting('about_hero_title', `Tentang ${getSetting('brand_name', 'Jasomedia_')}`)}</h1>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl whitespace-pre-wrap">
                            {getSetting('about_hero_subtitle', `${getSetting('brand_name', 'Jasomedia_')} hadir untuk membantu bisnis Anda tampil lebih profesional dan relevan di era digital. Dari strategi konten hingga eksekusi visual, kami memastikan pesan brand Anda sampai ke audiens yang tepat.`)}
                        </p>
                    </div>

                    <div className="space-y-20">
                        {/* Mengapa Jasomedia_ ada */}
                        <section>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{getSetting('about_story_title', `Mengapa ${getSetting('brand_name', 'Jasomedia_')} ada`)}</h2>
                            <div className="prose prose-lg text-gray-600 whitespace-pre-wrap">
                                {getSetting('about_story_content', `Titik awalnya sederhana: banyak pemilik UMKM dan perusahaan yang memiliki produk luar biasa, namun kesulitan menyampaikannya secara visual di media sosial. Mereka terjebak pada desain yang seadanya atau strategi marketing yang tidak konsisten.\n\nDari situ jelas apa yang harus dikerjakan: kami harus menjembatani gap antara kualitas produk dengan kualitas presentasi digital. ${getSetting('brand_name', 'Jasomedia_')} lahir bukan sekadar sebagai penyedia jasa desain, melainkan sebagai mitra kreatif yang ikut memikirkan pertumbuhan bisnis Anda.\n\nKami percaya bahwa memiliki identitas visual yang profesional dan konten yang menarik tidak harus selalu mahal dan rumit. Karena itu, kami merancang paket layanan yang transparan, terukur, dan berorientasi pada hasil nyata.`)}
                            </div>
                        </section>

                        {/* Prinsip yang kami pegang */}
                        <section>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{getSetting('principles_title', 'Prinsip yang kami pegang')}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {(() => {
                                    let principlesList = [];
                                    try {
                                        if (settings.principles) {
                                            principlesList = typeof settings.principles === 'string' ? JSON.parse(settings.principles) : settings.principles;
                                        }
                                    } catch(e) {}
                                    
                                    if (!Array.isArray(principlesList) || principlesList.length === 0) {
                                        return <p className="text-gray-500">Belum ada prinsip yang ditambahkan.</p>;
                                    }

                                    return principlesList.map((principle, index) => (
                                        <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
                                            {principle.icon && (
                                                <div 
                                                    className="w-12 h-12 bg-orange-100 text-[#DD7809] rounded-2xl flex items-center justify-center mb-6"
                                                    dangerouslySetInnerHTML={{ __html: principle.icon }}
                                                />
                                            )}
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">{principle.title}</h3>
                                            <p className="text-gray-600">{principle.description}</p>
                                        </div>
                                    ));
                                })()}
                            </div>
                        </section>

                        {/* Untuk Siapa */}
                        <section>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{getSetting('target_audience_title', 'Untuk siapa')}</h2>
                            <div className="prose prose-lg text-gray-600" dangerouslySetInnerHTML={{ __html: getSetting('target_audience', '') }} />
                        </section>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-24 bg-gradient-to-br from-[#1c0d03] to-[#140902] rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
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






