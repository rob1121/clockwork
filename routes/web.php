<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();

Route::get('/logout', 'UserController@logout');
Route::get('/home', 'HomeController@index')->name('home');

Route::get('/', function () {
    return view('welcome');
});

Route::get('/schedule', 'HomeController@schedule');

Route::get('/employee-schedule/{user}/edit', 'EmployeeScheduleController@edit');
Route::put('/employee-schedule/{user}', 'EmployeeScheduleController@update');
Route::delete('/employee-schedule/{schedule_task}', 'EmployeeScheduleController@delete');
Route::put('/employee-timein/{user}', 'UserTimeInController@update');
Route::put('/employee-timeout/{user}', 'UserTimeOutController@update');

Route::get('/time', function () {
    return view('time_in_time_out.index');
})->middleware('auth');

Route::get('/map/marker', function () {
    return view('google.map');
});
