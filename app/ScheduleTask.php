<?php namespace App;

use App\Timetracker\Traits\ModelInstance;
use Illuminate\Database\Eloquent\Model;

class ScheduleTask extends Model
{
  use ModelInstance;
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'date_start', 'date_end', 'longitude', 'latitude', 'location', 'task', 'required_time_in', 'required_time_out',
  ];

  public function user() {
      return $this->belongsTo(User::class);
  }

  /**
   * @param $user
   * @param $scheduledTask
   * @return Model
   */
  public static function updateUserTask($user, $scheduledTask)
  {
    $scheduleTask = static::firstOrNew([
      "user_id" => $user->id,
      "date_start" => $scheduledTask->date_start,
      "date_end" => $scheduledTask->date_end,
      "required_time_in" => $scheduledTask->required_time_in,
      "required_time_out" => $scheduledTask->required_time_out,
      "location" => $scheduledTask->location,
      "longitude" => $scheduledTask->longitude,
      "latitude" => $scheduledTask->latitude,
      "task" => $scheduledTask->task,
    ]);

    $scheduleTask->save();

    return $scheduleTask;
  }
}
