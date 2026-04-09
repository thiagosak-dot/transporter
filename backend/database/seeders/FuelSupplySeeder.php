<?php

namespace Database\Seeders;

use App\Models\FuelSupply;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class FuelSupplySeeder extends Seeder
{
    public function run(): void
    {
        $driver1  = User::where('email', 'carlos@viage.com')->firstOrFail();
        $driver2  = User::where('email', 'marcos@viage.com')->firstOrFail();
        $vehicle1 = Vehicle::where('plate', 'ABC-1234')->firstOrFail();
        $vehicle2 = Vehicle::where('plate', 'DEF-5678')->firstOrFail();

        $supplies = [
            [
                'vehicle_id'      => $vehicle1->id,
                'driver_id'       => $driver1->id,
                'fuel_station'    => 'Posto Shell Centro',
                'fuel_type'       => 'Gasolina Comum',
                'liters'          => 40.00,
                'price_per_liter' => 5.89,
                'total_cost'      => 235.60,
                'odometer'        => 14800,
                'supplied_at'     => now()->subDays(5),
            ],
            [
                'vehicle_id'      => $vehicle2->id,
                'driver_id'       => $driver2->id,
                'fuel_station'    => 'Posto Ipiranga Vila Nova',
                'fuel_type'       => 'Diesel S10',
                'liters'          => 60.00,
                'price_per_liter' => 6.20,
                'total_cost'      => 372.00,
                'odometer'        => 31800,
                'supplied_at'     => now()->subDays(3),
            ],
            [
                'vehicle_id'      => $vehicle1->id,
                'driver_id'       => $driver1->id,
                'fuel_station'    => 'Posto BR Paulista',
                'fuel_type'       => 'Gasolina Aditivada',
                'liters'          => 35.50,
                'price_per_liter' => 6.09,
                'total_cost'      => 216.20,
                'odometer'        => 15000,
                'supplied_at'     => now()->subDay(),
            ],
        ];

        foreach ($supplies as $supply) {
            FuelSupply::create($supply);
        }
    }
}