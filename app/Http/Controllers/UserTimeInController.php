<?php namespace App\Http\Controllers;

use App\User;

class UserTimeInController extends Controller
{
  public function update(User $user) {
    $user->schedule()->timeIn();

    return [
      'success' => true,
      'msg' => null,
    ];
  }
}
