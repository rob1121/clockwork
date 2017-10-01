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
        $scheduleTask = static::firstOrNew([
          "user_id" => $userId,
          "date_start" => $scheduledTask->date_start,
          "date_end" => $scheduledTask->date_end,
          "required_time_in" => $scheduledTask->required_time_in,
          "required_time_out" => $scheduledTask->required_time_out,
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
