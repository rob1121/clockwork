<?php

namespace App\Http\Controllers;


use Carbon\Carbon;
use Spatie\GoogleCalendar\Event;

class GoogleCalendarEventController extends Controller
{
    public function index()
    {
//        dd(Event::get());
        Event::create([
            'name' => 'Rob Event',
            'startDateTime' => Carbon::now()->addMinute(5),
            'endDateTime' => Carbon::now()->addHour(),
            'attendees' => [
                ['email' => 'robinson.legaspi@gmail.com'],
            ],
            'reminders' => [
                'useDefault' => FALSE,
                'overrides' => [
                    ['method' => 'email', 'minutes' => 3],
                    ['method' => 'popup', 'minutes' => 3],
                ],
            ],
        ]);
    }
}
