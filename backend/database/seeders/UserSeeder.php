<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // ─── Admin ────────────────────────────────────────────
        User::create([
            'name'                => 'Administrador',
            'email'               => 'admin@viage.com',
            'password'            => Hash::make('password'),
            'role'                => 'admin',
            'registration_number' => 'ADM-001',
            'active'              => true,
        ]);

        // ─── Operadores ───────────────────────────────────────
        $operators = [
            [
                'name'                => 'Ana Paula Ferreira',
                'email'               => 'ana@viage.com',
                'registration_number' => 'OP-001',
            ],
            [
                'name'                => 'João Pedro Martins',
                'email'               => 'joao@viage.com',
                'registration_number' => 'OP-002',
            ],
            [
                'name'                => 'Fernanda Costa',
                'email'               => 'fernanda@viage.com',
                'registration_number' => 'OP-003',
                'active'              => false, // operador inativo
            ],
        ];

        foreach ($operators as $operator) {
            User::create([
                ...$operator,
                'password' => Hash::make('password'),
                'role'     => 'operator',
                'active'   => $operator['active'] ?? true,
            ]);
        }

        // ─── Motoristas ───────────────────────────────────────
        $drivers = [
            [
                'name'                => 'Carlos Eduardo Souza',
                'email'               => 'carlos@viage.com',
                'registration_number' => 'MOT-001',
            ],
            [
                'name'                => 'Marcos Antônio Lima',
                'email'               => 'marcos@viage.com',
                'registration_number' => 'MOT-002',
            ],
            [
                'name'                => 'Roberto Silva',
                'email'               => 'roberto@viage.com',
                'registration_number' => 'MOT-003',
            ],
            [
                'name'                => 'Paulo Henrique Dias',
                'email'               => 'paulo@viage.com',
                'registration_number' => 'MOT-004',
                'active'              => false, // motorista inativo
            ],
        ];

        foreach ($drivers as $driver) {
            User::create([
                ...$driver,
                'password' => Hash::make('password'),
                'role'     => 'driver',
                'active'   => $driver['active'] ?? true,
            ]);
        }
    }
}