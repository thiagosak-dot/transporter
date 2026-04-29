<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Trip;
use App\Models\Vehicle;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([

            'fleet' => [
                'available'      => Vehicle::where('status', 'available')->count(),
                'maintenance'    => Vehicle::where('status', 'in_maintenance')->count(),
                'in_trip'        => Vehicle::where('status', 'in_trip')->count(),
            ],

            'drivers' => [
                'active' => User::where('role', 'driver')
                    ->where('active', true)
                    ->count(),

                'inactive' => User::where('role', 'driver')
                    ->where('active', false)
                    ->count(),

                'in_trip' => User::where('role', 'driver')
                    ->whereHas('trips', function ($q) {
                        $q->where('status', 'in_progress');
                    })->count(),
            ],

            'trips' => [
                'pending'     => Trip::where('status', 'pending')->count(),
                'assigned'    => Trip::where('status', 'assigned')->count(),
                'in_progress' => Trip::where('status', 'in_progress')->count(),
                'completed'   => Trip::where('status', 'completed')->count(),
                'cancelled'   => Trip::where('status', 'cancelled')->count(),
            ],

        ]);
    }
}