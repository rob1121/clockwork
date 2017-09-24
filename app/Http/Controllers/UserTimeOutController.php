<?php namespace App\Http\Controllers;

use App\User;

class UserTimeOutController extends Controller
{
  public function update(User $user) {
    $user->schedule()->timeOut();

    return [
      'success' => true,
      'msg' => null,
    ];
  }
}
