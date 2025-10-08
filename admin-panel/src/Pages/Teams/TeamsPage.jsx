// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
// } from "@mui/material";
// import { Delete } from "@mui/icons-material";
// import axios from "axios";

// const BASE_URL = "https://superfone-admin.onrender.com";

// const TeamsPage = () => {
//   const [members, setMembers] = useState([]);
//   const [teams, setTeams] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     teamId: "",
//   });

//   const fetchMembers = async () => {
//     const res = await axios.get(`${BASE_URL}/api/superadmin/team-members`);
//     setMembers(res.data || []);
//   };

//   const fetchTeams = async () => {
//     const res = await axios.get(`${BASE_URL}/api/superadmin/teams`);
//     setTeams(res.data || []);
//   };

//   useEffect(() => {
//     fetchMembers();
//     fetchTeams();
//   }, []);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post(`${BASE_URL}/api/superadmin/team-members/create`, formData);
//     fetchMembers();
//     setFormData({ name: "", email: "", teamId: "" });
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`${BASE_URL}/api/superadmin/team-members/${id}`);
//     fetchMembers();
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, color: "#fff" }}>
//       <Typography variant="h5" gutterBottom>
//         Team Members Management
//       </Typography>

//       <Paper sx={{ p: 3, mb: 3, backgroundColor: "#1e293b" }}>
//         <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
//           <TextField
//             label="Member Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             sx={{ flex: 1, background: "#fff", borderRadius: 1 }}
//           />
//           <TextField
//             label="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             sx={{ flex: 1, background: "#fff", borderRadius: 1 }}
//           />
//           <TextField
//             select
//             label="Select Team"
//             name="teamId"
//             value={formData.teamId}
//             onChange={handleChange}
//             SelectProps={{ native: true }}
//             sx={{ flex: 1, background: "#fff", borderRadius: 1 }}
//           >
//             <option value="">Select</option>
//             {teams.map((team) => (
//               <option key={team._id} value={team._id}>
//                 {team.name}
//               </option>
//             ))}
//           </TextField>
//           <Button variant="contained" color="primary" type="submit">
//             Add Member
//           </Button>
//         </form>
//       </Paper>

//       <TableContainer component={Paper} sx={{ background: "#1e293b" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ color: "#fff" }}>#</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Name</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Email</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Team</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {members.map((m, i) => (
//               <TableRow key={m._id}>
//                 <TableCell sx={{ color: "#fff" }}>{i + 1}</TableCell>
//                 <TableCell sx={{ color: "#fff" }}>{m.name}</TableCell>
//                 <TableCell sx={{ color: "#fff" }}>{m.email}</TableCell>
//                 <TableCell sx={{ color: "#fff" }}>
//                   {m.team?.name || "N/A"}
//                 </TableCell>
//                 <TableCell>
//                   <IconButton color="error" onClick={() => handleDelete(m._id)}>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default TeamsPage;



import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableContainer,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

const BASE_URL = "https://superfone-admin.onrender.com/api/superadmin/agent";

const AgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchAdminId, setSearchAdminId] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Show snackbar
  const showSnackbar = (message, severity) =>
    setSnackbar({ open: true, message, severity });

  // Fetch all agents
  const fetchAgents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/getagent`);
      setAgents(res.data || []);
    } catch (err) {
      console.error("Error fetching agents:", err);
      showSnackbar("Failed to load agents", "error");
    } finally {
      setLoading(false);
    }
  };

  // Search by ID
  const searchAgentById = async () => {
    if (!searchId.trim()) return showSnackbar("Enter agent ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/${searchId.trim()}`);
      setAgents([res.data]); // wrap in array to display in table
      showSnackbar("Agent found!", "success");
    } catch (err) {
      console.error(err);
      setAgents([]);
      showSnackbar("Agent not found", "error");
    } finally {
      setLoading(false);
    }
  };

  // Search agents under a specific admin
  const searchAgentsByAdmin = async () => {
    if (!searchAdminId.trim()) return showSnackbar("Enter admin ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin/${searchAdminId.trim()}`);
      setAgents(res.data || []);
      showSnackbar("Agents under admin loaded!", "success");
    } catch (err) {
      console.error(err);
      setAgents([]);
      showSnackbar("No agents found under this admin", "error");
    } finally {
      setLoading(false);
    }
  };

  // Clear search and show all
  const clearSearch = () => {
    setSearchId("");
    setSearchAdminId("");
    fetchAgents();
    showSnackbar("Showing all agents", "info");
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
      <Typography variant="h4" mb={2} fontWeight="bold">Team Details</Typography>

      {/* SEARCH */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">Search Team Details</Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-end">
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Search team details by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              fullWidth
              size="small"
            />
            <Button
              variant="outlined"
              onClick={searchAgentById}
              sx={{ mt: 1, width: "100%", bgcolor: "primary.main", color: "white" }}
            >
              Search by ID
            </Button>
          </Box>

          <Box sx={{ flex: 1 }}>
            <TextField
              label="Search team under Admin"
              value={searchAdminId}
              onChange={(e) => setSearchAdminId(e.target.value)}
              fullWidth
              size="small"
            />
            <Button
              variant="outlined"
              onClick={searchAgentsByAdmin}
              sx={{ mt: 1, width: "100%", bgcolor: "primary.main", color: "white" }}
            >
              Search Team Under Admin
            </Button>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            onClick={clearSearch}
            sx={{ height: "35px" }}
          >
            List of All Teams
          </Button>
        </Stack>
      </Paper>

      {/* AGENTS TABLE */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Team List {agents.length > 0 && `(${agents.length})`}
        </Typography>

        {loading ? (
          <Box sx={{ textAlign: "center", py: 3 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1 }}>Loading agents...</Typography>
          </Box>
        ) : agents.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Mobile</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agents.map((agent, index) => (
                  <TableRow key={agent._id || index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" }, "&:hover": { backgroundColor: "#f5f5f5" } }}>
                    <TableCell>{agent._id || "N/A"}</TableCell>
                    <TableCell>{agent.name || "N/A"}</TableCell>
                    <TableCell>{agent.email || "N/A"}</TableCell>
                    <TableCell>{agent.mobile || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h6" color="text.secondary">No agents found</Typography>
            <Button variant="outlined" onClick={fetchAgents} sx={{ mt: 1 }}>Refresh List</Button>
          </Box>
        )}
      </Paper>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AgentsPage;


