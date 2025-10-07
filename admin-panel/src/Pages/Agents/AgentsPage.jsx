// import React, { useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Switch,
//   FormControlLabel,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   FormGroup,
//   Checkbox,
//   Grid,
// } from "@mui/material";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// const AddEditAgent = () => {
//   const [agentName, setAgentName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [active, setActive] = useState(true);
//   const [department, setDepartment] = useState("");
//   const [password, setPassword] = useState("");
//   const [roleAllCalls, setRoleAllCalls] = useState(false);
//   const [roleManageContacts, setRoleManageContacts] = useState(false);
//   const [profileImage, setProfileImage] = useState(null);
//   const [filter, setFilter] = useState("All");

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) setProfileImage(URL.createObjectURL(file));
//   };

//   const handleAddContact = () => {
//     alert("Add New Contact Clicked!");
//   };

//   const handleSave = () => {
//     const agentData = {
//       agentName,
//       email,
//       phone,
//       active,
//       department,
//       password,
//       roles: {
//         allCalls: roleAllCalls,
//         manageContacts: roleManageContacts,
//       },
//     };
//     console.log(agentData);
//     alert("Agent data saved! Check console.");
//   };

//   return (
//     <Box 
//     sx={{ p: 2, background:"#334155", width:"100%",}}
//     >
//       <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", pt: 5 }}>
//         Add/Edit Agent
//       </Typography>

//       {/* Filter Buttons */}
//       <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
//         <Grid item>
//           <Button
//             variant={filter === "All" ? "contained" : "outlined"}
//             onClick={() => setFilter("All")}
//           >
//             All
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button
//             variant={filter === "Active" ? "contained" : "outlined"}
//             onClick={() => setFilter("Active")}
//           >
//             Active
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button
//             variant={filter === "Inactive" ? "contained" : "outlined"}
//             onClick={() => setFilter("Inactive")}
//           >
//             Inactive
//           </Button>
//         </Grid>

//         <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddContact}
//           >
//             + Add New Contact
//           </Button>
//         </Grid>
//       </Grid>

