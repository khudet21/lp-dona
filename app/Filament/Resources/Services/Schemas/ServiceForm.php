<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                Textarea::make('description')
                    ->required()
                    ->columnSpanFull(),
                \Filament\Forms\Components\ToggleButtons::make('icon_url')
                    ->label('Pilih Icon')
                    ->options([
                        'heroicon-o-globe-alt' => 'Website',
                        'heroicon-o-device-phone-mobile' => 'Mobile',
                        'heroicon-o-computer-desktop' => 'Desktop',
                        'heroicon-o-camera' => 'Camera',
                        'heroicon-o-video-camera' => 'Video',
                        'heroicon-o-megaphone' => 'Marketing',
                        'heroicon-o-pencil-square' => 'Design',
                        'heroicon-o-paint-brush' => 'Art',
                        'heroicon-o-code-bracket' => 'Code',
                        'heroicon-o-chart-bar' => 'Analytics',
                        'heroicon-o-shopping-bag' => 'E-Commerce',
                        'heroicon-o-sparkles' => 'Sparkles',
                        'heroicon-o-rocket-launch' => 'Rocket',
                        'heroicon-o-users' => 'Users',
                        'heroicon-o-cog' => 'Settings',
                        'heroicon-o-cube' => '3D / Cube',
                        'heroicon-o-cursor-arrow-rays' => 'Click',
                        'heroicon-o-document-text' => 'Content',
                        'heroicon-o-presentation-chart-bar' => 'Presentation',
                        'heroicon-o-chat-bubble-left-ellipsis' => 'Consulting'
                    ])
                    ->icons([
                        'heroicon-o-globe-alt' => 'heroicon-o-globe-alt',
                        'heroicon-o-device-phone-mobile' => 'heroicon-o-device-phone-mobile',
                        'heroicon-o-computer-desktop' => 'heroicon-o-computer-desktop',
                        'heroicon-o-camera' => 'heroicon-o-camera',
                        'heroicon-o-video-camera' => 'heroicon-o-video-camera',
                        'heroicon-o-megaphone' => 'heroicon-o-megaphone',
                        'heroicon-o-pencil-square' => 'heroicon-o-pencil-square',
                        'heroicon-o-paint-brush' => 'heroicon-o-paint-brush',
                        'heroicon-o-code-bracket' => 'heroicon-o-code-bracket',
                        'heroicon-o-chart-bar' => 'heroicon-o-chart-bar',
                        'heroicon-o-shopping-bag' => 'heroicon-o-shopping-bag',
                        'heroicon-o-sparkles' => 'heroicon-o-sparkles',
                        'heroicon-o-rocket-launch' => 'heroicon-o-rocket-launch',
                        'heroicon-o-users' => 'heroicon-o-users',
                        'heroicon-o-cog' => 'heroicon-o-cog',
                        'heroicon-o-cube' => 'heroicon-o-cube',
                        'heroicon-o-cursor-arrow-rays' => 'heroicon-o-cursor-arrow-rays',
                        'heroicon-o-document-text' => 'heroicon-o-document-text',
                        'heroicon-o-presentation-chart-bar' => 'heroicon-o-presentation-chart-bar',
                        'heroicon-o-chat-bubble-left-ellipsis' => 'heroicon-o-chat-bubble-left-ellipsis'
                    ])
                    ->columns(4)
                    ->gridDirection('row')
                    ->default(null),
            ]);
    }
}
