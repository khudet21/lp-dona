<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ServiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_can_create_a_service(): void
    {
        // Menyusun (Arrange): Kita buat data simulasi (factory) untuk Service
        $service = \App\Models\Service::factory()->create([
            'title' => 'Social Media Management',
            'description' => 'Membantu mengelola akun media sosial klien.',
        ]);

        // Bertindak (Act): Kita cek apakah data tersebut benar-benar tersimpan di database
        $exists = \App\Models\Service::where('title', 'Social Media Management')->exists();

        // Menegaskan (Assert): Harus bernilai benar
        $this->assertTrue($exists);
        
        // Memastikan juga struktur kolomnya sesuai di tabel
        $this->assertDatabaseHas('services', [
            'title' => 'Social Media Management',
            'description' => 'Membantu mengelola akun media sosial klien.',
        ]);
    }
}
