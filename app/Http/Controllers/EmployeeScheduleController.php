<?php namespace App\Http\Controllers;

use App\Schedule;
use App\ScheduleTask;
use App\User;
use Illuminate\Http\Request;

class EmployeeScheduleController extends Controller
{
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
            return false;
        }

        // validate schedule
        $request->validate([
            "scheduleTask.date_start" => 'required',
            "scheduleTask.date_end" => 'required',
            "scheduleTask.required_time_in" => 'required',
            "scheduleTask.required_time_out" => 'required',
            "scheduleTask.location" => 'required',
            "scheduleTask.longitude" => 'required|numeric',
            "scheduleTask.latitude" => 'required|numeric',
            "scheduleTask.task" => 'required',
            "scheduleTask.description" => 'required',
        ]);

        //add or update schedule task
        $scheduleTask = ScheduleTask::updateUserTask($this->user->id, (object)$request->scheduleTask);

        //update user schedule
        Schedule::updateUserSchedule($this->user->id, $scheduleTask);

        return array_merge(($scheduleTask)->toArray(), [
            "title" => title_case("{$this->user->name} task: {$scheduleTask->task}"),
            "start" => $scheduleTask->date_start,
            "end" => $scheduleTask->date_end,
        ]);
    }
}
