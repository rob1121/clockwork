<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ScheduleTask extends Model
{

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'date_start', 'date_end', 'longitude', 'latitude', 'location', 'task',
  ];


  public function user() {
      return $this->belongsTo(User::class);
  }
}
