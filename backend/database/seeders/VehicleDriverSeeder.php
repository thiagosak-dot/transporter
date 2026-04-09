<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleDriver;
use Illuminate\Database\Seeder;

class VehicleDriverSeeder extends Seeder
{
    public function run(): void
    {
        $assignments = [
            [
                'driver_email'  => 'carlos@viage.com',
                'vehicle_plate' => 'ABC-1234',
            ],
            [
                'driver_email'  => 'marcos@viage.com',
                'vehicle_plate' => 'DEF-5678',
            ],
            [
                'driver_email'  => 'roberto@viage.com',
                'vehicle_plate' => 'JKL-3456',
            ],
        ];

        foreach ($assignments as $assignment) {
            $driver  = User::where('email', $assignment['driver_email'])->firstOrFail();
            $vehicle = Vehicle::where('plate', $assignment['vehicle_plate'])->firstOrFail();

            VehicleDriver::create([
                'driver_id'   => $driver->id,
                'vehicle_id'  => $vehicle->id,
                'active'      => true,
                'assigned_at' => now(),
            ]);
        }
    }
}