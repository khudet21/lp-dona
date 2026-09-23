<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Forms\Components\Section;

class LandingPageSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-window';
    protected static ?string $navigationLabel = 'Atur Landing Page';
    protected static ?string $title = 'Pengaturan Landing Page';
    protected static string | \UnitEnum | null $navigationGroup = 'Tampilan';
    protected static ?int $navigationSort = 1;
    protected \Filament\Support\Enums\Width|string|null $maxContentWidth = 'full';
    protected string $view = 'filament.pages.landing-page-settings';

    public ?array $data = [];

    public function mount(): void
    {
        $settings = Setting::pluck('setting_value', 'setting_key')->toArray();

        $this->form->fill([
            'brand_icon' => $settings['brand_icon'] ?? null,
            'brand_name' => $settings['brand_name'] ?? null,
            'favicon' => $settings['favicon'] ?? null,
            'primary_color' => $settings['primary_color'] ?? '#DD7809',
            'bg_color' => $settings['bg_color'] ?? '#F8FAFC',
            'bg_alt_color' => $settings['bg_alt_color'] ?? '#F1F5F9',
            'text_color' => $settings['text_color'] ?? '#0F172A',
            'text_muted_color' => $settings['text_muted_color'] ?? '#475569',
            'form_bg_color' => $settings['form_bg_color'] ?? '#020617',
            'footer_bg_color' => $settings['footer_bg_color'] ?? '#020617',
            'hero_image' => $settings['hero_image'] ?? null,
            'hero_label' => $settings['hero_label'] ?? null,
            'hero_title' => $settings['hero_title'] ?? null,
            'hero_subtitle' => $settings['hero_subtitle'] ?? null,
            'hero_cta_1' => $settings['hero_cta_1'] ?? null,
            'hero_cta_2' => $settings['hero_cta_2'] ?? null,
            'hero_feature_1' => $settings['hero_feature_1'] ?? null,
            'hero_feature_2' => $settings['hero_feature_2'] ?? null,
            'hero_feature_3' => $settings['hero_feature_3'] ?? null,
            
            'services_title' => $settings['services_title'] ?? null,
            'services_subtitle' => $settings['services_subtitle'] ?? null,
            'services_cta' => $settings['services_cta'] ?? null,
            
            'catalog_title' => $settings['catalog_title'] ?? null,
            'catalog_subtitle' => $settings['catalog_subtitle'] ?? null,
            
            'portfolio_title' => $settings['portfolio_title'] ?? null,
            'portfolio_subtitle' => $settings['portfolio_subtitle'] ?? null,
            'portfolio_cta' => $settings['portfolio_cta'] ?? null,
            
            'testimonial_title' => $settings['testimonial_title'] ?? null,
            'testimonial_subtitle' => $settings['testimonial_subtitle'] ?? null,
            
            'cta_title' => $settings['cta_title'] ?? null,
            'cta_subtitle' => $settings['cta_subtitle'] ?? null,
            
            'company_address' => $settings['company_address'] ?? null,
            'whatsapp_number' => $settings['whatsapp_number'] ?? null,
            'tiktok_url' => $settings['tiktok_url'] ?? null,
            'instagram_url' => $settings['instagram_url'] ?? null,
            'linkedin_url' => $settings['linkedin_url'] ?? null,
            'footer_copyright' => $settings['footer_copyright'] ?? null,
            
            'about_hero_title' => $settings['about_hero_title'] ?? null,
            'about_hero_subtitle' => $settings['about_hero_subtitle'] ?? null,
            'about_story_title' => $settings['about_story_title'] ?? null,
            'about_story_content' => $settings['about_story_content'] ?? null,
            
            'faq_hero_title' => $settings['faq_hero_title'] ?? null,
            'faq_hero_subtitle' => $settings['faq_hero_subtitle'] ?? null,
            'faqs' => isset($settings['faqs']) ? json_decode($settings['faqs'], true) : [],
            'principles_title' => $settings['principles_title'] ?? null,
            'principles' => isset($settings['principles']) ? json_decode($settings['principles'], true) : [],
            'target_audience_title' => $settings['target_audience_title'] ?? null,
            'target_audience' => $settings['target_audience'] ?? null,
        ]);
    }

    public function form(\Filament\Schemas\Schema $form): \Filament\Schemas\Schema
    {
        return $form
            ->schema([
                \Filament\Schemas\Components\Tabs::make('Tabs')
                    ->tabs([
                        \Filament\Schemas\Components\Tabs\Tab::make('Tema')
                            ->schema([
                                \Filament\Forms\Components\ToggleButtons::make('brand_icon')
                                    ->label('Logo/Icon Navbar')
                                    ->options([
                                        'heroicon-o-fire' => '',
                                        'heroicon-o-sparkles' => '',
                                        'heroicon-o-cube-transparent' => '',
                                        'heroicon-o-bolt' => '',
                                        'heroicon-o-globe-alt' => '',
                                        'heroicon-o-star' => '',
                                    ])
                                    ->icons([
                                        'heroicon-o-fire' => 'heroicon-o-fire',
                                        'heroicon-o-sparkles' => 'heroicon-o-sparkles',
                                        'heroicon-o-cube-transparent' => 'heroicon-o-cube-transparent',
                                        'heroicon-o-bolt' => 'heroicon-o-bolt',
                                        'heroicon-o-globe-alt' => 'heroicon-o-globe-alt',
                                        'heroicon-o-star' => 'heroicon-o-star',
                                    ])
                                    ->columns(3)
                                    ->nullable(),
                                \Filament\Forms\Components\TextInput::make('brand_name')
                                    ->label('Teks Nama Brand')
                                    ->placeholder('Jasomedia_'),
                                \Filament\Forms\Components\FileUpload::make('favicon')
                                    ->label('Favicon (Icon Tab Browser)')
                                    ->image()
                                    ->directory('settings')
                                    ->nullable(),
                                \Filament\Forms\Components\ColorPicker::make('primary_color')
                                    ->label('Warna Utama (Aksen)')
                                    ->default('#DD7809'),
                                \Filament\Forms\Components\ColorPicker::make('bg_color')
                                    ->label('Warna Background Utama')
                                    ->default('#F8FAFC'),
                                \Filament\Forms\Components\ColorPicker::make('bg_alt_color')
                                    ->label('Warna Background Sekunder')
                                    ->default('#F1F5F9'),
                                \Filament\Forms\Components\ColorPicker::make('text_color')
                                    ->label('Warna Teks Utama')
                                    ->default('#0F172A'),
                                \Filament\Forms\Components\ColorPicker::make('text_muted_color')
                                    ->label('Warna Teks Deskripsi')
                                    ->default('#475569'),
                                \Filament\Forms\Components\ColorPicker::make('form_bg_color')
                                    ->label('Warna Background Form Kontak')
                                    ->default('#020617'),
                                \Filament\Forms\Components\ColorPicker::make('footer_bg_color')
                                    ->label('Warna Background Footer')
                                    ->default('#020617'),
                            ])->columns(3),
                        \Filament\Schemas\Components\Tabs\Tab::make('Hero')
                            ->schema([
                                \Filament\Forms\Components\FileUpload::make('hero_image')
                                    ->label('Gambar Banner Hero')
                                    ->image()
                                    ->imageEditor()
                                    
                                    ->directory('settings')
                                    ->nullable(),
                                TextInput::make('hero_label')->label('Label Kecil (Atas)')->placeholder('Digital Agency · Creative Studio'),
                                TextInput::make('hero_title')->label('Judul Utama')->placeholder('Tingkatkan Kehadiran Digital Brand Anda'),
                                Textarea::make('hero_subtitle')->label('Sub Judul')->rows(3),
                                TextInput::make('hero_cta_1')->label('Teks Tombol 1')->placeholder('Mulai sekarang'),
                                TextInput::make('hero_cta_2')->label('Teks Tombol 2')->placeholder('Lihat katalog'),
                                TextInput::make('hero_feature_1')->label('Fitur 1')->placeholder('Strategi Akurat'),
                                TextInput::make('hero_feature_2')->label('Fitur 2')->placeholder('Visual Memukau'),
                                TextInput::make('hero_feature_3')->label('Fitur 3')->placeholder('Support Terbaik'),
                            ]),
                        \Filament\Schemas\Components\Tabs\Tab::make('Layanan')
                            ->schema([
                                TextInput::make('services_title')->label('Judul Section')->placeholder('Yang Anda dapat'),
                                Textarea::make('services_subtitle')->label('Sub Judul')->rows(2),
                                TextInput::make('services_cta')->label('Teks Tombol CTA')->placeholder('Mulai proyek'),
                            ]),
                        \Filament\Schemas\Components\Tabs\Tab::make('Katalog & Karya')
                            ->schema([
                                TextInput::make('catalog_title')->label('Judul Katalog')->placeholder('Katalog Paket'),
                                Textarea::make('catalog_subtitle')->label('Sub Judul Katalog')->rows(2),
                                TextInput::make('portfolio_title')->label('Judul Karya')->placeholder('Karya Terbaik'),
                                Textarea::make('portfolio_subtitle')->label('Sub Judul Karya')->rows(2),
                                TextInput::make('portfolio_cta')->label('Teks Link Karya')->placeholder('Lihat semua karya'),
                            ]),
                        \Filament\Schemas\Components\Tabs\Tab::make('Testimoni & CTA Akhir')
                            ->schema([
                                TextInput::make('testimonial_title')->label('Judul Testimoni')->placeholder('Testimoni Klien'),
                                Textarea::make('testimonial_subtitle')->label('Sub Judul Testimoni')->rows(2),
                                TextInput::make('cta_title')->label('Judul CTA Akhir')->placeholder('Mulai digitalisasi bisnis Anda hari ini.'),
                                Textarea::make('cta_subtitle')->label('Sub Judul CTA Akhir')->rows(2),
                            ]),
                            \Filament\Schemas\Components\Tabs\Tab::make('Tentang Kami')
                                ->schema([
                                    TextInput::make('about_hero_title')->label('Judul Hero')->placeholder('Tentang Jasomedia_'),
                                    Textarea::make('about_hero_subtitle')->label('Sub Judul Hero')->rows(2),
                                    TextInput::make('about_story_title')->label('Judul Cerita/Sejarah')->placeholder('Mengapa Jasomedia_ ada'),
                                    Textarea::make('about_story_content')->label('Konten Cerita')->rows(4),
                                    TextInput::make('principles_title')->label('Judul Bagian Prinsip')->placeholder('Prinsip yang kami pegang'),
                                    \Filament\Forms\Components\Repeater::make('principles')
                                        ->label('Daftar Prinsip')
                                        ->schema([
                                            TextInput::make('title')->label('Judul Prinsip')->required(),
                                            Textarea::make('description')->label('Deskripsi')->required()->rows(3),
                                            \Filament\Forms\Components\ToggleButtons::make('icon')
                                                ->label('Pilih Icon')
                                                ->options([
                                                    'heroicon-o-bolt' => 'Cepat',
                                                    'heroicon-o-currency-dollar' => 'Harga',
                                                    'heroicon-o-adjustments-horizontal' => 'Kustom',
                                                    'heroicon-o-users' => 'Kemitraan',
                                                    'heroicon-o-star' => 'Bintang',
                                                    'heroicon-o-shield-check' => 'Aman',
                                                    'heroicon-o-heart' => 'Peduli',
                                                    'heroicon-o-check-circle' => 'Oke',
                                                ])
                                                ->icons([
                                                    'heroicon-o-bolt' => 'heroicon-o-bolt',
                                                    'heroicon-o-currency-dollar' => 'heroicon-o-currency-dollar',
                                                    'heroicon-o-adjustments-horizontal' => 'heroicon-o-adjustments-horizontal',
                                                    'heroicon-o-users' => 'heroicon-o-users',
                                                    'heroicon-o-star' => 'heroicon-o-star',
                                                    'heroicon-o-shield-check' => 'heroicon-o-shield-check',
                                                    'heroicon-o-heart' => 'heroicon-o-heart',
                                                    'heroicon-o-check-circle' => 'heroicon-o-check-circle',
                                                ])
                                                ->columns(4)
                                                ->nullable(),
                                        ])
                                        ->addActionLabel('Tambah Prinsip')
                                        ->reorderableWithButtons()
                                        ->collapsible()
                                        ->defaultItems(0),
                                    TextInput::make('target_audience_title')->label('Judul Bagian "Untuk Siapa"')->placeholder('Untuk siapa'),
                                    Textarea::make('target_audience')
                                        ->label('Konten "Untuk Siapa"')
                                        ->rows(4)
                                        ->placeholder('Gunakan tag HTML dasar seperti <p> jika perlu...'),
                                ]),
                        \Filament\Schemas\Components\Tabs\Tab::make('FAQ')
                            ->schema([
                                TextInput::make('faq_hero_title')->label('Judul Utama FAQ')->placeholder('Pertanyaan Populer (FAQ)'),
                                Textarea::make('faq_hero_subtitle')->label('Sub Judul FAQ')->rows(2),
                                \Filament\Forms\Components\Repeater::make('faqs')
                                    ->label('Daftar FAQ')
                                    ->schema([
                                        TextInput::make('question')->label('Pertanyaan')->required(),
                                        Textarea::make('answer')->label('Jawaban')->required()->rows(3),
                                    ])
                                    ->addActionLabel('Tambah FAQ')
                                    ->reorderableWithButtons()
                                    ->collapsible()
                                    ->defaultItems(0),
                            ]),
                        \Filament\Schemas\Components\Tabs\Tab::make('Kontak & Footer')
                            ->schema([
                                \Filament\Forms\Components\Textarea::make('company_address')->label('Alamat Kantor')->rows(3)->placeholder('Jl. Jenderal Sudirman...'),
                                TextInput::make('whatsapp_number')->label('Nomor WhatsApp')->placeholder('62813...'),
                                TextInput::make('instagram_url')->label('Link Instagram Footer')->url(),
                                TextInput::make('tiktok_url')->label('Link TikTok Footer')->url(),
                                TextInput::make('linkedin_url')->label('Link LinkedIn Footer')->url(),
                                TextInput::make('footer_copyright')->label('Teks Copyright Footer')->placeholder('Jasomedia_. All rights reserved.'),
                            ]),
                    ])
                    ->columnSpanFull()
            ])
            ->statePath('data');
    }

    public function resetThemeSettings(): void
    {
        $themeKeys = [
            'primary_color',
            'bg_color',
            'bg_alt_color',
            'text_color',
            'text_muted_color',
            'form_bg_color',
            'footer_bg_color',
            'brand_icon'
        ];

        Setting::whereIn('setting_key', $themeKeys)->delete();

        Notification::make()
            ->title('Tema Di-reset!')
            ->body('Warna dan tema telah dikembalikan ke default awal (Orange).')
            ->success()
            ->send();

        redirect()->to(request()->header('Referer'));
    }

    public function save(): void
    {
        $data = $this->form->getState();

        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $value = json_encode($value);
            }
            Setting::updateOrCreate(
                ['setting_key' => $key],
                ['setting_value' => $value ?? '']
            );
        }

        Notification::make()
            ->title('Berhasil!')
            ->body('Perubahan landing page telah disimpan dan langsung aktif.')
            ->success()
            ->send();
    }
}

