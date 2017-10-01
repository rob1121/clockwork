<?php

use App\ScheduleTask;
use App\User;
use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/schedule/{user}', function (User $user) {
    return $user->load(['scheduleTask','schedule']);
});

Route::get('/schedule', function () {
    $events = ScheduleTask::with(['user' => function ($query) {
        $query->select('id', 'name')->get();
    }])->select(scheduleTaskEventColumns())->get();

    transformScheduleTask($events);

    return $events;
});

Route::get('/employee', function () {
    $employees = User::with(['scheduleTask' => function ($query) {
        $query->select(scheduleTaskEventColumns())->get();
    }])->get()->each(function ($user) {
        transformScheduleTask($user->scheduleTask);
    });

    return $employees;
});

Route::get('/employee-schedule/{user}', function (User $user) {
    $user = $user->load(['scheduleTask' => function ($query) {
        $query->select(scheduleTaskEventColumns())->get();
    }]);

    transformScheduleTask($user->scheduleTask);

    return $user;
});


/**
 * @return array
 */
function scheduleTaskEventColumns()
{
    return ['*', 'task as title', 'date_start as start', 'date_end as end'];
}

function transformScheduleTask($schedule)
{
    $schedule->transform(function ($schedule) {
        return array_merge($schedule->toArray(), [
          "title" => title_case("{$schedule->user->name} task: {$schedule->title}"),
          "start" => $schedule->start,
          "end" => $schedule->end,
          ]);
    });

    return $schedule;
}
