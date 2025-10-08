import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const BASE_URL =
  "https://superfone-admin.onrender.com/api/superadmin/teammember";

const TeamMembers = () => {
  const [teamId, setTeamId] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // Fetch members by team ID
  const fetchMembers = async () => {
    if (!teamId.trim()) return showSnackbar("Enter Team ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/${teamId.trim()}`);
      setMembers(res.data || []);
      showSnackbar("Team members loaded", "success");
    } catch (err) {
      console.error("Error fetching members:", err);
      setMembers([]);
      showSnackbar("Failed to fetch team members", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete member by ID
  const removeMember = async (id) => {
    if (!window.confirm("Are you sure you want to remove this member?")) return;
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      showSnackbar("Member removed successfully", "success");
      setMembers((prev) => prev.filter((member) => member._id !== id));
    } catch (err) {
      console.error("Error removing member:", err);
      showSnackbar("Failed to remove member", "error");
    }
  };

  // Remove all fetched team members
  const removeAllMembers = async () => {
    if (members.length === 0)
      return showSnackbar("No members to remove", "warning");

    if (!window.confirm("Are you sure you want to remove all team members?"))
      return;

    try {
      await Promise.all(
        members.map((member) => axios.delete(`${BASE_URL}/${member._id}`))
      );
      showSnackbar("All team members removed successfully", "success");
      setMembers([]);
    } catch (err) {
      console.error("Error removing all members:", err);
      showSnackbar("Failed to remove all members", "error");
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: "1000px", mx: "auto", pt: 5 }}>
      <Typography variant="h4" mb={1} fontWeight="bold">
        Team Members
      </Typography>

      {/* Search and Remove Controls */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: "#f8f9fa" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {/* Search Bar */}
          <TextField
            label="Search By Team ID..."
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            size="small"
            sx={{ width: 500 }}
          />

          {/* Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={fetchMembers}
              sx={{ minWidth: 180 }}
            >
              Search By ID
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={removeAllMembers}
              sx={{ minWidth: 180 }}
            >
              Remove Team Members
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Members Table */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Team Members List {members.length > 0 && `(${members.length})`}
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1 }}>Loading members...</Typography>
          </Box>
        ) : members.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell>
                    <strong>ID</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Name</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Action</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell>{member._id}</TableCell>
                    <TableCell>{member.name || "N/A"}</TableCell>
                    <TableCell>{member.email || "N/A"}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => removeMember(member._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography>No members found</Typography>
          </Box>
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

export default TeamMembers;
