import React, { useState } from "react";
import "../styles/generateReport.css";

interface ReportConfig {
  period: "weekly" | "monthly" | "yearly";
  startDate: string;
  endDate: string;
}

interface GeneratedReport {
  id: number;
  name: string;
  period: string;
  dateRange: string;
  generatedDate: string;
  fileSize: string;
}

interface ViolationTypeData {
  type: string;
  count: number;
  percentage: number;
  color: string;
}

interface TrendData {
  period: string;
  count: number;
}

const GenerateReport: React.FC = () => {
  const [reportPeriod, setReportPeriod] = useState<
    "weekly" | "monthly" | "yearly"
  >("monthly");
  const [startDate, setStartDate] = useState<string>("2025-01-01");
  const [endDate, setEndDate] = useState<string>("2025-02-16");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [trendPeriod, setTrendPeriod] = useState<
    "weekly" | "monthly" | "yearly"
  >("weekly");

  // Sample data for pie chart - Violations by Type
  const violationsByType: ViolationTypeData[] = [
    { type: "No Helmet", count: 145, percentage: 28, color: "#DD6B20" },
    { type: "Seatbelt Violation", count: 98, percentage: 19, color: "#E53E3E" },
    { type: "Overspeeding", count: 87, percentage: 17, color: "#D69E2E" },
    { type: "Illegal Parking", count: 76, percentage: 15, color: "#D53F8C" },
    { type: "Running Red Light", count: 54, percentage: 10, color: "#38A169" },
    { type: "Mobile Phone", count: 32, percentage: 6, color: "#805AD5" },
    { type: "Others", count: 28, percentage: 5, color: "#718096" },
  ];

  // Generate trend data based on selected period
  const generateTrendData = (): TrendData[] => {
    if (trendPeriod === "weekly") {
      return [
        { period: "Jan 7", count: 45 },
        { period: "Jan 14", count: 52 },
        { period: "Jan 21", count: 38 },
        { period: "Jan 28", count: 61 },
        { period: "Feb 4", count: 48 },
        { period: "Feb 11", count: 55 },
        { period: "Feb 18", count: 42 },
        { period: "Feb 25", count: 58 },
      ];
    } else if (trendPeriod === "monthly") {
      return [
        { period: "Jan", count: 156 },
        { period: "Feb", count: 142 },
        { period: "Mar", count: 178 },
        { period: "Apr", count: 165 },
        { period: "May", count: 189 },
        { period: "Jun", count: 145 },
        { period: "Jul", count: 201 },
        { period: "Aug", count: 168 },
        { period: "Sep", count: 155 },
        { period: "Oct", count: 192 },
        { period: "Nov", count: 174 },
        { period: "Dec", count: 183 },
      ];
    } else {
      // yearly
      return [
        { period: "2018", count: 1245 },
        { period: "2019", count: 1389 },
        { period: "2020", count: 892 },
        { period: "2021", count: 1567 },
        { period: "2022", count: 1823 },
        { period: "2023", count: 1956 },
        { period: "2024", count: 2108 },
        { period: "2025", count: 298 },
      ];
    }
  };

  const violationTrends = generateTrendData();

  // Recently generated reports
  const recentReports: GeneratedReport[] = [
    {
      id: 1,
      name: "Monthly Report - January 2025",
      period: "Monthly",
      dateRange: "Jan 1 - Jan 31, 2025",
      generatedDate: "2025-02-01",
      fileSize: "2.3 MB",
    },
    {
      id: 2,
      name: "Weekly Report - Week 5",
      period: "Weekly",
      dateRange: "Jan 29 - Feb 4, 2025",
      generatedDate: "2025-02-05",
      fileSize: "856 KB",
    },
    {
      id: 3,
      name: "Yearly Report - 2024",
      period: "Yearly",
      dateRange: "Jan 1 - Dec 31, 2024",
      generatedDate: "2025-01-15",
      fileSize: "8.7 MB",
    },
    {
      id: 4,
      name: "Monthly Report - December 2024",
      period: "Monthly",
      dateRange: "Dec 1 - Dec 31, 2024",
      generatedDate: "2025-01-02",
      fileSize: "2.1 MB",
    },
  ];

  const handleGenerateReport = () => {
    setIsGenerating(true);

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      alert(
        `Report generated successfully!\nPeriod: ${reportPeriod}\nDate Range: ${startDate} to ${endDate}\n\nThe PDF report is ready for download.`,
      );
    }, 2000);
  };

  const handleDownloadReport = (report: GeneratedReport) => {
    alert(`Downloading: ${report.name}`);
  };

  // Calculate max value for line graph scaling
  const maxTrendValue = Math.max(...violationTrends.map((t) => t.count));

  return (
    <div className="report-container">
      <div className="report-header">
        <h1>Generate Report</h1>
        <p className="report-subtitle">
          Create and download violation reports in PDF format
        </p>
      </div>

      {/* Report Configuration */}
      <div className="report-config-section">
        <h2>Report Configuration</h2>
        <div className="config-controls">
          <div className="form-group">
            <label htmlFor="report-period">Report Period</label>
            <select
              id="report-period"
              value={reportPeriod}
              onChange={(e) =>
                setReportPeriod(
                  e.target.value as "weekly" | "monthly" | "yearly",
                )
              }
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="start-date">Start Date</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="end-date">End Date</label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <button
            className="generate-btn"
            onClick={handleGenerateReport}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Report"}
          </button>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        {/* Pie Chart - Violations by Type */}
        <div className="chart-card">
          <h2>Violations by Type</h2>
          <div className="pie-chart-container">
            <svg viewBox="0 0 200 200" className="pie-chart">
              {(() => {
                let currentAngle = 0;
                return violationsByType.map((data, index) => {
                  const angle = (data.percentage / 100) * 360;
                  const startAngle = currentAngle;
                  currentAngle += angle;

                  // Calculate path for pie slice
                  const startRad = (startAngle - 90) * (Math.PI / 180);
                  const endRad = (startAngle + angle - 90) * (Math.PI / 180);
                  const x1 = 100 + 80 * Math.cos(startRad);
                  const y1 = 100 + 80 * Math.sin(startRad);
                  const x2 = 100 + 80 * Math.cos(endRad);
                  const y2 = 100 + 80 * Math.sin(endRad);
                  const largeArc = angle > 180 ? 1 : 0;

                  return (
                    <path
                      key={index}
                      d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={data.color}
                      stroke="white"
                      strokeWidth="2"
                    />
                  );
                });
              })()}
            </svg>
            <div className="chart-legend">
              {violationsByType.map((data, index) => (
                <div key={index} className="legend-item">
                  <span
                    className="legend-dot"
                    style={{ backgroundColor: data.color }}
                  ></span>
                  <span className="legend-label">{data.type}</span>
                  <span className="legend-value">
                    {data.count} ({data.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Line Graph - Violation Trends */}
        <div className="chart-card">
          <div className="chart-header">
            <h2>Violation Trends Over Time</h2>
            <div className="trend-toggle">
              <button
                className={`toggle-btn ${trendPeriod === "weekly" ? "active" : ""}`}
                onClick={() => setTrendPeriod("weekly")}
              >
                Weekly
              </button>
              <button
                className={`toggle-btn ${trendPeriod === "monthly" ? "active" : ""}`}
                onClick={() => setTrendPeriod("monthly")}
              >
                Monthly
              </button>
              <button
                className={`toggle-btn ${trendPeriod === "yearly" ? "active" : ""}`}
                onClick={() => setTrendPeriod("yearly")}
              >
                Yearly
              </button>
            </div>
          </div>
          <div className="line-chart-container">
            <svg viewBox="0 0 400 250" className="line-chart">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="40"
                  y1={40 + i * 40}
                  x2="380"
                  y2={40 + i * 40}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              ))}

              {/* Y-axis labels */}
              {[0, 1, 2, 3, 4].map((i) => (
                <text
                  key={i}
                  x="30"
                  y={44 + i * 40}
                  fontSize="10"
                  fill="#718096"
                  textAnchor="end"
                >
                  {Math.round(maxTrendValue - (i * maxTrendValue) / 4)}
                </text>
              ))}

              {/* Line path */}
              <polyline
                points={violationTrends
                  .map((data, index) => {
                    const x = 50 + index * (330 / (violationTrends.length - 1));
                    const y = 200 - (data.count / maxTrendValue) * 160;
                    return `${x},${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="#4299e1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points */}
              {violationTrends.map((data, index) => {
                const x = 50 + index * (330 / (violationTrends.length - 1));
                const y = 200 - (data.count / maxTrendValue) * 160;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#4299e1"
                    stroke="white"
                    strokeWidth="2"
                  />
                );
              })}

              {/* X-axis labels */}
              {violationTrends.map((data, index) => {
                const x = 50 + index * (330 / (violationTrends.length - 1));
                return (
                  <text
                    key={index}
                    x={x}
                    y="230"
                    fontSize="10"
                    fill="#718096"
                    textAnchor="middle"
                  >
                    {data.period}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Recently Generated Reports */}
      <div className="recent-reports-section">
        <h2>Recently Generated Reports</h2>
        <div className="reports-list">
          {recentReports.map((report) => (
            <div key={report.id} className="report-item">
              <div className="report-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div className="report-details">
                <h3>{report.name}</h3>
                <div className="report-meta">
                  <span className="report-badge">{report.period}</span>
                  <span className="report-date">{report.dateRange}</span>
                </div>
                <div className="report-info">
                  <span>Generated: {report.generatedDate}</span>
                  <span>Size: {report.fileSize}</span>
                </div>
              </div>
              <button
                className="download-btn"
                onClick={() => handleDownloadReport(report)}
              >
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GenerateReport;
