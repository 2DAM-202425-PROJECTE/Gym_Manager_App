<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClaseController;
use App\Http\Controllers\MembresiaController;
use App\Http\Controllers\TarifaController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
*/

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::get('my_info', [UserController::class, 'my_info']);
});

Route::apiResource('tarifas', TarifaController::class);

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::middleware(['auth', 'can:admin'])->group(function () {
        Route::apiResource('tarifas', TarifaController::class);
    });
});

Route::middleware('auth:sanctum')->apiResource('membresias', MembresiaController::class);

Route::middleware('auth:sanctum')->apiResource('clases', ClaseController::class);

Route::get('users/{id}/membresia', [UserController::class, 'membresia']);

Route::post('membresia/admin/{id}', [MembresiaController::class, 'from_admin']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('clases/inscribir/{id}', [ClaseController::class, 'inscribir']);
    Route::post('clases/desinscribir/{id}', [ClaseController::class, 'desinscribir']);
});

Route::post('membresia/admin/{id}', [MembresiaController::class, 'create_admin_membresia']);
