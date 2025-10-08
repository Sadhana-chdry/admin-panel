import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const BASE_URL = "https://superfone-admin.onrender.com/api/superadmin/webhooklogs";

const LogDetails = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [logId, setLogId] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Show snackbar
  const showSnackbar = (message, severity = "success") =>
    setSnackbar({ open: true, message, severity });

  // Fetch all logs
  const fetchAllLogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/all`);
      setLogs(res.data || []);
      showSnackbar("All logs loaded", "success");
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to fetch logs", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch log details by ID
  const fetchLogById = async () => {
    if (!logId.trim()) return showSnackbar("Enter Log ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/${logId.trim()}`);
      setLogs([res.data]);
      showSnackbar("Log details loaded", "success");
    } catch (err) {
      console.error(err);
      showSnackbar("Log not found", "error");
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLogs();
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto" }}>
      <Typography variant="h4" mb={2} fontWeight="bold" sx={{pt:3}}>
        WebHook Logs
      </Typography>

      {/* Search */}
      <Paper sx={{ p: 2, mb: 3, display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          label="Search by Log ID"
          value={logId}
          onChange={(e) => setLogId(e.target.value)}
          size="small"
        />
        <Button variant="contained" color="primary" onClick={fetchLogById}>
          Search
        </Button>
        <Button variant="outlined" color="secondary" onClick={fetchAllLogs}>
          Show All Logs
        </Button>
      </Paper>

      {/* Logs Table */}
      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1 }}>Loading logs...</Typography>
          </Box>
        ) : logs.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Event</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Details</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log._id}>
                    <TableCell>{log._id}</TableCell>
                    <TableCell>{log.event || "N/A"}</TableCell>
                    <TableCell>{log.status || "N/A"}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => alert(JSON.stringify(log, null, 2))}
                      >
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography sx={{ textAlign: "center", py: 4 }}>No logs found</Typography>
        )}
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LogDetails;
