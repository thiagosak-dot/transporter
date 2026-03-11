import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Vehicles from "../pages/Vehicles/Vehicles";
import Trips from "../pages/Trips/Trips";
import Drivers from "../pages/Driver/Drivers";
import Maintenance from "../pages/Maintenance/Maintenance";
import Fuel from "../pages/Fuel/Fuel";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/fuel" element={<Fuel />} />

      </Routes>
    </BrowserRouter>
  );
}