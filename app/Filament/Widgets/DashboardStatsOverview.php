<?php

namespace App\Filament\Widgets;

use App\Models\Lead;
use App\Models\Portfolio;
use App\Models\Product;
use App\Models\Service;
use App\Models\Testimonial;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class DashboardStatsOverview extends BaseWidget
{
    // Optionally sort the widget on the dashboard
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        return [
            Stat::make('Katalog Produk', Product::count())
                ->description('Total paket/produk')
                ->descriptionIcon('heroicon-m-rectangle-stack')
                ->color('info'),

            Stat::make('Layanan', Service::count())
                ->description('Total layanan yang diberikan')
                ->descriptionIcon('heroicon-m-briefcase')
                ->color('primary'),

            Stat::make('Karya (Portfolio)', Portfolio::count())
                ->description('Total portfolio yang diunggah')
                ->descriptionIcon('heroicon-m-photo')
                ->color('success'),
                
            Stat::make('Testimoni', Testimonial::count())
                ->description('Total ulasan klien')
                ->descriptionIcon('heroicon-m-star')
                ->color('warning'),
                
            Stat::make('Pesan Masuk', Lead::count())
                ->description('Total konsultasi masuk')
                ->descriptionIcon('heroicon-m-envelope')
                ->color('info'),
        ];
    }
}
