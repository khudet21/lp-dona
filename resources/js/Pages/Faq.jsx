import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Faq({ settings }) {
    const getSetting = (key, defaultValue) => {
        return settings[key] || defaultValue;
    };

    const defaultFaqs = [
        {
            question: "Berapa lama proses pengerjaan desain/project?",
            answer: "Waktu pengerjaan bergantung pada kompleksitas paket yang Anda pilih. Untuk desain standar atau sosial media biasanya memakan waktu 3-7 hari kerja. Sedangkan untuk project kompleks seperti video production atau rebranding menyeluruh, bisa memakan waktu 2-4 minggu."
        },
        {
            question: "Apakah ada batasan revisi?",
            answer: "Ya, setiap paket memiliki batas revisi wajar (biasanya 2-3 kali revisi minor). Untuk paket Corporate/Custom, kami menyediakan skema revisi yang lebih fleksibel (unlimited design revision pada tahap tertentu) sesuai kesepakatan kontrak."
        },
        {
            question: "Bagaimana sistem pembayarannya?",
            answer: "Kami menerapkan sistem pembayaran Down Payment (DP) sebesar 50% di awal sebelum project dimulai, dan pelunasan 50% sisanya setelah project selesai dan disetujui, sebelum penyerahan final file."
        },
        {
            question: "Apakah saya mendapatkan file mentah (source file)?",
            answer: "Ya, kami akan memberikan source file (seperti .PSD, .AI, atau .FIG) beserta file ekspor (.PNG/.JPG/.PDF) pada akhir masa project untuk paket-paket tertentu yang mencakup pengiriman source file."
        },
        {
            question: "Apakah Jasomedia_ bisa membantu strategi iklan (Ads)?",
            answer: "Tentu! Kami memiliki tim khusus untuk Ads Management (Meta Ads, Google Ads, TikTok Ads) yang akan membantu merancang strategi kampanye, alokasi budget, hingga eksekusi dan pelaporan performa iklan Anda."
        }
    ];

    let faqsList = defaultFaqs;
    try {
        if (settings.faqs) {
            const parsedFaqs = typeof settings.faqs === 'string' ? JSON.parse(settings.faqs) : settings.faqs;
            if (Array.isArray(parsedFaqs) && parsedFaqs.length > 0) {
                faqsList = parsedFaqs;
            }
        }
    } catch(e) {}

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-[#DD7809] selection:text-white">
            <Head title={`FAQ - ${getSetting('brand_name', 'Jasomedia_')}`} />

            {/* Header / Navbar */}
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
                        <Link href="/tentang" className="text-gray-600 hover:text-[#DD7809] transition">Tentang Kami</Link>
                        <Link href="/faq" className="text-[#DD7809] font-bold">FAQ</Link>
                        <a href="/#contact" className="px-5 py-2.5 bg-gradient-to-r from-[#DD7809] to-[#C74903] hover:from-[#C74903] hover:to-[#C74903] text-white rounded-full transition shadow-md shadow-[#DD7809]/20 font-bold">Hubungi Kami</a>
                    </nav>
                </div>
            </header>

            <main className="pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Hero Section */}
                    <div className="mb-16 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">{getSetting('faq_hero_title', 'Pertanyaan Populer (FAQ)')}</h1>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-2xl whitespace-pre-wrap">
                            {getSetting('faq_hero_subtitle', 'Temukan jawaban cepat atas pertanyaan-pertanyaan yang paling sering ditanyakan oleh klien-klien kami.')}
                        </p>
                    </div>

                    {/* FAQ Accordions */}
                    <div className="space-y-4 mb-24">
                        {faqsList.map((faq, index) => (
                            <details key={index} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer font-bold text-lg md:text-xl text-gray-900 hover:text-[#DD7809] transition">
                                    <span>{faq.question}</span>
                                    <span className="transition group-open:rotate-180 bg-gray-50 text-gray-400 p-2 rounded-full shrink-0">
                                        <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><polyline points="6 9 12 15 18 9" /></svg>
                                    </span>
                                </summary>
                                <div className="px-6 md:px-8 pb-8 text-gray-600 text-lg leading-relaxed border-t border-gray-50 pt-4">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-24 bg-gradient-to-br from-[#1c0d03] to-[#140902] rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Masih punya pertanyaan?</h2>
                            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">Kami siap membantu! Jangan ragu untuk menghubungi kami secara langsung. Tim kami akan segera membalas pesan Anda.</p>
                            <a href="/#contact" className="inline-block px-8 py-4 bg-gradient-to-r from-[#DD7809] to-[#C74903] hover:from-[#C74903] hover:to-[#C74903] text-white font-bold rounded-xl transition shadow-lg text-lg">Hubungi Kami Sekarang</a>
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



