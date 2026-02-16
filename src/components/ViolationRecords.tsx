import React, { useState, useMemo } from "react";
import "../styles/violationRecords.css";

interface Statistic {
  value: string;
  label: string;
}

interface ViolatorRecord {
  id: number;
  ticketId: string;
  name: string;
  type: string;
  date: string;
  total: string;
  status: "resolved" | "unresolved";
}

const ViolationRecords: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [ticketIdFilter, setTicketIdFilter] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingRecord, setEditingRecord] = useState<ViolatorRecord | null>(
    null,
  );
  const [records, setRecords] = useState<ViolatorRecord[]>([
    {
      id: 1,
      ticketId: "TKT-2025-001",
      name: "Carlo Delos Reyes",
      type: "Seatbelt Violation",
      date: "2025-08-28",
      total: "₱800",
      status: "resolved",
    },
    {
      id: 2,
      ticketId: "TKT-2025-002",
      name: "Altheo Dela Cruz",
      type: "No Helmet (Motorcycle)",
      date: "2025-09-28",
      total: "₱800",
      status: "resolved",
    },
    {
      id: 3,
      ticketId: "TKT-2025-003",
      name: "Rodel Navarro",
      type: "Overspeeding",
      date: "2025-10-05",
      total: "₱2,500",
      status: "unresolved",
    },
    {
      id: 4,
      ticketId: "TKT-2025-004",
      name: "Janine Lopez",
      type: "Running Red Light",
      date: "2025-09-30",
      total: "₱3,000",
      status: "unresolved",
    },
    {
      id: 5,
      ticketId: "TKT-2025-005",
      name: "Paolo Cruzjeifred",
      type: "Vehicle Registration",
      date: "2025-08-19",
      total: "₱1,750",
      status: "resolved",
    },
    {
      id: 6,
      ticketId: "TKT-2025-006",
      name: "Lester Aguilar",
      type: "Reckless Driving",
      date: "2025-10-08",
      total: "₱4,500",
      status: "unresolved",
    },
    {
      id: 7,
      ticketId: "TKT-2025-007",
      name: "Maricar Uytusing",
      type: "Mobile Phone While Driving",
      date: "2025-10-10",
      total: "₱1,500",
      status: "resolved",
    },
    {
      id: 8,
      ticketId: "TKT-2025-008",
      name: "Ernesto Mendoza",
      type: "Driving Without License",
      date: "2025-07-14",
      total: "₱2,200",
      status: "resolved",
    },
    {
      id: 9,
      ticketId: "TKT-2025-009",
      name: "Dianne Mercado",
      type: "Obstructing Traffic",
      date: "2025-10-01",
      total: "₱1,000",
      status: "unresolved",
    },
    {
      id: 10,
      ticketId: "TKT-2025-010",
      name: "Carlo Delos Reyes",
      type: "Seatbelt Violation",
      date: "2025-09-25",
      total: "₱800",
      status: "resolved",
    },
    {
      id: 11,
      ticketId: "TKT-2025-011",
      name: "Kristoff Ramos",
      type: "Illegal U-Turn",
      date: "2025-10-11",
      total: "₱900",
      status: "unresolved",
    },
  ]);

  const statistics: Statistic[] = [
    { value: "1,280", label: "Issued Tickets" },
    { value: "65", label: "Unresolved Tickets" },
    { value: "18%", label: "Repeat Offender Rate" },
    { value: "94.9%", label: "Resolution Rate" },
  ];

  // Get unique violation types
  const violationTypes = useMemo(() => {
    const types = Array.from(new Set(records.map((record) => record.type)));
    return types.sort();
  }, [records]);

  // Filter records
  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesStatus =
        statusFilter === "all" || record.status === statusFilter;
      const matchesDate = !dateFilter || record.date.includes(dateFilter);
      const matchesType = typeFilter === "all" || record.type === typeFilter;
      const matchesTicketId =
        !ticketIdFilter ||
        record.ticketId.toLowerCase().includes(ticketIdFilter.toLowerCase());
      const matchesName =
        !nameFilter ||
        record.name.toLowerCase().includes(nameFilter.toLowerCase());
      return (
        matchesStatus &&
        matchesDate &&
        matchesType &&
        matchesTicketId &&
        matchesName
      );
    });
  }, [
    records,
    statusFilter,
    dateFilter,
    typeFilter,
    ticketIdFilter,
    nameFilter,
  ]);

  const handleResetFilters = () => {
    setStatusFilter("all");
    setDateFilter("");
    setTypeFilter("all");
    setTicketIdFilter("");
    setNameFilter("");
  };

  const handleEdit = (record: ViolatorRecord) => {
    setEditingRecord({ ...record });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingRecord(null);
  };

  const handleSave = () => {
    if (editingRecord) {
      setRecords(
        records.map((record) =>
          record.id === editingRecord.id ? editingRecord : record,
        ),
      );
      handleCloseModal();
    }
  };

  const handleDelete = () => {
    if (
      editingRecord &&
      window.confirm("Are you sure you want to delete this record?")
    ) {
      setRecords(records.filter((record) => record.id !== editingRecord.id));
      handleCloseModal();
    }
  };

  const handleInputChange = (field: keyof ViolatorRecord, value: string) => {
    if (editingRecord) {
      setEditingRecord({
        ...editingRecord,
        [field]: value,
      });
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Violation Records</h1>
      </div>

      {/* Statistics Cards */}
      <div className="cards-grid">
        {statistics.map((stat, index) => (
          <div key={index} className="card">
            <div className="card-value">{stat.value}</div>
            <div className="card-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Violator Records Table */}
      <div className="table-section">
        <div className="table-header">
          <h2>Violator Records</h2>
        </div>

        {/* Filters */}
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="ticket-id-filter">Ticket ID</label>
            <input
              id="ticket-id-filter"
              type="text"
              placeholder="Search ticket ID..."
              value={ticketIdFilter}
              onChange={(e) => setTicketIdFilter(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="name-filter">Violator Name</label>
            <input
              id="name-filter"
              type="text"
              placeholder="Search name..."
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="status-filter">Status</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="resolved">Resolved</option>
              <option value="unresolved">Unresolved</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="date-filter">Date</label>
            <input
              id="date-filter"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="type-filter">Type</label>
            <select
              id="type-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              {violationTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <button className="reset-btn" onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Ticket ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, index) => (
                  <tr key={record.id}>
                    <td className="row-number">{index + 1}</td>
                    <td className="ticket-id">{record.ticketId}</td>
                    <td>{record.name}</td>
                    <td className="violation-type">{record.type}</td>
                    <td>{record.date}</td>
                    <td className="amount">{record.total}</td>
                    <td>
                      <span className={`status-badge ${record.status}`}>
                        {record.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(record)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="no-results">
                    No records found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingRecord && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Violation Record</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="edit-ticket-id">Ticket ID</label>
                <input
                  id="edit-ticket-id"
                  type="text"
                  value={editingRecord.ticketId}
                  onChange={(e) =>
                    handleInputChange("ticketId", e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-name">Violator Name</label>
                <input
                  id="edit-name"
                  type="text"
                  value={editingRecord.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-type">Violation Type</label>
                <select
                  id="edit-type"
                  value={editingRecord.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                >
                  {violationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="edit-date">Date</label>
                <input
                  id="edit-date"
                  type="date"
                  value={editingRecord.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-total">Total Amount</label>
                <input
                  id="edit-total"
                  type="text"
                  value={editingRecord.total}
                  onChange={(e) => handleInputChange("total", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-status">Status</label>
                <select
                  id="edit-status"
                  value={editingRecord.status}
                  onChange={(e) =>
                    handleInputChange(
                      "status",
                      e.target.value as "resolved" | "unresolved",
                    )
                  }
                >
                  <option value="resolved">Resolved</option>
                  <option value="unresolved">Unresolved</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button className="save-btn" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViolationRecords;
