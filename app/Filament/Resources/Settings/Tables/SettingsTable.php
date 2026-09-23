<?php

namespace App\Filament\Resources\Settings\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class SettingsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('setting_key')
                    ->label('Bagian')
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'hero_title' => 'Judul Utama (Paling Atas)',
                        'hero_subtitle' => 'Sub Judul (Paling Atas)',
                        'whatsapp_number' => 'Nomor WhatsApp',
                        'contact_email' => 'Email Kontak',
                        'about_text' => 'Teks Tentang Kami',
                        default => $state,
                    })
                    ->searchable(),
                TextColumn::make('setting_value')
                    ->label('Isi Tulisan')
                    ->limit(50)
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
                \Filament\Actions\DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
