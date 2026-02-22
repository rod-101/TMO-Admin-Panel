import React, { useState, useMemo } from "react";
import "../styles/mapView.css";

interface ViolationLocation {
  id: number;
  ticketId: string;
  violatorName: string;
  violationType: string;
  location: string;
  latitude: number;
  longitude: number;
  date: string;
  fine: string;
}

// interface ViolationType {
//   name: string;
//   color: string;
//   count: number;
// }

const MapView: React.FC = () => {
  const [selectedViolation, setSelectedViolation] =
    useState<ViolationLocation | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Individual violation locations (San Jose, Occidental Mindoro)
  const violations: ViolationLocation[] = [
    {
      id: 1,
      ticketId: "TKT-2025-001",
      violatorName: "Carlo Delos Reyes",
      violationType: "Seatbelt Violation",
      location: "Rizal Avenue",
      latitude: 12.3525,
      longitude: 121.0685,
      date: "2025-08-28",
      fine: "₱800",
    },
    {
      id: 2,
      ticketId: "TKT-2025-002",
      violatorName: "Altheo Dela Cruz",
      violationType: "No Helmet",
      location: "San Jose Public Market",
      latitude: 12.3515,
      longitude: 121.067,
      date: "2025-09-28",
      fine: "₱800",
    },
    {
      id: 3,
      ticketId: "TKT-2025-003",
      violatorName: "Rodel Navarro",
      violationType: "Overspeeding",
      location: "National Highway",
      latitude: 12.354,
      longitude: 121.0695,
      date: "2025-10-05",
      fine: "₱2,500",
    },
    {
      id: 4,
      ticketId: "TKT-2025-004",
      violatorName: "Janine Lopez",
      violationType: "Running Red Light",
      location: "Municipal Hall Area",
      latitude: 12.3535,
      longitude: 121.068,
      date: "2025-09-30",
      fine: "₱3,000",
    },
    {
      id: 5,
      ticketId: "TKT-2025-005",
      violatorName: "Paolo Cruzjeifred",
      violationType: "No Helmet",
      location: "Barangay Ansiray",
      latitude: 12.351,
      longitude: 121.0665,
      date: "2025-08-19",
      fine: "₱800",
    },
    {
      id: 6,
      ticketId: "TKT-2025-006",
      violatorName: "Lester Aguilar",
      violationType: "Reckless Driving",
      location: "Coastal Road",
      latitude: 12.356,
      longitude: 121.071,
      date: "2025-10-08",
      fine: "₱4,500",
    },
    {
      id: 7,
      ticketId: "TKT-2025-007",
      violatorName: "Maricar Uytusing",
      violationType: "Mobile Phone",
      location: "San Agustin Street",
      latitude: 12.3545,
      longitude: 121.069,
      date: "2025-10-10",
      fine: "₱1,500",
    },
    {
      id: 8,
      ticketId: "TKT-2025-008",
      violatorName: "Ernesto Mendoza",
      violationType: "Illegal Parking",
      location: "Public Market",
      latitude: 12.3518,
      longitude: 121.0672,
      date: "2025-07-14",
      fine: "₱2,200",
    },
    {
      id: 9,
      ticketId: "TKT-2025-009",
      violatorName: "Dianne Mercado",
      violationType: "Illegal Parking",
      location: "Port Area",
      latitude: 12.3555,
      longitude: 121.0705,
      date: "2025-10-01",
      fine: "₱1,000",
    },
    {
      id: 10,
      ticketId: "TKT-2025-010",
      violatorName: "Carlo Delos Reyes",
      violationType: "Seatbelt Violation",
      location: "Barangay Central",
      latitude: 12.352,
      longitude: 121.0675,
      date: "2025-09-25",
      fine: "₱800",
    },
    {
      id: 11,
      ticketId: "TKT-2025-011",
      violatorName: "Kristoff Ramos",
      violationType: "Illegal U-Turn",
      location: "Rizal Avenue",
      latitude: 12.353,
      longitude: 121.0688,
      date: "2025-10-11",
      fine: "₱900",
    },
    {
      id: 12,
      ticketId: "TKT-2025-012",
      violatorName: "Maria Santos",
      violationType: "Overspeeding",
      location: "National Highway",
      latitude: 12.3538,
      longitude: 121.0693,
      date: "2025-10-12",
      fine: "₱2,500",
    },
    {
      id: 13,
      ticketId: "TKT-2025-013",
      violatorName: "Juan dela Cruz",
      violationType: "Running Red Light",
      location: "Municipal Hall Area",
      latitude: 12.3533,
      longitude: 121.0683,
      date: "2025-10-13",
      fine: "₱3,000",
    },
    {
      id: 14,
      ticketId: "TKT-2025-014",
      violatorName: "Ana Reyes",
      violationType: "No Helmet",
      location: "Barangay Ansiray",
      latitude: 12.3512,
      longitude: 121.0668,
      date: "2025-10-14",
      fine: "₱800",
    },
    {
      id: 15,
      ticketId: "TKT-2025-015",
      violatorName: "Pedro Martinez",
      violationType: "Mobile Phone",
      location: "San Agustin Street",
      latitude: 12.3542,
      longitude: 121.0692,
      date: "2025-10-15",
      fine: "₱1,500",
    },
  ];

  // Violation type color mapping
  const violationColors: { [key: string]: string } = {
    "Seatbelt Violation": "#E53E3E",
    "No Helmet": "#DD6B20",
    Overspeeding: "#D69E2E",
    "Running Red Light": "#38A169",
    "Reckless Driving": "#3182CE",
    "Mobile Phone": "#805AD5",
    "Illegal Parking": "#D53F8C",
    "Illegal U-Turn": "#319795",
  };

  // Get violation type statistics
  const violationStats = useMemo(() => {
    const stats: { [key: string]: number } = {};
    violations.forEach((v) => {
      stats[v.violationType] = (stats[v.violationType] || 0) + 1;
    });
    return Object.entries(stats)
      .map(([name, count]) => ({
        name,
        color: violationColors[name] || "#718096",
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [violations]);

  // Filter violations
  const filteredViolations = useMemo(() => {
    if (activeFilter === "all") return violations;
    return violations.filter((v) => v.violationType === activeFilter);
  }, [violations, activeFilter]);

  // Calculate center of map
  const centerLat =
    violations.reduce((sum, v) => sum + v.latitude, 0) / violations.length;
  const centerLng =
    violations.reduce((sum, v) => sum + v.longitude, 0) / violations.length;

  return (
    <div className="map-container">
      <div className="map-header">
        <h1>Map View</h1>
        <p className="map-subtitle">Individual Violation Locations</p>
      </div>

      {/* Violation Type Filters */}
      <div className="violation-filters">
        <button
          className={`filter-chip ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All ({violations.length})
        </button>
        {violationStats.map((stat) => (
          <button
            key={stat.name}
            className={`filter-chip ${activeFilter === stat.name ? "active" : ""}`}
            style={{
              backgroundColor:
                activeFilter === stat.name ? stat.color : "white",
              color: activeFilter === stat.name ? "white" : "#2d3748",
              borderColor: stat.color,
            }}
            onClick={() => setActiveFilter(stat.name)}
          >
            <span
              className="filter-dot"
              style={{ backgroundColor: stat.color }}
            ></span>
            {stat.name} ({stat.count})
          </button>
        ))}
      </div>

      <div className="map-content">
        {/* Map Display */}
        <div className="map-display">
          <div className="map-wrapper">
            {/* Embedded Google Maps */}
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62259.5!2d${centerLng}!3d${centerLat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a0261e05d462b1%3A0x5c641ba9ae6f6b8e!2sSan%20Jose%2C%20Occidental%20Mindoro!5e0!3m2!1sen!2sph!4v1234567890`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Violation Locations Map"
            ></iframe>

            {/* Overlay markers on the map */}
            <div className="map-markers-overlay">
              {filteredViolations.map((violation, index) => (
                <div
                  key={violation.id}
                  className={`map-marker violation-marker ${
                    selectedViolation?.id === violation.id ? "selected" : ""
                  }`}
                  style={{
                    left: `${15 + (index % 8) * 10}%`,
                    top: `${20 + Math.floor(index / 8) * 15}%`,
                  }}
                  onClick={() => setSelectedViolation(violation)}
                >
                  <div
                    className="marker-pin"
                    style={{
                      background:
                        violationColors[violation.violationType] || "#718096",
                      borderColor:
                        violationColors[violation.violationType] || "#718096",
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="map-legend">
            <h3>Violation Types</h3>
            <div className="legend-items-grid">
              {violationStats.map((stat) => (
                <div key={stat.name} className="legend-item">
                  <span
                    className="legend-color"
                    style={{ backgroundColor: stat.color }}
                  ></span>
                  <span>{stat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Violations List */}
        <div className="hotspots-sidebar">
          <h2>Violations ({filteredViolations.length})</h2>
          <p className="sidebar-subtitle">
            Click on a violation to view details
          </p>

          <div className="hotspots-list">
            {filteredViolations.map((violation) => (
              <div
                key={violation.id}
                className={`hotspot-card violation-card ${selectedViolation?.id === violation.id ? "active" : ""}`}
                onClick={() => setSelectedViolation(violation)}
              >
                <div className="violation-card-header">
                  <div
                    className="violation-type-badge"
                    style={{
                      backgroundColor:
                        violationColors[violation.violationType] || "#718096",
                    }}
                  >
                    {violation.violationType}
                  </div>
                  <span className="ticket-id-badge">{violation.ticketId}</span>
                </div>

                <div className="violation-details">
                  <div className="detail-row">
                    <span className="label">Violator:</span>
                    <span className="value">{violation.violatorName}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Location:</span>
                    <span className="value">{violation.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Date:</span>
                    <span className="value">{violation.date}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Fine:</span>
                    <span className="value fine-amount">{violation.fine}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
