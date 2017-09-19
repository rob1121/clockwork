<?php namespace App\Http\Controllers;

use App\User;

class EmployeesController extends Controller
{
    public function all() {
        return User::all();
    }
}
