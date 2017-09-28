const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/assets/react/app.jsx', 'public/js');
mix.react('resources/assets/react/timeintimeout.jsx', 'public/js');
mix.react('resources/assets/react/schedule.jsx', 'public/js');
mix.react('resources/assets/react/schedule.edit.jsx', 'public/js');
mix.react('resources/assets/react/schedule.popup.jsx', 'public/js');
mix.browserSync('http://timetracker.dev');
