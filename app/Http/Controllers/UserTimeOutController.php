<?php namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;

class UserTimeOutController extends Controller
{
    public function update(User $user)
    {
        $this->middleware('auth');
        $user->schedule()->timeOut();
        
        $now = Carbon::now()->toDateString();
        return $user->schedule->where('due', $now)->first();
    }
}
