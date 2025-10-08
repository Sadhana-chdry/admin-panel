// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   InputAdornment,
//   IconButton,
//   TableContainer,
//   Table,
//   TableHead,
//   TableCell,
//   TableRow,
//   TableBody,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import DownloadIcon from "@mui/icons-material/Download";

// const AgentProfile = () => {
//   const [profileImage, setProfileImage] = useState(null);
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [popupMessage, setPopupMessage] = useState("");

//   const callHistory = [
//     {
//       number: "123-456-7890",
//       date: "2025-09-27",
//       time: "10:30 AM",
//       status: "Completed",
//     },
//     {
//       number: "987-654-3210",
//       date: "2025-09-26",
//       time: "02:15 PM",
//       status: "Missed",
//     },
//     {
//       number: "555-555-5555",
//       date: "2025-09-25",
//       time: "11:45 AM",
//       status: "Completed",
//     },
//   ];

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(URL.createObjectURL(file));
//     }
//   };

//   // Open popup with message
//   const handlePopup = (message) => {
//     setPopupMessage(message);
//     setPopupOpen(true);
//   };

//   const handleClosePopup = () => {
//     setPopupOpen(false);
//     setPopupMessage("");
//   };

//   return (
//     <Box
//       sx={{
//         p: 1,
//         minHeight: "100vh",
//         background: "#1e293b",
//         color: "#fff",
//         pt: 5,
//         width:"100%",
//       }}
//     >
//       {/* Header */}
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
//         Agent Profile: Sadhana Chaudhary
//       </Typography>

//       {/* Top Row */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           alignItems: { xs: "stretch", md: "center" },
//           justifyContent: "space-between",
//           gap: 2,
//           mb: 3,
//         }}
//       >
//         <TextField
//           placeholder="Search Agent..."
//           size="small"
//           variant="outlined"
//           sx={{ flex: 1, maxWidth: 200, background: "#fff", borderRadius: 1 }}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton>
//                   <SearchIcon />
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<DownloadIcon />}
//           sx={{ flexShrink: 0 }}
//           onClick={() => handlePopup("Download Report clicked!")}
//         >
//           Download Report
//         </Button>
//       </Box>

//       {/* Two Column Layout */}
//       <Grid container spacing={3}>
//         {/* LEFT SIDE */}
//         <Grid item xs={12} md={5}>
//           <Paper
//             sx={{
//               p: 3,
//               background: "#283645",
//               borderRadius: 2,
//               minHeight: 200,
//               width: { xs: "100%", sm: 300, md: 300 },
//             }}
//           >
//             <Box
//               sx={{
//                 width: 110,
//                 height: 110,
//                 borderRadius: "50%",
//                 border: "2px dashed #ccc",
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
//                 <Typography variant="caption" color="white" fontWeight="bold">
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
//             </Box>

//             <Typography
//               sx={{ fontWeight: "bold", textAlign: "center", color: "white" }}
//             >
//               Sadhana Chaudhary
//             </Typography>
//             <Typography
//               sx={{ fontWeight: "normal", textAlign: "center", color: "white" }}
//             >
//               Bitmax Solution
//             </Typography>

//             <Box
//               sx={{
//                 borderBottom: "2px solid black",
//                 width: "100%",
//                 mx: "auto",
//                 my: 2,
//               }}
//             />

//             <Typography style={{ color: "white" }}>
//               Email: sadhana@bitmax.com
//             </Typography>
//             <Typography style={{ color: "white" }}>
//               Phone: 123-566-990
//             </Typography>
//             <Typography style={{ color: "white" }}>Status: Online</Typography>
//           </Paper>
//         </Grid>

//         {/* RIGHT SIDE */}
//         <Grid item xs={12} md={7}>
//           <Grid container spacing={2} sx={{ mb: 2 }}>
//             {[
//               { title: "Calls Mode", subtitle: "350" },
//               { title: "Talk Time", subtitle: "8h 30min" },
//               { title: "Missed Call", subtitle: "13h 2min" },
//               { title: "Average Duration", subtitle: "2:45min" },
//             ].map((card, index) => (
//               <Grid item xs={6} sm={3} key={index}>
//                 <Paper
//                   sx={{
//                     p: 1,
//                     borderRadius: 2,
//                     background: "#283645",
//                     color: "#fff",
//                     textAlign: "center",
//                     minWidth: 100,
//                   }}
//                 >
//                   <Typography variant="subtitle2">{card.title}</Typography>
//                   <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                     {card.subtitle}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>

//           <Box
//             sx={{
//               borderBottom: "1px solid white",
//               width: "100%",
//               mx: "auto",
//               my: 2,
//             }}
//           />

//           <Paper
//             sx={{
//               p: 2,
//               borderRadius: 2,
//               background: "#283645",
//               color: "#fff",
//               width: 540,
//               height: 240,
//             }}
//           >
//             <TableContainer>
//               <Table size="small">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                       Call History
//                     </TableCell>
//                     <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                       Number
//                     </TableCell>
//                     <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                       Date
//                     </TableCell>
//                     <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                       Time
//                     </TableCell>
//                     <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                       Status
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {callHistory.map((call, index) => (
//                     <TableRow key={index}>
//                       <TableCell sx={{ color: "#fff" }}>
//                         Call {index + 1}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {call.number}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>{call.date}</TableCell>
//                       <TableCell sx={{ color: "#fff" }}>{call.time}</TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {call.status}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Save Button */}
//       <Box textAlign="center" sx={{ mt: 3 }}>
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           onClick={() => handlePopup("Agent Saved!")}
//         >
//           Save Agent
//         </Button>
//       </Box>

//       {/* Popup Dialog */}
//       <Dialog
//         open={popupOpen}
//         onClose={handleClosePopup}
//         PaperProps={{
//           sx: {
//             backgroundColor: "#283645", // dark background
//             color: "#fff", // white text
//             borderRadius: 3, // rounded corners
//             minWidth: 300,
//             p: 2,
//           },
//         }}
//       >
//         <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
//           Notification
//         </DialogTitle>
//         <DialogContent>
//           <Typography sx={{ textAlign: "center", mt: 1 }}>
//             {popupMessage}
//           </Typography>
//         </DialogContent>
//         <DialogActions sx={{ justifyContent: "center", mb: 1 }}>
//           <Button
//             onClick={handleClosePopup}
//             variant="contained"
//             color="primary"
//             sx={{ borderRadius: 2, minWidth: 80 }}
//           >
//             OK
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AgentProfile;




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

const AgentsDetails = () => {
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
      <Typography variant="h4" mb={2} fontWeight="bold">Agents Details</Typography>

      {/* SEARCH */}
      <Paper sx={{ p: 2, mb: 2, backgroundColor: "#f8f9fa" }}>
        <Typography variant="h6" mb={2} fontWeight="bold">Search Agents</Typography>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-end">
          <Box sx={{ flex: 1 }}>
            <TextField
              label="Search by Agent ID"
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
              label="Search by Admin ID"
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
              Search by Admin
            </Button>
          </Box>

          <Button
            variant="contained"
            color="secondary"
            onClick={clearSearch}
            sx={{ height: "35px" }}
          >
            Show All Agents
          </Button>
        </Stack>
      </Paper>

      {/* AGENTS TABLE */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" mb={2} fontWeight="bold">
          Agents List {agents.length > 0 && `(${agents.length})`}
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

export default AgentsDetails;
