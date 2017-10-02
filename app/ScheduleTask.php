<?php namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use App\Timetracker\Traits\ModelInstance;

class ScheduleTask extends Model
{
    use ModelInstance;
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
    protected $fillable = [
      'user_id', 'date_start', 'date_end', 'longitude', 'latitude', 'location', 'task', 'required_time_in', 'required_time_out', 'description'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

  /**
   * @param $userId
   * @param $scheduledTask
   * @return Model
   */
    public static function updateUserTask($userId, $scheduledTask)
    {
        //fomat date to ex. 24:59:00
        $timein = Carbon::parse($scheduledTask->required_time_in)->format('H:i:00');
        $timeout = Carbon::parse($scheduledTask->required_time_out)->format('H:i:00');

        $scheduleTask = static::firstOrNew([
          "user_id" => $userId,
          "date_start" => $scheduledTask->date_start,
          "date_end" => $scheduledTask->date_end,
          "required_time_in" => $timein,
          "required_time_out" => $timeout,
          "location" => $scheduledTask->location,
          "longitude" => $scheduledTask->longitude,
          "latitude" => $scheduledTask->latitude,
          "task" => $scheduledTask->task,
          "description" => $scheduledTask->description,
        ]);

        $scheduleTask->save();

        return $scheduleTask;
    }
}
