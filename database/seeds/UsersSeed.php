<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersSeed extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('users')->truncate();
        DB::table('schedules')->truncate();
        DB::table('schedule_tasks')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $users = factory(App\User::class, 5)->create();

        $users->map(function ($user) {
            $scheduleTask = factory(App\ScheduleTask::class)->create([
              'user_id' => $user->id,
            ]);

            $start_date = Carbon::parse($scheduleTask->date_start);
            $end_date = Carbon::parse($scheduleTask->date_end);

            while ($start_date->lessThanOrEqualTo($end_date)) {
                factory(App\Schedule::class)->create([
                  'user_id' => $user->id,
                  'schedule_task_id' => $scheduleTask->id,
                  'due' => $start_date,

                  'location' => $scheduleTask->location,
                  'lng' => $scheduleTask->longitude,
                  'lat' => $scheduleTask->latitude,
                ]);

                $start_date->addDay();
            }
        });

        $this->command->info("all tables are seeded");
    }
}
