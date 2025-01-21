<?php
namespace Tests\Feature;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_can_login_with_correct_credentials()
    {

        $user = User::factory()->create([
            'password' => Hash::make('password123'),
        ]);

        $loginData = [
            'email' => $user->email,
            'password' => 'password123',
        ];

        $response = $this->postJson('/api/login', $loginData);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'token',
        ]);
    }

    #[Test]
    public function it_cannot_login_with_incorrect_credentials()
    {
        // Intentar hacer login con credenciales incorrectas
        $loginData = [
            'email' => 'nonexistentuser@example.com',  // Usuario inexistente
            'password' => 'wrongpassword',             // Contraseña incorrecta
        ];

        $response = $this->postJson('/api/login', $loginData);

        // Verificar que el login falla y que el status es 401 (no autorizado)
        $response->assertStatus(401);
        $response->assertJson([
            'message' => 'Unauthorized',
        ]);
    }
}
