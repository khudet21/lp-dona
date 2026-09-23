@php
    $brandName = 'Jasomedia_';
    $brandIcon = null;
    $primaryColor = '#DD7809';

    try {
        if (\Illuminate\Support\Facades\Schema::hasTable('settings')) {
            $brandName = \App\Models\Setting::where('setting_key', 'brand_name')->value('setting_value') ?: $brandName;
            $brandIcon = \App\Models\Setting::where('setting_key', 'brand_icon')->value('setting_value');
            $primaryColor = \App\Models\Setting::where('setting_key', 'primary_color')->value('setting_value') ?: $primaryColor;
        }
    } catch (\Exception $e) {}
@endphp

<div class="flex items-center gap-2 font-bold text-xl tracking-tight">
    @if ($brandIcon)
        <div style="color: {{ $primaryColor }}; width: 1.5rem; height: 1.5rem; display: flex; align-items: center; justify-content: center;">
            @svg($brandIcon, 'w-6 h-6')
        </div>
    @else
        <div style="width: 1.25rem; height: 1.25rem; border-radius: 9999px; background: linear-gradient(to top right, {{ $primaryColor }}, #C74903);"></div>
    @endif
    <span>{{ $brandName }}</span>
</div>
