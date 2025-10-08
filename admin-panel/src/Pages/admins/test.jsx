// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Paper,
//   Stack,
//   TextField,
//   Button,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// import AdminPage from "./CreateAdmin";

// const BASE_URL = "https://superfone-admin.onrender.com";

// const AdminDetails = () => {
//   const [admins, setAdmins] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [editAdmin, setEditAdmin] = useState({
//     companyID: "",
//     name: "",
//     email: "",
//     password: "",
//     mobileNumber: "",
//     role: "",
//   });

//    // ✅ Open Add Dialog
//   const handleOpenAddDialog = () => {
//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       mobile: "",
//       companyId: "",
//       global_role: "",
//     });
//     setEditId(null);
//     setOpenDialog(true);
//   };

//   const showSnackbar = (message, severity = "success") =>
//     setSnackbar({ open: true, message, severity });

//   // Fetch all admins
//   const fetchAdmins = async () => {
//     setLoading(true);
//     try {
//       const token =
//         localStorage.getItem("authToken") || localStorage.getItem("token");
//       const res = await axios.get(`${BASE_URL}/api/superadmin/users/admin`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAdmins(Array.isArray(res.data) ? res.data : [res.data]);
//     } catch (err) {
//       console.error(err);
//       showSnackbar("Failed to fetch admins", "error");
//       setAdmins([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Search admin by ID
//   const fetchAdminById = async () => {
//     if (!searchId.trim()) return showSnackbar("Enter admin ID", "warning");
//     setLoading(true);
//     try {
//       const token =
//         localStorage.getItem("authToken") || localStorage.getItem("token");
//       const res = await axios.get(
//         `${BASE_URL}/api/superadmin/users/${searchId.trim()}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setAdmins([res.data]);
//       showSnackbar("Admin found!", "success");
//     } catch (err) {
//       console.error(err);
//       setAdmins([]);
//       showSnackbar("Admin not found", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete admin
//   const deleteAdmin = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this admin?")) return;
//     try {
//       const token =
//         localStorage.getItem("authToken") || localStorage.getItem("token");
//       await axios.delete(`${BASE_URL}/api/superadmin/users/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       showSnackbar("Admin deleted successfully!");
//       fetchAdmins();
//     } catch (err) {
//       console.error(err);
//       showSnackbar("Failed to delete admin", "error");
//     }
//   };

//   // Open edit dialog
//   const openEditDialog = (admin) => {
//     setEditAdmin({ ...admin });
//     setEditDialogOpen(true);
//   };

