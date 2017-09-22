<?php namespace App\Http\Controllers;

class EmployeeScheduleController extends Controller
{
    public function edit() {
        return view('schedule.edit');
    }

    public function update(Request $request) {
      
    }
}
