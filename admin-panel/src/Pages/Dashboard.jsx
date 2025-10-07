import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Mock data
const callVolumeData = [
  { time: "9 AM", calls: 120 },
  { time: "10 AM", calls: 200 },
  { time: "11 AM", calls: 150 },
  { time: "12 PM", calls: 300 },
  { time: "1 PM", calls: 250 },
  { time: "2 PM", calls: 350 },
];

const agentActivityData = [
  { name: "Ramsey", activity: 20 },
  { name: "Kapoor", activity: 25 },
  { name: "Nelson", activity: 18 },
  { name: "Hollie", activity: 22 },
  { name: "James", activity: 28 },
];

const quickLinksData = [
  { name: "New Agent", value: 5 },
  { name: "Calls Pending", value: 12 },
  { name: "Contacts Added", value: 7 },
];

const recentActivityData = [
  { time: "09:00 AM", activity: 5 },
  { time: "10:00 AM", activity: 3 },
  { time: "11:00 AM", activity: 7 },
];

const Dashboard = () => {

  return (
    <Box
      sx={{
        p: 4,
        background: "#334155",
        Height: "100vh",
        // height:"95%",
        color: "#fff",
        mt:0,
        ml:1,
        pt:"50px",
      }}
    >
      {/* Header */}
      <Typography variant="h4" sx={{ mb: 2 }}>
        Dashboard Overview
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb:2, }}>
        {[
          { title: "Total Agents", value: "145", subtitle: "+8 Active" },
          { title: "Total Calls Today", value: "1.2K", subtitle: "vs Last Day" },
          { title: "Average Call Duration", value: "03:45", subtitle: "min" },
          { title: "Missed Call Rate", value: "4.2%", subtitle: "vs 1 Week" },
        ].map((card, index) => (
          <Grid item xs={12} sm={4} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 2,
                background: "#fff",
                color: "#000",
                textAlign: "center",
                width:"150px"
              }}
            >
              <Typography variant="subtitle2">{card.title}</Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {card.value}
              </Typography>
              <Typography variant="caption">{card.subtitle}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Main Charts */}
      <Grid container spacing={2} sx={{ mb:2 }}>
        {/* Call Volume Line Chart */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              background: "#fff",
              color: "#000",
              height: { xs: 300, sm: 300 }, 
              width: {xs:300, sm: 400},
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Call Volume Over Time
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={callVolumeData}>
                <XAxis dataKey="time" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="calls"
                  stroke="#1976d2"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Agent Activity Bar Chart */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              background: "#fff",
              color: "#000",
              height: { xs: 300, sm: 300 },
              width: {xs:300, sm: 400},
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Agent Activity
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={agentActivityData}>
                <XAxis dataKey="name" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip />
                <Bar dataKey="activity" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Links & Recent Activity Charts */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* Quick Links Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              background: "#fff",
              color: "#000",
              height: { xs: 300, sm: 300 },
              width: {xs:300, sm: 400},
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Quick Links
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={quickLinksData}>
                <XAxis dataKey="name" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip />
                <Bar dataKey="value" fill="#ff5722" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Activity Chart */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              background: "#fff",
              color: "#000",
              height: { xs: 300, sm: 300 },
              width: {xs:300, sm: 400},
            }}
          >
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              Recent Activity
            </Typography>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={recentActivityData}>
                <XAxis dataKey="time" stroke="#000" />
                <YAxis stroke="#000" />
                <Tooltip />
                <Bar dataKey="activity" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Footer */}
            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                color: "#888",
                // height: { xs: 120, sm: 150, md: 180, lg: 500 },
              }}
            >
              Powered by{" "}
              <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
                Bitmax
              </Box>
            </Typography>
    </Box>
  
  );
};

export default Dashboard;




