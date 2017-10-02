<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScheduleTaskTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedule_tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable();
            $table->date('date_start')->nullable();
            $table->date('date_end')->nullable();
            $table->time('required_time_in')->nullable();
            $table->time('required_time_out')->nullable();
            $table->string('location')->nullable();
            $table->string('lng')->nullable();
            $table->string('lat')->nullable();
            $table->string('task')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedule_tasks');
    }
}
