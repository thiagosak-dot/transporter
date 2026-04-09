<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleMaintenance;
use Illuminate\Database\Seeder;

class VehicleMaintenanceSeeder extends Seeder
{
    public function run(): void
    {
        $admin   = User::where('email', 'admin@viage.com')->firstOrFail();
        $vehicle1 = Vehicle::where('plate', 'ABC-1234')->firstOrFail();
        $vehicle3 = Vehicle::where('plate', 'GHI-9012')->firstOrFail();

        $maintenances = [
            [
                'vehicle_id'  => $vehicle1->id,
                'created_by'  => $admin->id,
                'type'        => 'oil_change',
                'description' => 'Troca de óleo e filtro de óleo',
                'odometer'    => 15000,
                'cost'        => 180.00,
                'start_date'  => now()->subDays(10)->toDateString(),
                'end_date'    => now()->subDays(10)->toDateString(),
                'active'      => false,
            ],
            [
                'vehicle_id'  => $vehicle3->id,
                'created_by'  => $admin->id,
                'type'        => 'corrective',
                'description' => 'Revisão do sistema de freios e suspensão',
                'odometer'    => 48000,
                'cost'        => null,
                'start_date'  => now()->toDateString(),
                'end_date'    => null,
                'active'      => true,
            ],
        ];

        foreach ($maintenances as $maintenance) {
            VehicleMaintenance::create($maintenance);
        }
    }
}