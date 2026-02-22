import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import MapView from "./components/MapView";
import ViolationRecords from "./components/ViolationRecords";
import "./App.css";
import GenerateReport from "./components/GenerateReport";
import Calendar from "./components/Calendar";
import UserManagement from "./components/UserManagement";
import Ordinances from "./components/Ordinances";
import LoginPage from "./pages/LoginPage";

const LAYOUT_ROUTES = [
  "/dashboard",
  "/violation-records",
  "/map-view",
  "/report",
  "/calendar",
  "/user-management",
  "/ordinances",
];

function AppLayout() {
  const location = useLocation();
  const hasLayout = LAYOUT_ROUTES.includes(location.pathname);

  return (
    <>
      {hasLayout && <Sidebar />}
      <main className={hasLayout ? "main-content" : ""}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/violation-records" element={<ViolationRecords />} />
          <Route path="/map-view" element={<MapView />} />
          <Route path="/report" element={<GenerateReport />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/ordinances" element={<Ordinances />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/TMO-Admin-Panel">
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
