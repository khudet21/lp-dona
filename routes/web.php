<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

function get_shared_settings() {
    $settings = \App\Models\Setting::pluck('setting_value', 'setting_key')->toArray();
    
    if (isset($settings['principles'])) {
        $principles = json_decode($settings['principles'], true);
        if (is_array($principles)) {
            foreach ($principles as &$principle) {
                if (!empty($principle['icon']) && !str_contains($principle['icon'], '<svg')) {
                    try {
                        $principle['icon'] = svg($principle['icon'], 'w-6 h-6')->toHtml();
                    } catch (\Exception $e) {}
                }
            }
            $settings['principles'] = $principles;
        }
    }

    if (!empty($settings['brand_icon']) && !str_contains($settings['brand_icon'], '<svg')) {
        try {
            $settings['brand_icon'] = svg($settings['brand_icon'], 'w-8 h-8')->toHtml();
        } catch (\Exception $e) {}
    }
    
    return $settings;
}

Route::get('/', function () {
    $services = \App\Models\Service::orderBy('sort_order')->get()->map(function ($service) {
        if ($service->icon_url) {
            try {
                $service->icon_svg = svg($service->icon_url, 'w-7 h-7')->toHtml();
            } catch (\Exception $e) {
                $service->icon_svg = null;
            }
        }
        return $service;
    });
    $portfolios = \App\Models\Portfolio::latest()->take(2)->get();
    $testimonials = \App\Models\Testimonial::latest()->take(10)->get();
    $settings = get_shared_settings();
    $products = \App\Models\Product::where('is_active', true)->get();

    return Inertia::render('Welcome', [
        'services' => $services,
        'portfolios' => $portfolios,
        'testimonials' => $testimonials,
        'settings' => $settings,
        'products' => $products,
    ]);
});

Route::get('/karya', function () {
    $portfolios = \App\Models\Portfolio::latest()->get();
    $settings = get_shared_settings();
    return Inertia::render('Karya', [
        'portfolios' => $portfolios,
        'settings' => $settings
    ]);
});

Route::get('/tentang', function () {
    $settings = get_shared_settings();
    return Inertia::render('Tentang', [
        'settings' => $settings
    ]);
});

Route::get('/faq', function () {
    $settings = get_shared_settings();
    return Inertia::render('Faq', [
        'settings' => $settings
    ]);
});



Route::post('/leads', function (Illuminate\Http\Request $request) {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255',
        'requirements' => 'required|string',
    ]);
    
    \App\Models\Lead::create($validated);
    
    return back()->with('success', 'Pesan berhasil terkirim!');
});

Route::get('/dashboard', function () {
    return redirect('/admin');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
