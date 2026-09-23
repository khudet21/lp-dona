<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    /** @use HasFactory<\Database\Factories\PortfolioFactory> */
    use HasFactory;

    protected $guarded = [];

    protected static function booted()
    {
        static::deleting(function ($portfolio) {
            if ($portfolio->image_url) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($portfolio->image_url);
            }
        });

        static::updating(function ($portfolio) {
            if ($portfolio->isDirty('image_url') && $portfolio->getOriginal('image_url')) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($portfolio->getOriginal('image_url'));
            }
        });
    }
}
