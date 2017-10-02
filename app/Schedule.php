<?php

namespace App;

use App\Timetracker\Traits\ModelInstance;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use ModelInstance;

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
    protected $fillable = [
        'user_id', 'schedule_task_id', 'time_in', 'time_out', 'due', 'lng', 'lat', 'location',
    ];

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
    protected $hidden = [
      'password', 'remember_token', 'created_at', 'updated_at'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
        
    public function scheduleTask()
    {
        return $this->belongsTo(ScheduleTask::class);
    }


  /**
   * @param $userId
   * @param $scheduledTask
   */
    public static function updateUserSchedule($userId, $scheduledTask)
    {
        $date = carbon::parse($scheduledTask->date_start);
        $dateEnd = carbon::parse($scheduledTask->date_end);

        while ($date->lessThanOrEqualTo($dateEnd)) {
            $userSchedule = static::firstOrNew([
                "user_id" => $userId,
                "schedule_task_id" => $scheduledTask->id,
                "due" => $date,
            ]);
            
            $userSchedule->save();

            $date->addDay();
        }
    }

  /**
   * user time in
   * @param $query
   */
    public function scopeTimeIn($query)
    {
        $now = Carbon::now();

        $query->where('due', $now->toDateString())->update([
        'time_in' => $now->toTimeString(),
        ]);
    }

  /**
   * user time out
   * @param $query
   */
    public function scopeTimeOut($query)
    {
        $now = Carbon::now();

        $query->where('due', $now->toDateString())->update([
        'time_out' => $now->toTimeString(),
        ]);
    }
}
