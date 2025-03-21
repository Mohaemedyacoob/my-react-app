import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [leaveStats, setLeaveStats] = useState({
    applied: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    axios.get("/info.json")
      .then((response) => {
        if (!response.data || !response.data.employees) {
          console.error("Invalid JSON structure");
          return;
        }

        const data = response.data.employees;
        setEmployees(data);
        setTotalEmployees(data.length);

        // Calculate leave stats dynamically
        let applied = 0, approved = 0, pending = 0, rejected = 0;
        data.forEach(emp => {
          if (emp.attendance) {
            emp.attendance.forEach(att => {
              applied += att.leaves || 0;
              approved += att.approvedLeaves || 0;
              pending += att.pendingLeaves || 0;
              rejected += att.rejectedLeaves || 0;
            });
          }
        });

        setLeaveStats({ applied, approved, pending, rejected });
      })
      .catch(error => console.error("Error fetching employee data:", error));
  }, []);

  // Salary Chart Data
  const salaryData = employees.length ? employees.map(emp => ({
    name: emp.name,
    salary: emp.salary || 0,
  })) : [{ name: "No Data", salary: 0 }];

  // Attendance Chart Data
  const attendanceData = employees.length ? employees.map(emp => ({
    name: emp.name,
    present: emp.attendance?.reduce((acc, curr) => acc + (curr.daysPresent || 0), 0),
    absent: emp.attendance?.reduce((acc, curr) => acc + (curr.leaves || 0), 0),
  })) : [{ name: "No Data", present: 0, absent: 0 }];

  // Leave Statistics for Pie Chart
  const leaveChartData = [
    { name: "Approved", value: leaveStats.approved, color: "#28a745" },
    { name: "Pending", value: leaveStats.pending, color: "#ffc107" },
    { name: "Rejected", value: leaveStats.rejected, color: "#dc3545" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Management Dashboard</h2>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ background: "#4CAF50", padding: "20px", color: "white", flex: 1, borderRadius: "8px" }}>
          <h3>Total Employees</h3>
          <p>{totalEmployees}</p>
        </div>
        <div style={{ background: "#2196F3", padding: "20px", color: "white", flex: 1, borderRadius: "8px" }}>
          <h3>Leave Applied</h3>
          <p>{leaveStats.applied}</p>
        </div>
        <div style={{ background: "#FF9800", padding: "20px", color: "white", flex: 1, borderRadius: "8px" }}>
          <h3>Leave Approved</h3>
          <p>{leaveStats.approved}</p>
        </div>
        <div style={{ background: "#F44336", padding: "20px", color: "white", flex: 1, borderRadius: "8px" }}>
          <h3>Leave Pending</h3>
          <p>{leaveStats.pending}</p>
        </div>
      </div>

      {/* Salary Statistics Chart */}
      <h3>Monthly Salary Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={salaryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="salary" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>

      {/* Attendance Statistics Chart */}
      <h3>Employee Attendance Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={attendanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="present" stroke="#4CAF50" />
          <Line type="monotone" dataKey="absent" stroke="#F44336" />
        </LineChart>
      </ResponsiveContainer>

      {/* Leave Status Pie Chart */}
      <h3>Leave Status Breakdown</h3>
      <ResponsiveContainer width="50%" height={300}>
        <PieChart>
          <Pie
            data={leaveChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {leaveChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
