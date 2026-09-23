<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    /** @use HasFactory<\Database\Factories\SettingFactory> */
    use HasFactory;

    protected $guarded = [];

    protected static function booted()
    {
        static::updating(function ($setting) {
            $imageKeys = ['hero_image', 'favicon'];
            if (in_array($setting->setting_key, $imageKeys) && $setting->isDirty('setting_value') && $setting->getOriginal('setting_value')) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($setting->getOriginal('setting_value'));
            }
        });

        static::deleting(function ($setting) {
            $imageKeys = ['hero_image', 'favicon'];
            if (in_array($setting->setting_key, $imageKeys) && $setting->setting_value) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($setting->setting_value);
            }
        });
    }
}
