<?php namespace App\Timetracker\Traits;

use Illuminate\Http\Request;

trait ModelInstance
{
  public static function instance($request)
  {
    $sanitized_data = $request instanceof Request
      ? $request->all()
      : (new Request($request))->all();
    return (new self($sanitized_data))->getAttributes();
  }
}