<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = [];

    protected static function booted()
    {
        static::deleting(function ($product) {
            if ($product->image) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($product->image);
            }
        });

        static::updating(function ($product) {
            if ($product->isDirty('image') && $product->getOriginal('image')) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($product->getOriginal('image'));
            }
        });
    }
}
