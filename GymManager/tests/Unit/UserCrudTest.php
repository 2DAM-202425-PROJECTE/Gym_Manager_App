<?php
namespace Tests\Unit;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserCrudTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_create_a_user()
    {
        $data = [
            'name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'password' => 'password123',
        ];

        $response = $this->postJson('users', $data);

        $response->assertStatus(201);
        $response->assertJson([
            'data' => [
                'name' => 'John Doe',
                'email' => 'johndoe@example.com',
            ],
        ]);

        // Verificar que el usuario está en la base de datos
        $this->assertDatabaseHas('users', [
            'email' => 'johndoe@example.com',
        ]);
    }
    public function it_can_list_users()
    {
        // Arrange: Crear usuarios
        User::factory()->count(3)->create();

        // Act: Solicitar la lista de usuarios
        $response = $this->getJson('/api/users');

        // Assert: Verificar que la respuesta tiene un status 200
        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
    }

    public function it_can_show_a_user()
    {
        // Arrange: Crear un usuario
        $user = User::factory()->create();

        // Act: Solicitar información sobre ese usuario
        $response = $this->getJson('/api/users/' . $user->id);

        // Assert: Verificar que la respuesta tiene el status 200 y los datos correctos
        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ],
        ]);
    }

    /** @test */
    public function it_can_update_a_user()
    {
        // Arrange: Crear un usuario
        $user = User::factory()->create();
        $newData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ];

        // Act: Enviar una solicitud PUT para actualizar el usuario
        $response = $this->putJson('/api/users/' . $user->id, $newData);

        // Assert: Verificar que la respuesta tiene el status 200
        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'name' => 'Updated Name',
                'email' => 'updated@example.com',
            ],
        ]);

        // Verificar que los datos del usuario fueron actualizados en la base de datos
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ]);
    }

    /** @test */
    public function it_can_delete_a_user()
    {
        // Arrange: Crear un usuario
        $user = User::factory()->create();

        // Act: Enviar una solicitud DELETE para eliminar el usuario
        $response = $this->deleteJson('/api/users/' . $user->id);

        // Assert: Verificar que la respuesta tiene el status 200
        $response->assertStatus(200);

        // Verificar que el usuario fue eliminado de la base de datos
        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    }
}
