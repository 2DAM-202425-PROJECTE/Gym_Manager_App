<?php

use App\Http\Controllers\AuthController;
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

Route::apiResource('users', UserController::class);
Route::apiResource('tarifas', TarifaController::class);

Route::get('users/{id}/membresia', [UserController::class, 'membresia']);
Route::apiResource('membresias', MembresiaController::class);
