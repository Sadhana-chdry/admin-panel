// // import React, { useState } from "react";
// // import {
// //   Drawer,
// //   List,
// //   ListItem,
// //   ListItemButton,
// //   ListItemText,
// //   ListItemIcon,
// //   Toolbar,
// //   Typography,
// //   Box,
// //   Collapse,
// // } from "@mui/material";
// // import {
// //   Dashboard,
// //   People,
// //   Business,
// //   ExpandLess,
// //   ExpandMore,
// //   Logout,
// // } from "@mui/icons-material";
// // import { Link, useLocation, useNavigate } from "react-router-dom";

// // const drawerWidth = 240;

// // const Sidebar = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const [companyOpen, setCompanyOpen] = useState(false);
// //   const [companyAgentsOpen, setCompanyAgentsOpen] = useState(false);
// //   const [agentsTeamsOpen, setAgentsTeamsOpen] = useState(false);

// //   const handleCompanyClick = () => setCompanyOpen(!companyOpen);
// //   const handleCompanyAgentsClick = () =>
// //     setCompanyAgentsOpen(!companyAgentsOpen);
// //   const handleAgentsTeamsClick = () => setAgentsTeamsOpen(!agentsTeamsOpen);

// //   const handleLogout = () => {
// //     localStorage.removeItem("authToken");
// //     navigate("/login");
// //   };

// //   return (
// //     <Drawer
// //       variant="permanent"
// //       sx={{
// //         width: drawerWidth,
// //         [`& .MuiDrawer-paper`]: {
// //           width: drawerWidth,
// //           boxSizing: "border-box",
// //           background: "#334155",
// //           mt: 5,
// //           height: "calc(100vh - 20px)",
// //           overflowY: "auto",
// //         },
// //       }}
// //     >
// //       <Toolbar sx={{ justifyContent: "center" }}>
// //         <Typography variant="h6" sx={{ color: "#fff" }}>
// //           Admin Panel
// //         </Typography>
// //       </Toolbar>

// //       <List>
// //         {/* Dashboard */}
// //         <ListItem disablePadding>
// //           <ListItemButton
// //             component={Link}
// //             to="/"
// //             selected={location.pathname === "/"}
// //             sx={{ color: "#fff" }}
// //           >
// //             <ListItemIcon sx={{ color: "#fff" }}>
// //               <Dashboard />
// //             </ListItemIcon>
// //             <ListItemText primary="Dashboard" />
// //           </ListItemButton>
// //         </ListItem>

// //         {/* Companies */}
// //         <ListItem disablePadding>
// //           <ListItemButton onClick={handleCompanyClick} sx={{ color: "#fff" }}>
// //             <ListItemIcon sx={{ color: "#fff" }}>
// //               <Business />
// //             </ListItemIcon>
// //             <ListItemText primary="Companies" />
// //             {companyOpen ? <ExpandLess /> : <ExpandMore />}
// //           </ListItemButton>
// //         </ListItem>

// //         <Collapse in={companyOpen} timeout="auto" unmountOnExit>
// //           <List component="div" disablePadding>
// //             <ListItemButton
// //               component={Link}
// //               to="/companies/contact-list"
// //               sx={{ pl: 4, color: "#fff" }}
// //               selected={location.pathname === "/companies/contact-list"}
// //             >
// //               <ListItemText primary="Contact List" />
// //             </ListItemButton>

// //             <ListItemButton
// //               component={Link}
// //               to="/companies/add-edit-contact"
// //               sx={{ pl: 4, color: "#fff" }}
// //               selected={location.pathname === "/companies/add-edit-contact"}
// //             >
// //               <ListItemText primary="Add/Edit Contact" />
// //             </ListItemButton>

// //             <ListItemButton
// //               component={Link}
// //               to="/companies/call-log"
// //               sx={{ pl: 4, color: "#fff" }}
// //               selected={location.pathname === "/companies/call-log"}
// //             >
// //               <ListItemText primary="Call Log" />
// //             </ListItemButton>