//   // Update admin
//   const updateAdmin = async () => {
//     try {
//       const token =
//         localStorage.getItem("authToken") || localStorage.getItem("token");
//       await axios.patch(
//         `${BASE_URL}/api/superadmin/users/${editAdmin._id}`,
//         editAdmin,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       showSnackbar("Admin updated successfully!");
//       setEditDialogOpen(false);
//       fetchAdmins();
//     } catch (err) {
//       console.error(err);
//       showSnackbar("Failed to update admin", "error");
//     }
//   };

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   return (
//     <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
//       <Typography variant="h4" mb={2} fontWeight="bold">
//         Admins Details
//       </Typography>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleOpenAddDialog}
//         sx={{ mb: 3 }}
//       >
//         Add Admin
//       </Button>

//       {/* Search */}
//       <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
//         <TextField
//           sx={{ backgroundColor: "white" }}
//           label="Search by ID"
//           size="small"
//           value={searchId}
//           onChange={(e) => setSearchId(e.target.value)}
//           fullWidth
//         />
//         <Button
//           variant="contained"
//           onClick={fetchAdminById}
//           sx={{ minWidth: 120 }}
//         >
//           Search
//         </Button>
//         <Button
//           variant="contained"
//           onClick={fetchAdmins}
//           sx={{ minWidth: 120 }}
//         >
//           Show All
//         </Button>
//       </Stack>

//       {/* Admin Table */}
//       <Paper>
//         {loading ? (
//           <Box sx={{ textAlign: "center", py: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
//                   <TableCell align="center">Company ID</TableCell>
//                   <TableCell align="center">Name</TableCell>
//                   <TableCell align="center">Email</TableCell>
//                   <TableCell align="center">Password</TableCell>
//                   <TableCell align="center">Mobile Number</TableCell>
//                   <TableCell align="center">Global Role</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {admins.map((admin) => (
//                   <TableRow key={admin._id}>
//                     <TableCell align="center">{admin._id}</TableCell>
//                     <TableCell align="center">{admin.name}</TableCell>
//                     <TableCell align="center">{admin.email}</TableCell>
//                     <TableCell align="center">{admin.password}</TableCell>
//                     <TableCell align="center">{admin.mobileNumber}</TableCell>
//                     <TableCell align="center">{admin.role}</TableCell>
//                     <TableCell align="center">
//                       <Stack
//                         direction="row"
//                         spacing={1}
//                         justifyContent="center"
//                       >
//                         <IconButton
//                           color="primary"
//                           onClick={() => openEditDialog(admin)}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton
//                           color="error"
//                           onClick={() => deleteAdmin(admin._id)}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </Stack>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Paper>

//       {/* Edit Dialog */}
//       <Dialog
//         open={editDialogOpen}
//         onClose={() => setEditDialogOpen(false)}
//         fullWidth
//       >
//         <DialogTitle>Edit Admin</DialogTitle>
//         <DialogContent>
//           <Stack spacing={2} mt={1}>
//             <TextField
//               label="Name"
//               value={editAdmin.name}
//               onChange={(e) =>
//                 setEditAdmin({ ...editAdmin, name: e.target.value })
//               }
//               fullWidth
//             />
//             <TextField
//               label="Email"
//               value={editAdmin.email}
//               onChange={(e) =>
//                 setEditAdmin({ ...editAdmin, email: e.target.value })
//               }
//               fullWidth
//             />
//             <TextField
//               label="Password"
//               value={editAdmin.password}
//               onChange={(e) =>
//                 setEditAdmin({ ...editAdmin, password: e.target.value })
//               }
//               fullWidth
//             />
//             <TextField
//               label="Mobile Number"
//               value={editAdmin.mobileNumber}
//               onChange={(e) =>
//                 setEditAdmin({ ...editAdmin, mobileNumber: e.target.value })
//               }
//               fullWidth
//             />
//             <TextField
//               label="Global Role"
//               value={editAdmin.role}
//               onChange={(e) =>
//                 setEditAdmin({ ...editAdmin, role: e.target.value })
//               }
//               fullWidth
//             />
//           </Stack>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
//           <Button variant="contained" onClick={updateAdmin}>
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AdminDetails;





// Create AdminPage

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Table,
//   TableHead,
//   TableCell,
//   TableRow,
//   TableBody,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   IconButton,
//   TableContainer,
// } from "@mui/material";
// import { Edit, Delete } from "@mui/icons-material";
// import axios from "axios";

// const BASE_URL = "https://superfone-admin.onrender.com";

// const AdminPage = () => {
//   const [admins, setAdmins] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     mobile: "",
//     companyId: "",
//     global_role: "",
//   });
//   const [editId, setEditId] = useState(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   const token = localStorage.getItem("token");

//   // Fetch all admins
//   const fetchAdmins = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/superadmin/users/admin`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAdmins(res.data || []);
//     } catch (error) {
//       console.error(error);
//       setSnackbar({ open: true, message: "Failed to fetch admins", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchAdmins();
//   }, [token]);

//   // Handle form changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Add or update admin
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       if (editId) {
//         await axios.patch(`${BASE_URL}/api/superadmin/users/${editId}`, formData, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSnackbar({ open: true, message: "Admin updated successfully!", severity: "success" });
//         setEditId(null);
//       } else {
//         await axios.post(`${BASE_URL}/api/superadmin/users/createAdmin`, formData, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setSnackbar({ open: true, message: "Admin added successfully!", severity: "success" });
//       }
//       setFormData({ name: "", email: "", password: "", mobile: "", companyId: "", global_role: "" });
//       fetchAdmins();
//     } catch (error) {
//       console.error(error);
//       setSnackbar({ open: true, message: "Failed to save admin", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete admin
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this admin?")) return;
//     setLoading(true);
//     try {
//       await axios.delete(`${BASE_URL}/api/superadmin/users/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setSnackbar({ open: true, message: "Admin deleted successfully!", severity: "success" });
//       fetchAdmins();
//     } catch (error) {
//       console.error(error);
//       setSnackbar({ open: true, message: "Failed to delete admin", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Edit admin
//   const handleEdit = (admin) => {
//     setFormData({
//       name: admin.name || "",
//       email: admin.email || "",
//       password: "",
//       mobile: admin.mobile || "",
//       companyId: admin.companyId || "",
//       global_role: admin.global_role || "",
//     });
//     setEditId(admin._id);
//   };

//   return (
//     <Box sx={{ p: 2, pt: 5, minHeight: "100vh", background: "#1e293b", color: "#fff" }}>
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//         Admin Dashboard
//       </Typography>

//       {/* Admin Form */}
//       <Paper sx={{ p: 2, mb: 4, borderRadius: 3 }}>
//         <Typography variant="h6" sx={{ mb: 2 }}>
//           {editId ? "Edit Admin" : "Add New Admin"}
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Stack spacing={2}>
//             <TextField label="Name" name="name" value={formData.name} onChange={handleChange} size="small" fullWidth required />
//             <TextField label="Email" name="email" value={formData.email} onChange={handleChange} size="small" fullWidth required />
//             <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} size="small" fullWidth required={!editId} />
//             <TextField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} size="small" fullWidth />
//             <TextField label="Company ID" name="companyId" value={formData.companyId} onChange={handleChange} size="small" fullWidth />
//             <TextField label="Global Role" name="global_role" value={formData.global_role} onChange={handleChange} size="small" fullWidth />
//             <Button type="submit" variant="contained" disabled={loading}>
//               {loading ? <CircularProgress size={26} color="inherit" /> : editId ? "Update Admin" : "Add Admin"}
//             </Button>
//           </Stack>
//         </form>
//       </Paper>

//       {/* Admin Table */}
//       <Paper sx={{ p: 2, borderRadius: 3, background: "#283645", overflowX: "auto" }}>
//         {loading && admins.length === 0 ? (
//           <Box textAlign="center" p={4}>
//             <CircularProgress color="inherit" />
//           </Box>
//         ) : (
//           <TableContainer>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Mobile</TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Company ID</TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Role</TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {admins.length > 0 ? (
//                   admins.map((admin) => (
//                     <TableRow key={admin._id}>
//                       <TableCell sx={{ color: "#fff" }}>{admin.name}</TableCell>
//                       <TableCell sx={{ color: "#fff" }}>{admin.email}</TableCell>
//                       <TableCell sx={{ color: "#fff" }}>{admin.mobile || "-"}</TableCell>
//                       <TableCell sx={{ color: "#fff" }}>{admin.companyId || "-"}</TableCell>
//                       <TableCell sx={{ color: "#fff" }}>{admin.global_role || "-"}</TableCell>
//                       <TableCell>
//                         <IconButton color="primary" onClick={() => handleEdit(admin)}>
//                           <Edit />
//                         </IconButton>
//                         <IconButton color="error" onClick={() => handleDelete(admin._id)}>
//                           <Delete />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={6} sx={{ textAlign: "center", color: "#fff" }}>
//                       No admins found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Paper>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default AdminPage;
