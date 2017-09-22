<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{

  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'time_id', 'time_out', 'required_time_in', 'required_time_out', 'due',
  ];

  public function user() {
      return $this->belongsTo(User::class);
  }
}
