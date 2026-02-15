import { Routes, Route, BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import MapView from "./components/MapView";
import ViolationRecords from "./components/ViolationRecords";
import "./App.css";
import GenerateReport from "./components/GenerateReport";
import Calendar from "./components/Calendar";
import UserManagement from "./components/UserManagement";
import Ordinances from "./components/Ordinances";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/violation-records" element={<ViolationRecords />} />
          <Route path="/map-view" element={<MapView />} />
          <Route path="/report" element={<GenerateReport />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/ordinances" element={<Ordinances />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
