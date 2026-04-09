<?php

namespace Database\Seeders;

use App\Models\Trip;
use App\Models\User;
use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class TripSeeder extends Seeder
{
    public function run(): void
    {
        $operator = User::where('email', 'ana@viage.com')->firstOrFail();
        $driver1  = User::where('email', 'carlos@viage.com')->firstOrFail();
        $driver2  = User::where('email', 'marcos@viage.com')->firstOrFail();
        $vehicle1 = Vehicle::where('plate', 'ABC-1234')->firstOrFail();
        $vehicle2 = Vehicle::where('plate', 'DEF-5678')->firstOrFail();

        $trips = [
            [
                'patient_name'             => 'João da Silva',
                'operator_id'              => $operator->id,
                'driver_id'                => $driver1->id,
                'vehicle_id'               => $vehicle1->id,
                'origin_street'            => 'Rua das Flores, 123',
                'origin_neighborhood'      => 'Centro',
                'destination_street'       => 'Av. Brasil, 500',
                'destination_neighborhood' => 'Vila Nova',
                'destination_city'         => 'São Paulo',
                'status'                   => 'completed',
                'priority'                 => 'normal',
                'initial_odometer'         => 15000,
                'final_odometer'           => 15045,
                'started_at'               => now()->subDays(2),
                'finished_at'              => now()->subDays(2)->addHours(1),
            ],
            [
                'patient_name'             => 'Maria Oliveira',
                'operator_id'              => $operator->id,
                'driver_id'                => $driver2->id,
                'vehicle_id'               => $vehicle2->id,
                'origin_street'            => 'Rua XV de Novembro, 45',
                'origin_neighborhood'      => 'Jardim América',
                'destination_street'       => 'Av. Paulista, 1000',
                'destination_neighborhood' => 'Bela Vista',
                'destination_city'         => 'São Paulo',
                'status'                   => 'in_progress',
                'priority'                 => 'high',
                'initial_odometer'         => 32000,
                'final_odometer'           => null,
                'started_at'               => now()->subHours(1),
                'finished_at'              => null,
            ],
            [
                'patient_name'             => 'Pedro Santos',
                'operator_id'              => $operator->id,
                'driver_id'                => null,
                'vehicle_id'               => null,
                'origin_street'            => 'Rua Augusta, 200',
                'origin_neighborhood'      => 'Consolação',
                'destination_street'       => 'Rua da Saúde, 100',
                'destination_neighborhood' => 'Saúde',
                'destination_city'         => 'São Paulo',
                'status'                   => 'pending',
                'priority'                 => 'emergency',
                'initial_odometer'         => null,
                'final_odometer'           => null,
                'started_at'               => null,
                'finished_at'              => null,
            ],
        ];

        foreach ($trips as $trip) {
            Trip::create($trip);
        }
    }
}
