<?php namespace App\Http\Controllers;

use App\User;
use App\Schedule;
use Carbon\Carbon;
use App\ScheduleTask;
use Illuminate\Http\Request;

class EmployeeScheduleController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('admin');
    }

  /**
   * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
   */
    public function edit()
    {
        return view('schedule.edit');
    }

  /**
   * @param Request $request
   * @param User $user
   */
    public function update(Request $request, User $user)
    {
        // validate user information
        $request->validate([
            'name' => 'required',
            'email' => 'required',
            'title' => 'required',
            'is_admin' => 'required',
        ]);
        $this->user = $user;
        $this->user->update(User::instance($request));
        
        if (!isset($request->scheduleTask)) {
            return ["success" => true];
        }
        
        //fomat date to ex. 24:59:00
        $timein = Carbon::parse($request->scheduleTask['required_time_in'])->format('H:i:00');
        $timeout = Carbon::parse($request->scheduleTask['required_time_out'])->format('H:i:00');

        // validate schedule
        $request->validate([
            "scheduleTask.date_start" => "required|before_or_equal:{$request->scheduleTask['date_end']}",
            "scheduleTask.date_end" => "required|after_or_equal:{$request->scheduleTask['date_start']}",
            "scheduleTask.required_time_in" => "required|before_or_equal:{$timeout}",
            "scheduleTask.required_time_out" => "required|after_or_equal:{$timein}",
            "scheduleTask.location" => "required",
            "scheduleTask.lng" => "required|numeric",
            "scheduleTask.lat" => "required|numeric",
            "scheduleTask.task" => "required",
            "scheduleTask.description" => "required",
        ]);

        //add or update schedule task
        $scheduleTask = ScheduleTask::updateUserTask($this->user->id, (object)$request->scheduleTask);

        //update user schedule
        Schedule::updateUserSchedule($this->user->id, $scheduleTask);

        return array_merge(($scheduleTask)->toArray(), [
            "title" => title_case("{$this->user->name} task: {$scheduleTask->task}"),
            "start" => $scheduleTask->date_start,
            "end" => $scheduleTask->date_end,
            "lng" => (float)$scheduleTask->lng,
            "lat" => (float)$scheduleTask->lat,
            "timein" => $scheduleTask->required_time_in,
            "timeout" => $scheduleTask->required_time_out,
        ]);
    }

    public function delete(ScheduleTask $scheduleTask)
    {
        $scheduleTask->schedule()->delete();
        
        $scheduleTask->delete();
    }
}
