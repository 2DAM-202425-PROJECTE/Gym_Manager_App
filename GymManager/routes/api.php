<?php

use App\Http\Controllers\MembresiaController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
*/

Route::post('login', [UserController::class, 'login']);

Route::apiResource('users', UserController::class);
Route::apiResource('membresias', MembresiaController::class);
