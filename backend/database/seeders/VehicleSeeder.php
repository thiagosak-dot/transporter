<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $vehicles = [
            [
                'plate'            => 'ABC-1234',
                'brand'            => 'Toyota',
                'model'            => 'Corolla',
                'year'             => 2022,
                'type'             => 'Sedan',
                'patrimony_number' => 'PAT-001',
                'current_odometer' => 15000,
                'status'           => 'available',
            ],
            [
                'plate'            => 'DEF-5678',
                'brand'            => 'Fiat',
                'model'            => 'Strada',
                'year'             => 2021,
                'type'             => 'Picape',
                'patrimony_number' => 'PAT-002',
                'current_odometer' => 32000,
                'status'           => 'available',
            ],
            [
                'plate'            => 'GHI-9012',
                'brand'            => 'Volkswagen',
                'model'            => 'Gol',
                'year'             => 2020,
                'type'             => 'Hatch',
                'patrimony_number' => 'PAT-003',
                'current_odometer' => 48000,
                'status'           => 'in_maintenance', // em manutenção
            ],
            [
                'plate'            => 'JKL-3456',
                'brand'            => 'Chevrolet',
                'model'            => 'S10',
                'year'             => 2023,
                'type'             => 'Picape',
                'patrimony_number' => 'PAT-004',
                'current_odometer' => 8000,
                'status'           => 'available',
            ],
            [
                'plate'            => 'MNO-7890',
                'brand'            => 'Ford',
                'model'            => 'Transit',
                'year'             => 2021,
                'type'             => 'Van',
                'patrimony_number' => 'PAT-005',
                'current_odometer' => 60000,
                'status'           => 'inactive', // inativo
            ],
        ];

        foreach ($vehicles as $vehicle) {
            Vehicle::create($vehicle);
        }
    }
}