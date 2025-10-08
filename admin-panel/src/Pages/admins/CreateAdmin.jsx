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
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// // import { Edit, Delete } from "@mui/icons-material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "axios";

// const BASE_URL = "https://superfone-admin.onrender.com";

// const AdminPage = () => {
//   const [admins, setAdmins] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
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
//   const [openDialog, setOpenDialog] = useState(false);
//    const [editAdmin, setEditAdmin] = useState({
//       companyID:"",
//       name: "",
//       email: "",
//       password: "",
//       mobileNumber: "",
//       role: "",
//     });

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

//   //  Fetch by Id
//     const fetchAdminById = async () => {
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

//     // Delete admin
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
//     if (token) fetchAdmins();
//   }, [token]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

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
//       setOpenDialog(false);
//       fetchAdmins();
//     } catch (error) {
//       console.error(error);
//       setSnackbar({ open: true, message: "Failed to save admin", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

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
//     setOpenDialog(true);
//   };

//   const handleOpenAddDialog = () => {
//     setFormData({ name: "", email: "", password: "", mobile: "", companyId: "", global_role: "" });
//     setEditId(null);
//     setOpenDialog(true);
//   };

//   return (
//     <Box sx={{ p: 2, pt: 5, minHeight: "100vh", background: "#1e293b", color: "#fff" }}>
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
//         Admin Dashboard
//       </Typography>

//       {/* Add Admin Button */}
//       <Button variant="contained" color="primary" onClick={handleOpenAddDialog} sx={{ mb: 3 }}>
//         Add Admin
//       </Button>

//       {/* Admin Table */}
//       {/* <Paper sx={{ p: 2, borderRadius: 3, background: "#283645", overflowX: "auto" }}>
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
//       </Paper> */}

//        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
//               <TextField sx={{backgroundColor:"white"}}
//                 label="Search by ID"
//                 size="small"
//                 value={searchId}
//                 onChange={(e) => setSearchId(e.target.value)}
//                 fullWidth
//               />
//               <Button variant="contained" onClick={fetchAdminById} sx={{ minWidth: 120 }}>
//                 Search
//               </Button>
//               <Button variant="contained" onClick={fetchAdmins} sx={{ minWidth: 120 }}>
//                 Show All
//               </Button>
//             </Stack>

//         <Paper>
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
//                       <Stack direction="row" spacing={1} justifyContent="center">
//                         <IconButton color="primary" onClick={() => openEditDialog(admin)}>
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton color="error" onClick={() => deleteAdmin(admin._id)}>
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

//       {/* Add/Edit Admin Dialog */}
//       {/* <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
//         <DialogTitle>{editId ? "Edit Admin" : "Add Admin"}</DialogTitle>
//         <form onSubmit={handleSubmit}>
//           <DialogContent>
//             <Stack spacing={2}>
//               <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth required />
//               <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth required />
//               <TextField
//                 label="Password"
//                 name="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 fullWidth
//                 required={!editId}
//               />
//               <TextField label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} fullWidth />
//               <TextField label="Company ID" name="companyId" value={formData.companyId} onChange={handleChange} fullWidth />
//               <TextField label="Global Role" name="global_role" value={formData.global_role} onChange={handleChange} fullWidth />
//             </Stack>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//             <Button type="submit" variant="contained" disabled={loading}>
//               {loading ? <CircularProgress size={26} /> : editId ? "Update Admin" : "Add Admin"}
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog> */}

//        {/* Edit Dialog */}
//             <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth>
//               <DialogTitle>Edit Admin</DialogTitle>
//               <DialogContent>
//                 <Stack spacing={2} mt={1}>
//                   <TextField
//                     label="Name"
//                     value={editAdmin.name}
//                     onChange={(e) => setEditAdmin({ ...editAdmin, name: e.target.value })}
//                     fullWidth
//                   />
//                   <TextField
//                     label="Email"
//                     value={editAdmin.email}
//                     onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
//                     fullWidth
//                   />
//                   <TextField
//                     label="Password"
//                     value={editAdmin.password}
//                     onChange={(e) => setEditAdmin({ ...editAdmin, password: e.target.value })}
//                     fullWidth
//                   />
//                   <TextField
//                     label="Mobile Number"
//                     value={editAdmin.mobileNumber}
//                     onChange={(e) => setEditAdmin({ ...editAdmin, mobileNumber: e.target.value })}
//                     fullWidth
//                   />
//                   <TextField
//                     label="Global Role"
//                     value={editAdmin.role}
//                     onChange={(e) => setEditAdmin({ ...editAdmin, role: e.target.value })}
//                     fullWidth
//                   />
//                 </Stack>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
//                 <Button variant="contained" onClick={updateAdmin}>
//                   Update
//                 </Button>
//               </DialogActions>
//             </Dialog>

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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const BASE_URL = "https://digidialersuperadmin.onrender.com";

const CreateAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editId, setEditId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    company_id: "",
    global_role: "",
  });

  const token = localStorage.getItem("token");

  // ✅ Fetch all admins
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/superadmin/users/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(res.data || []);
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to fetch admins", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Search Admin by ID
  const fetchAdminById = async () => {
    if (!searchId.trim()) return showSnackbar("Enter admin ID", "warning");
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/users/${searchId.trim()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAdmins([res.data]);
      showSnackbar("Admin found!", "success");
    } catch (err) {
      console.error(err);
      setAdmins([]);
      showSnackbar("Admin not found", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add or Edit Admin Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        // Update existing admin
        await axios.patch(
          `${BASE_URL}/api/superadmin/users/${editId}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        showSnackbar("Admin updated successfully!", "success");
      } else {
        // Create new admin
        await axios.post(
          `${BASE_URL}/api/superadmin/users/createAdmin`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        showSnackbar("Admin added successfully!", "success");
      }
      setFormData({
        name: "",
        email: "",
        password: "",
        mobile: "",
        company_id: "",
        global_role: "",
      });
      setOpenDialog(false);
      fetchAdmins();
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to save admin", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Admin
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/api/superadmin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showSnackbar("Admin deleted successfully!", "success");
      fetchAdmins();
    } catch (error) {
      console.error(error);
      showSnackbar("Failed to delete admin", "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Open Edit Dialog
  const handleEdit = (admin) => {
    setFormData({
      name: admin.name || "",
      email: admin.email || "",
      password: "",
      mobile: admin.mobile || "",
      company_id: admin.company_id || "",
      global_role: admin.global_role || "",
    });
    setEditId(admin._id);
    setOpenDialog(true);
  };

  // ✅ Open Add Dialog
  const handleOpenAddDialog = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      mobile: "",
      company_id: "",
      global_role: "",
    });
    setEditId(null);
    setOpenDialog(true);
  };

  // ✅ Snackbar Utility
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  useEffect(() => {
    if (token) fetchAdmins();
  }, [token]);

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        background: "#1e293b",
        color: "#fff",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Admin Dashboard
      </Typography>

      {/* 🔹 Add Admin Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddDialog}
        sx={{ mb: 3 }}
      >
        Add Admin
      </Button>

      {/* 🔹 Search Section */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <TextField
          sx={{ backgroundColor: "white" }}
          label="Search by ID"
          size="small"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={fetchAdminById}>
          Search
        </Button>
        <Button variant="contained" onClick={fetchAdmins}>
          Show All
        </Button>
      </Stack>

      {/* 🔹 Admin Table */}
      <Paper sx={{ p: 2, borderRadius: 3, background: "#283645" }}>
        {loading ? (
          <Box textAlign="center" p={4}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Email</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Mobile</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Company ID</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Role</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.length > 0 ? (
                  admins.map((admin) => (
                    <TableRow key={admin._id}>
                      <TableCell sx={{ color: "#fff" }}>{admin.name}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {admin.email}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {admin.mobile || "-"}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {admin.company_id || "-"}
                      </TableCell>
                      <TableCell sx={{ color: "#fff" }}>
                        {admin.global_role || "-"}
                      </TableCell>
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="center"
                        >
                          {/* <IconButton
                            color="primary"
                            onClick={() => handleEdit(admin)}
                          >
                            <EditIcon />
                          </IconButton> */}
                          {/* <IconButton
                            color="error"
                            onClick={() => handleDelete(admin._id)}
                          >
                            <DeleteIcon />
                          </IconButton> */}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      sx={{ textAlign: "center", color: "#fff" }}
                    >
                      No admins found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* 🔹 Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth>
        <DialogTitle>{editId ? "Edit Admin" : "Add Admin"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Stack spacing={2}>
              {/* <TextField
                label="Name"
                name="name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                fullWidth
                required
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email }
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                fullWidth
                required
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                fullWidth
                required={!editId}
              />
              <TextField
                label="Mobile"
                name="mobile"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Company ID"
                name="companyId"
                value={formData.company_id}
                onChange={(e) =>
                  setFormData({ ...formData, company_id: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Global Role"
                name="global_role"
                value={formData.global_role}
                onChange={(e) =>
                  setFormData({ ...formData, global_role: e.target.value })
                }
                fullWidth
              /> */}
              <TextField
                label="Name"
                name="name"
                value={formData.name || ""} // ⚡ always a string
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                fullWidth
                required
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email || ""} // ⚡ always a string
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                fullWidth
                required
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password || ""} // ⚡ always a string
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                fullWidth
                required={!editId}
              />
              <TextField
                label="Mobile"
                name="mobile"
                value={formData.mobile || ""} // ⚡ always a string
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Company ID"
                name="companyId"
                value={formData.company_id || ""} // ⚡ always a string
                onChange={(e) =>
                  setFormData({ ...formData, company_id: e.target.value })
                }
                fullWidth
              />
              <TextField
                label="Global Role"
                name="global_role"
                value={formData.global_role || ""} // ⚡ always a string
                onChange={(e) =>
                  setFormData({ ...formData, global_role: e.target.value })
                }
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Saving..." : editId ? "Update Admin" : "Add Admin"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* 🔹 Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateAdmin;
