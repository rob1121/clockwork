<?php namespace App\Http\Controllers;

use App\Schedule;
use App\ScheduleTask;
use App\User;
use Illuminate\Http\Request;

class EmployeeScheduleController extends Controller
{
  public function show() {
    return view('employee.edit');
  }
  /**
   * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
   */
  public function edit() {
    return view('schedule.edit');
  }

  /**
   * @param Request $request
   * @param User $user
   */
  public function update(Request $request, User $user) {
      $this->user = $user;
      $this->user->update(User::instance($request));

      collect($request->scheduleTasks)->map(function($scheduledTask) {
        return ScheduleTask::updateUserTask($this->user, $scheduledTask);
      })->each(function($scheduledTask) {
        Schedule::updateUserSchedule($this->user, $scheduledTask);
      });
    }
}
