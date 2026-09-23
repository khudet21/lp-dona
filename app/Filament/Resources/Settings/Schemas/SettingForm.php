<?php

namespace App\Filament\Resources\Settings\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class SettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\Select::make('setting_key')
                    ->label('Bagian yang ingin diubah')
                    ->options([
                        'hero_title' => 'Judul Utama (Paling Atas)',
                        'hero_subtitle' => 'Sub Judul (Paling Atas)',
                        'whatsapp_number' => 'Nomor WhatsApp (Contoh: 628139...)',
                        'contact_email' => 'Email Kontak',
                        'about_text' => 'Teks Tentang Kami (Deskripsi Bawah)',
                    ])
                    ->required(),
                Textarea::make('setting_value')
                    ->label('Isi Tulisan / Nilai')
                    ->default(null)
                    ->columnSpanFull(),
            ]);
    }
}
