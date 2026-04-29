<?php

namespace App\Services;

use App\Enums\TripStatus;
use App\Enums\VehicleStatus;
use App\Models\Trip;
use App\Models\Vehicle;
use Exception;

class TripService
{
    /**
     * Criar uma nova viagem
     */
    public function createTrip(array $data): Trip
    {
        // Definir posição na fila
        $data['queue_position'] = Trip::where('status', TripStatus::Pending->value)->count() + 1;

        $trip = Trip::create($data);

        // Se já tem motorista e veículo, atribuir direto
        if (!empty($data['driver_id']) && !empty($data['vehicle_id'])) {
            $this->assignTrip($trip, $data['driver_id'], $data['vehicle_id']);
        }

        return $trip->fresh(['driver', 'vehicle', 'operator']);
    }

    /**
     * Atribuir motorista e veículo à viagem
     */
    public function assignTrip(Trip $trip, int $driverId, int $vehicleId): Trip
    {
        return DB::transaction(function () use ($trip, $driverId, $vehicleId) {

            // viagem precisa estar pendente
            if ($trip->status !== TripStatus::Pending->value) {
                throw new Exception('Apenas viagens pendentes podem ser atribuídas.');
            }

            // motorista já ocupado
            $driverBusy = Trip::where('driver_id', $driverId)
                ->whereIn('status', [
                    TripStatus::Assigned->value,
                    TripStatus::InProgress->value,
                ])
                ->where('id', '!=', $trip->id)
                ->exists();

            if ($driverBusy) {
                throw new Exception('Motorista já possui viagem ativa.');
            }

            // veículo precisa existir
            $vehicle = Vehicle::findOrFail($vehicleId);

            // veículo ocupado por status
            if ($vehicle->status !== VehicleStatus::Available->value) {
                throw new Exception('Veículo não está disponível.');
            }

            // segurança extra: veículo já vinculado em outra viagem ativa
            $vehicleBusy = Trip::where('vehicle_id', $vehicleId)
                ->whereIn('status', [
                    TripStatus::Assigned->value,
                    TripStatus::InProgress->value,
                ])
                ->where('id', '!=', $trip->id)
                ->exists();

            if ($vehicleBusy) {
                throw new Exception('Veículo já está vinculado a outra viagem.');
            }

            // atribuir
            $trip->update([
                'status'     => TripStatus::Assigned->value,
                'driver_id'  => $driverId,
                'vehicle_id' => $vehicleId,
            ]);

            // opcional: já reservar veículo
            $vehicle->update([
                'status' => VehicleStatus::InTrip->value,
            ]);

            return $trip->fresh([
                'driver',
                'vehicle',
                'operator',
            ]);
        });
    }

    /**
     * Iniciar viagem
     */
    public function startTrip(Trip $trip, int $initialOdometer): Trip
    {
        if ($trip->status !== TripStatus::Assigned->value) {
            throw new Exception('Apenas viagens atribuídas podem ser iniciadas.');
        }

        $trip->update([
            'status'           => TripStatus::InProgress->value,
            'initial_odometer' => $initialOdometer,
            'started_at'       => now(),
        ]);

        // Atualizar status do veículo
        $trip->vehicle?->update(['status' => VehicleStatus::InTrip->value]);

        return $trip->fresh(['driver', 'vehicle', 'operator']);
    }

    /**
     * Finalizar viagem
     */
    public function finishTrip(Trip $trip, int $finalOdometer): Trip
    {
        if ($trip->status !== TripStatus::InProgress->value) {
            throw new Exception('Apenas viagens em andamento podem ser finalizadas.');
        }

        $trip->update([
            'status'          => TripStatus::Completed->value,
            'final_odometer'  => $finalOdometer,
            'finished_at'     => now(),
        ]);

        // Atualizar odômetro e status do veículo
        $trip->vehicle?->update([
            'status'           => VehicleStatus::Available->value,
            'current_odometer' => $finalOdometer,
        ]);

        return $trip->fresh(['driver', 'vehicle', 'operator']);
    }
}