//       {/* Main Form */}
//       <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
//         {/* Left Panel */}
//         <Paper sx={{ p: 3, flex: 1, height: "350px" }}>
//           <Stack spacing={2} alignItems="center">
//             <Box
//               sx={{
//                 width: 100,
//                 height: 100,
//                 borderRadius: "50%",
//                 border: "2px dashed black",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 mb: 2,
//                 mx: "auto",
//                 overflow: "hidden",
//                 position: "relative",
//                 cursor: "pointer",
//               }}
//             >
//               {profileImage ? (
//                 <img
//                   src={profileImage}
//                   alt="Profile"
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }}
//                 />
//               ) : (
//                 <Typography variant="caption" color="black" fontWeight="bold">
//                   Upload
//                 </Typography>
//               )}
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 style={{
//                   position: "absolute",
//                   width: "100%",
//                   height: "100%",
//                   opacity: 0,
//                   cursor: "pointer",
//                 }}
//               />
//               <CameraAltIcon
//                 sx={{ fontSize: 60, color: "#555", position: "absolute" }}
//               />
//             </Box>

//             <Typography>Profile Picture Upload</Typography>

//             <TextField
//               fullWidth
//               size="small"
//               label="Agent Name"
//               value={agentName}
//               onChange={(e) => setAgentName(e.target.value)}
//             />
//             <TextField
//               fullWidth
//               size="small"
//               label="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               fullWidth
//               size="small"
//               label="Phone Number"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </Stack>
//         </Paper>

//         {/* Right Panel */}
//         <Paper sx={{ p: 3, flex: 1 }}>
//           <Stack spacing={2}>
//             <FormControl fullWidth size="small">
//               <InputLabel>Assign Department</InputLabel>
//               <Select
//                 value={department}
//                 onChange={(e) => setDepartment(e.target.value)}
//               >
//                 <MenuItem value="Sales">Sales</MenuItem>
//                 <MenuItem value="Support">Support</MenuItem>
//                 <MenuItem value="Marketing">Marketing</MenuItem>
//               </Select>
//             </FormControl>

//             <TextField
//               fullWidth
//               size="small"
//               label="New Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               InputProps={{ endAdornment: <VisibilityIcon /> }}
//             />

//             <TextField
//               fullWidth
//               size="small"
//               label="Agent (Own Calls Only)"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               InputProps={{ endAdornment: <VisibilityIcon /> }}
//             />

//             <Typography variant="subtitle1">
//               Assign Roles / Permissions
//             </Typography>

//             <FormGroup>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={roleAllCalls}
//                     onChange={(e) => setRoleAllCalls(e.target.checked)}
//                   />
//                 }
//                 label="Can view all calls"
//               />
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={roleManageContacts}
//                     onChange={(e) => setRoleManageContacts(e.target.checked)}
//                   />
//                 }
//                 label="Can manage contacts"
//               />
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={active}
//                     onChange={(e) => setActive(e.target.checked)}
//                   />
//                 }
//                 label="Active"
//               />
//             </FormGroup>
//           </Stack>
//         </Paper>
//       </Stack>

//        {/* Save Button */}
//            <Box textAlign="center" sx={{ mt: 3 }}>
//              <Button
//                variant="contained"
//                color="primary"
//                size="large"
//                onClick={() => handlePopup("Agent Saved!")}
//              >
//                Save Agent
//              </Button>
//            </Box>
     
//     </Box>
//   );
// };

// export default AddEditAgent;


// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   TextField,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   useMediaQuery,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import { useTheme } from "@mui/material/styles";
// import axios from "axios";

// // ✅ Base URL
// const BASE_URL = "https://superfone-admin.onrender.com";

// const AgentsPage = () => {
//   const [agents, setAgents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [openEdit, setOpenEdit] = useState(false);
//   const [selectedAgent, setSelectedAgent] = useState(null);
//   const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });

//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   // ✅ Fetch all agents
//   const fetchAgents = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${BASE_URL}/api/superadmin/agent/getagent`);
//       setAgents(res.data || []);
//     } catch (error) {
//       console.error("Error fetching agents:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAgents();
//   }, []);

//   // ✅ Open Edit Dialog
//   const handleEditOpen = (agent) => {
//     setSelectedAgent(agent);
//     setFormData({
//       name: agent.name || "",
//       email: agent.email || "",
//       mobile: agent.mobile || "",
//     });
//     setOpenEdit(true);
//   };

//   // ✅ Update Agent
//   const handleUpdate = async () => {
//     try {
//       await axios.patch(`${BASE_URL}/api/superadmin/agent/${selectedAgent._id}`, formData);
//       setOpenEdit(false);
//       fetchAgents();
//     } catch (error) {
//       console.error("Error updating agent:", error);
//     }
//   };

//   // ✅ Delete Agent
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this agent?")) return;
//     try {
//       await axios.delete(`${BASE_URL}/api/superadmin/agent/${id}`);
//       fetchAgents();
//     } catch (error) {
//       console.error("Error deleting agent:", error);
//     }
//   };

//   // ✅ Handle form changes
//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   return (
//     <Box p={isSmallScreen ? 2 : 4}>
//       <Typography variant="h5" fontWeight="bold" mb={3}>
//         Agent Management
//       </Typography>

//       {loading ? (
//         <Box display="flex" justifyContent="center" mt={5}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 3 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }}>Mobile</TableCell>
//                 <TableCell sx={{ fontWeight: "bold" }} align="center">
//                   Actions
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {agents.length > 0 ? (
//                 agents.map((agent) => (
//                   <TableRow key={agent._id} hover>
//                     <TableCell>{agent.name}</TableCell>
//                     <TableCell>{agent.email}</TableCell>
//                     <TableCell>{agent.mobile}</TableCell>
//                     <TableCell align="center">
//                       <IconButton color="primary" onClick={() => handleEditOpen(agent)}>
//                         <Edit />
//                       </IconButton>
//                       <IconButton color="error" onClick={() => handleDelete(agent._id)}>
//                         <Delete />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={4} align="center">
//                     No agents found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* ✅ Edit Agent Dialog */}
//       <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Edit Agent</DialogTitle>
//         <DialogContent>
//           <Box display="flex" flexDirection="column" gap={2} mt={1}>
//             <TextField
//               label="Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               fullWidth
//             />
//             <TextField
//               label="Email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               fullWidth
//             />
//             <TextField
//               label="Mobile"
//               name="mobile"
//               value={formData.mobile}
//               onChange={handleChange}
//               fullWidth
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleUpdate}>
//             Save Changes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AgentsPage;

import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  TableContainer,
  MenuItem,
  Chip,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Delete, Edit, Visibility, Refresh } from "@mui/icons-material";
import axios from "axios";

const BASE_URL = "https://superfone-admin.onrender.com";

const AgentsPage = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [editId, setEditId] = useState(null);
  const [viewDialog, setViewDialog] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [adminId, setAdminId] = useState("");
  const [searchId, setSearchId] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const token = localStorage.getItem("token");

  // ✅ Fetch all agents
  const fetchAllAgents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/agent/getagent`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgents(res.data || []);
      setSnackbar({ open: true, message: "All agents loaded successfully!", severity: "success" });
    } catch (error) {
      console.error("Error fetching agents:", error);
      setSnackbar({ open: true, message: "Failed to fetch agents", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Get agent by ID
  const fetchAgentById = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/agent/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgents([res.data]); // Display single agent
      setSnackbar({ open: true, message: "Agent found successfully!", severity: "success" });
    } catch (error) {
      console.error("Error fetching agent by ID:", error);
      setSnackbar({ open: true, message: "Agent not found", severity: "error" });
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Get agents by admin ID
  const fetchAgentsByAdmin = async (adminId) => {
    if (!adminId) return;
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/agent/admin/${adminId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgents(res.data || []);
      setSnackbar({ open: true, message: `Agents under admin ${adminId} loaded!`, severity: "success" });
    } catch (error) {
      console.error("Error fetching agents by admin:", error);
      setSnackbar({ open: true, message: "No agents found for this admin", severity: "error" });
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update agent
  const handleUpdateAgent = async (e) => {
    e.preventDefault();
    if (!editId) return;
    
    setActionLoading(true);
    try {
      const res = await axios.patch(`${BASE_URL}/api/superadmin/agent/${editId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({ open: true, message: "Agent updated successfully!", severity: "success" });
      setFormData({ name: "", email: "", mobile: "" });
      setEditId(null);
      fetchAllAgents(); // Refresh the list
    } catch (error) {
      console.error("Error updating agent:", error);
      setSnackbar({ open: true, message: "Failed to update agent", severity: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Delete agent
  const handleDeleteAgent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this agent?")) return;
    
    setActionLoading(true);
    try {
      await axios.delete(`${BASE_URL}/api/superadmin/agent/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({ open: true, message: "Agent deleted successfully!", severity: "success" });
      fetchAllAgents(); // Refresh the list
    } catch (error) {
      console.error("Error deleting agent:", error);
      setSnackbar({ open: true, message: "Failed to delete agent", severity: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ View agent details
  const handleViewAgent = async (id) => {
    setActionLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/agent/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedAgent(res.data);
      setViewDialog(true);
    } catch (error) {
      console.error("Error fetching agent details:", error);
      setSnackbar({ open: true, message: "Failed to load agent details", severity: "error" });
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Handle edit
  const handleEdit = (agent) => {
    setFormData({
      name: agent.name || "",
      email: agent.email || "",
      mobile: agent.mobile || "",
    });
    setEditId(agent._id);
  };

  // ✅ Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Reset to show all agents
  const handleReset = () => {
    setSearchId("");
    setAdminId("");
    fetchAllAgents();
  };

  useEffect(() => {
    if (token) {
      fetchAllAgents();
    }
  }, [token]);

  return (
    <Box sx={{ p: 2, pt: 4, minHeight: "100vh", background: "#1e293b", color: "#fff" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, }}>
        Agent Management
      </Typography>

      {/* Search and Filter Section */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb:2}}>
          Search & Filter Agents
        </Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-end">
          <TextField
            label="Search by Agent ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            size="small"
            fullWidth
            placeholder="Enter agent ID"
          />

          <Button 
            variant="contained" 
            onClick={() => fetchAgentById(searchId)}
            disabled={!searchId || loading}
          >
            Search Agent
          </Button>

          <TextField
            label="Filter by Admin ID"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            size="small"
            fullWidth
            placeholder="Enter admin ID"
          />

          <Button 
            variant="contained" 
            onClick={() => fetchAgentsByAdmin(adminId)}
            disabled={!adminId || loading}
          >
            Filter by Admin
          </Button>

          <Button 
            variant="outlined" 
            onClick={handleReset}
            startIcon={<Refresh />}
            disabled={loading}
          >
            Reset
          </Button>

          <Button 
            variant="contained" 
            onClick={fetchAllAgents}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Load All Agents"}
          </Button>
          
        </Stack>
      </Paper>

      {/* Update Agent Form */}
      {editId && (
        <Paper sx={{ p: 3, mb: 4, borderRadius: 3, border: "2px solid #1976d2" }}>
          <Typography variant="h6" sx={{ mb: 2, color: "#1976d2" }}>
            Update Agent (ID: {editId})
          </Typography>
          <form onSubmit={handleUpdateAgent}>
            <Stack spacing={2}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                size="small"
                fullWidth
                required
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                size="small"
                fullWidth
                required
              />
              <TextField
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                size="small"
                fullWidth
              />
              <Stack direction="row" spacing={2}>
                <Button type="submit" variant="contained" disabled={actionLoading}>
                  {actionLoading ? <CircularProgress size={24} /> : "Update Agent"}
                </Button>
                <Button 
                  variant="outlined" 
                  onClick={() => {
                    setEditId(null);
                    setFormData({ name: "", email: "", mobile: "" });
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>
      )}

      {/* Agents Table */}
      <Paper sx={{ p: 2, borderRadius: 3, background: "#283645", overflowX: "auto" }}>
        <Typography variant="h6" sx={{ mb: 2, color: "#fff" }}>
          Agents List {agents.length > 0 && `(${agents.length} found)`}
        </Typography>
        
        {loading ? (
          <Box textAlign="center" p={4}>
            <CircularProgress color="inherit" />
            <Typography sx={{ mt: 2, color: "#fff" }}>Loading agents...</Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Mobile</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Agent ID</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Status</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agents.length > 0 ? (
                  agents.map((agent) => (
                    <TableRow key={agent._id} hover>
                      <TableCell sx={{ color: "#fff" }}>{agent.name}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{agent.email}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{agent.mobile || "-"}</TableCell>
                      <TableCell sx={{ color: "#fff", fontFamily: "monospace" }}>
                        {agent._id}
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={agent.status || "Active"} 
                          color={agent.status === "inactive" ? "error" : "success"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton color="info" onClick={() => handleViewAgent(agent._id)}>
                          <Visibility />
                        </IconButton>
                        <IconButton color="primary" onClick={() => handleEdit(agent)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteAgent(agent._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: "center", color: "#fff", py: 4 }}>
                      No agents found. Try searching or loading all agents.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Agent Details Dialog */}
      <Dialog open={viewDialog} onClose={() => setViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6">Agent Details</Typography>
        </DialogTitle>
        <DialogContent>
          {selectedAgent && (
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>Personal Information</Typography>
                  <Stack spacing={1}>
                    <Typography><strong>Name:</strong> {selectedAgent.name}</Typography>
                    <Typography><strong>Email:</strong> {selectedAgent.email}</Typography>
                    <Typography><strong>Mobile:</strong> {selectedAgent.mobile || "Not provided"}</Typography>
                    <Typography><strong>Agent ID:</strong> <code>{selectedAgent._id}</code></Typography>
                  </Stack>
                </CardContent>
              </Card>
              
              {selectedAgent.adminId && (
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Admin Information</Typography>
                    <Typography><strong>Admin ID:</strong> <code>{selectedAgent.adminId}</code></Typography>
                  </CardContent>
                </Card>
              )}
              
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>Status</Typography>
                  <Chip 
                    label={selectedAgent.status || "Active"} 
                    color={selectedAgent.status === "inactive" ? "error" : "success"}
                  />
                </CardContent>
              </Card>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialog(false)}>Close</Button>
          {selectedAgent && (
            <Button 
              variant="contained" 
              onClick={() => {
                handleEdit(selectedAgent);
                setViewDialog(false);
              }}
            >
              Edit Agent
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AgentsPage;
