<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('signup',[App\Http\Controllers\UserController::class,'signUp']);
Route::post('login',[App\Http\Controllers\UserController::class,'login']);
Route::post('addProduct',[App\Http\Controllers\ProductController::class,'addProduct']);
Route::get('list',[App\Http\Controllers\ProductController::class,'list']);
Route::delete('delete/{id}',[App\Http\Controllers\ProductController::class,'delete']);
Route::delete('delCmnt/{id}',[App\Http\Controllers\ProductController::class,'delCmnt']);
Route::get('showProduct/{id}',[App\Http\Controllers\ProductController::class,'showProduct']);
Route::put('updateProduct/{id}',[App\Http\Controllers\ProductController::class,'updateProduct']);
Route::get('search/{product}',[App\Http\Controllers\ProductController::class,'search']);
Route::post('comment',[App\Http\Controllers\ProductController::class,'comment']);
Route::get('showComment/{cmnt}',[App\Http\Controllers\ProductController::class,'showComment']);