// //             <ListItemButton
// //               component={Link}
// //               to="/companies/call-details"
// //               sx={{ pl: 4, color: "#fff" }}
// //               selected={location.pathname === "/companies/call-details"}
// //             >
// //               <ListItemText primary="Call Details" />
// //             </ListItemButton>

// //             {/* Agents inside Companies */}
// //             <ListItemButton
// //               onClick={handleCompanyAgentsClick}
// //               sx={{ pl: 4, color: "#fff" }}
// //             >
// //               <ListItemText primary="Agents" />
// //               {companyAgentsOpen ? <ExpandLess /> : <ExpandMore />}
// //             </ListItemButton>

// //             <Collapse in={companyAgentsOpen} timeout="auto" unmountOnExit>
// //               <List component="div" disablePadding>
// //                 <ListItemButton
// //                   component={Link}
// //                   to="/agents/add-edit"
// //                   sx={{ pl: 8, color: "#fff" }}
// //                   selected={location.pathname === "/agents/add-edit"}
// //                 >
// //                   <ListItemText primary="Add/Edit Agent" />
// //                 </ListItemButton>

// //                 <ListItemButton
// //                   component={Link}
// //                   to="/agents/profile"
// //                   sx={{ pl: 8, color: "#fff" }}
// //                   selected={location.pathname === "/agents/profile"}
// //                 >
// //                   <ListItemText primary="Agent Profile" />
// //                 </ListItemButton>

// //                 {/* Teams submenu */}
// //                 <ListItemButton
// //                   onClick={handleAgentsTeamsClick}
// //                   sx={{ pl: 8, color: "#fff" }}
// //                 >
// //                   <ListItemText primary="Teams" />
// //                   {agentsTeamsOpen ? <ExpandLess /> : <ExpandMore />}
// //                 </ListItemButton>

// //                 <Collapse in={agentsTeamsOpen} timeout="auto" unmountOnExit>
// //                   <List component="div" disablePadding>
// //                     <ListItemButton
// //                       component={Link}
// //                       to="/teams/team"
// //                       sx={{ pl: 12, color: "#fff" }}
// //                       selected={location.pathname === "/teams/team"}
// //                     >
// //                       <ListItemText primary="Team" />
// //                     </ListItemButton>

// //                     <ListItemButton
// //                       component={Link}
// //                       to="/teams/member"
// //                       sx={{ pl: 12, color: "#fff" }}
// //                       selected={location.pathname === "/teams/member"}
// //                     >
// //                       <ListItemText primary="Team Member" />
// //                     </ListItemButton>
// //                   </List>
// //                 </Collapse>
// //               </List>
// //             </Collapse>
// //           </List>
// //         </Collapse>
// //       </List>

// //       {/* Footer */}
// //       <Typography
// //         variant="caption"
// //         sx={{
// //           mr: 5,
// //           mt: 40,
// //           display: "block",
// //           textAlign: "center",
// //           color: "#888",
// //           height: { xs: 120, sm: 150, md: 180, lg: 500 },
// //         }}
// //       >
// //         Powered by{" "}
// //         <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
// //           Bitmax
// //         </Box>
// //       </Typography>
// //     </Drawer>
// //   );
// // };

// // export default Sidebar;


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


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const TeamsMembers = ({ teamId }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const { data } = await axios.get(
        `https://superfone-admin.onrender.com/api/superadmin/teammember/${teamId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );
      setMembers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching team members:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (memberId) => {
    try {
      await axios.delete(
        `https://superfone-admin.onrender.com/api/superadmin/teammember/${memberId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );
      setMembers(members.filter((m) => m._id !== memberId));
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  useEffect(() => {
    if (teamId) fetchMembers();
  }, [teamId]);

  if (loading) return <CircularProgress color="primary" />;

  return (
    <Box>
      <Typography variant="h5" mb={2} sx={{ color: "#fff" }}>
        Team Members
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Member ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member._id}>
                <TableCell>{member._id}</TableCell>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(member._id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TeamsMembers;
