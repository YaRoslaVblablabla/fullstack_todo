<?php
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/tasks', 'TaskController@list');
Route::patch('/tasks/{task}', 'TaskController@changeStatus');
Route::patch('/tasks/{task}/update', 'TaskController@updateTask');
Route::post('/tasks/update', 'TaskController@activeAll');
Route::delete('/tasks/clear', 'TaskController@clearTrash');
Route::post('/tasks', 'TaskController@store');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
