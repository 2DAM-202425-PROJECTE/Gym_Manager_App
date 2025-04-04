<?php

namespace App\helpers;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesPermission
{
    public static function registerPolicies(): void
    {
        // Crear permisos solo si no existen
        $permissions = ['regular', 'admin', 'trainer'];
        foreach ($permissions as $permission) {
            if (!Permission::where('name', $permission)->where('guard_name', 'web')->exists()) {
                Permission::create(['name' => $permission, 'guard_name' => 'web']);
            }
        }

        // Recargar permisos desde la base de datos
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Crear roles y asignar permisos solo si no existen
        $admin = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $admin->syncPermissions(['regular', 'admin', 'trainer']); // syncPermissions asegura que existan

        $trainer = Role::firstOrCreate(['name' => 'trainer', 'guard_name' => 'web']);
        $trainer->syncPermissions(['regular', 'trainer']);

        $usuario = Role::firstOrCreate(['name' => 'regular', 'guard_name' => 'web']);
        $usuario->syncPermissions(['regular']);
    }
}
