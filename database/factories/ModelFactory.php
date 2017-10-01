<?php

use Carbon\Carbon;

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->safeEmail,
        'title' => $faker->jobTitle,
        'is_admin' => false,
        'password' => bcrypt($faker->password),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Schedule::class, function (Faker\Generator $faker) {
    return [
        'user_id' => function () {
             return factory(App\User::class)->create()->id;
        },
        'time_in' => '8:00:00',
        'time_out' => '13:00:00',
        'due' => $faker->dateTimeBetween(),
        'location' => $faker->word,
        'longitude' => $faker->longitude,
        'latitude' => $faker->latitude,
    ];
});

$factory->define(App\ScheduleTask::class, function (Faker\Generator $faker) {
    $date_start = Carbon::now()->startOfMonth()->toDateTimeString();
    $date_end = Carbon::parse($date_start, 'Asia/Manila')->endOfMonth()->toDateTimeString();

    return [
        'user_id' => function () {
             return factory(App\User::class)->create()->id;
        },
        'date_start' => $date_start,
        'date_end' => $date_end,
        'required_time_in' => '8:00:00',
        'required_time_out' => '13:00:00',
        'location' => $faker->word,
        'longitude' => $faker->longitude,
        'latitude' => $faker->latitude,
        'task' => $faker->sentence,
        'task' => $faker->paragraph,
    ];
});
