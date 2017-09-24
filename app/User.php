<?php

namespace App;

use App\Timetracker\Traits\ModelInstance;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable, ModelInstance;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'title', 'is_admin',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'created_at', 'updated_at'
    ];

    public function schedule() {
        return $this->hasMany(Schedule::class);
    }
    
    public function scheduleTask() {
        return $this->hasMany(ScheduleTask::class);
    }

    public function getIsAdminAttribute($value) {
      return (boolean)$value;
    }
}
