<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Auth::user()->is_admin ? view('home') : view('time_in_time_out.index');
    }

    public function schedule()
    {
        return Auth::user()->is_admin ? view('schedule') : view('time_in_time_out.index');
    }
}
