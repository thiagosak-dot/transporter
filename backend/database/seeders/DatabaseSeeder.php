<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            VehicleSeeder::class,
            VehicleDriverSeeder::class,
            TripSeeder::class,
            VehicleMaintenanceSeeder::class,
            FuelSupplySeeder::class,
        ]);
    }
}