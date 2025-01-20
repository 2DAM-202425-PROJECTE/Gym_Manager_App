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
            'name' => 'Florian',
            'email' => 'florian@example.com',
            'password' => 'Contraseña',
        ];

        $response = $this->postJson('/api/users', $data);

        $response->assertStatus(201);
        $response->assertJson([
                'name' => 'Florian',
                'email' => 'florian@example.com',
        ]);
        $this->assertDatabaseHas('users', [
            'email' => 'florian@example.com',
        ]);
    }
    /** @test */
    public function it_can_list_users()
    {
        User::factory()->count(3)->create();

        $response = $this->getJson('/api/users');

        $response->assertStatus(200);
        $response->assertJsonCount(3);
    }

    /** @test */
    public function it_can_show_a_user()
    {
        $user = User::factory()->create();

        $response = $this->getJson('/api/users/' . $user->id);

        $response->assertStatus(200);
        $response->assertJson([
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
        ]);
    }
    /** @test */
    public function it_can_update_a_user()
    {
        $user = User::factory()->create();
        $newData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ];

        $response = $this->putJson('/api/users/' . $user->id, $newData);

        $response->assertStatus(200);
        $response->assertJson([
                'name' => 'Updated Name',
                'email' => 'updated@example.com',
        ]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ]);
    }
    /** @test */
    public function it_can_delete_a_user()
    {
        $user = User::factory()->create();

        $response = $this->deleteJson('/api/users/' . $user->id);

        $response->assertStatus(204);

        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    }



}
