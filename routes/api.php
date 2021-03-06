<?php

use App\User;
use Carbon\Carbon;
use App\ScheduleTask;
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
    $now = Carbon::now()->toDateString();
    $scheduleTask = $user->scheduleTask->map(function ($task) {
        return array_merge($task->toArray(), [
            "start" => $task->date_start,
            "end" => $task->date_end,
            "title" => $task->task,
        ]);
    });
    return [
        "user" => $user->toArray(),
        "schedule_task" => $scheduleTask,
        "schedule" => $user->schedule->where('due', $now)->first(),
    ];
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
          "lng" => (float)$schedule->lng,
          "lat" => (float)$schedule->lat,
          "timein" => $schedule->required_time_in,
          "timeout" => $schedule->required_time_out,
          ]);
    });

    return $schedule;
}
