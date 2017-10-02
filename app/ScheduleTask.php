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
      'user_id', 'schedule_id', 'date_start', 'date_end', 'lng', 'lat', 'location', 'task', 'required_time_in', 'required_time_out', 'description'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
        
    public function schedule()
    {
        return $this->hasMany(Schedule::class);
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
        if (isset($scheduledTask->sched_id)) {
            $scheduleTask = static::find($scheduledTask->sched_id);
        } else {
            $scheduleTask = new ScheduleTask;
        }
        $scheduleTask->user_id = $userId;
        $scheduleTask->date_start = $scheduledTask->date_start;
        $scheduleTask->date_end = $scheduledTask->date_end;
        $scheduleTask->required_time_in = $timein;
        $scheduleTask->required_time_out = $timeout;
        $scheduleTask->location = $scheduledTask->location;
        $scheduleTask->lng = $scheduledTask->lng;
        $scheduleTask->lat = $scheduledTask->lat;
        $scheduleTask->task = $scheduledTask->task;
        $scheduleTask->description = $scheduledTask->description;
        $scheduleTask->save();

        return $scheduleTask;
    }
}
