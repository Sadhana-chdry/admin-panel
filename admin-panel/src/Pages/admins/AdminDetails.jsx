import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BASE_URL = "https://superfone-admin.onrender.com";

const AdminDetails = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const [editAdmin, setEditAdmin] = useState({
    company_id: "",
    name: "",
    email: "",
    password: "",
    mobile: "",
    global_role: "",
  });

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    company_id: "",
    global_role: "",
  });

  const showSnackbar = (message, severity = "success") =>
    setSnackbar({ open: true, message, severity });

  // ✅ Fetch all admins
  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const token =
        localStorage.getItem("authToken") || localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/api/superadmin/users/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to fetch admins", "error");
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Search admin by ID
  const fetchAdminById = async () => {
    if (!searchId.trim()) return showSnackbar("Enter admin ID", "warning");
    setLoading(true);
    try {
      const token =
        localStorage.getItem("authToken") || localStorage.getItem("token");
      const res = await axios.get(
        `${BASE_URL}/api/superadmin/users/${searchId.trim()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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

  // ✅ Delete admin
  const deleteAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      const token =
        localStorage.getItem("authToken") || localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/superadmin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showSnackbar("Admin deleted successfully!");
      fetchAdmins();
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to delete admin", "error");
    }
  };

  // ✅ Open edit dialog
  const openEditDialog = (admin) => {
    setEditAdmin({ ...admin });
    setEditDialogOpen(true);
  };

  // ✅ Update admin
  const updateAdmin = async () => {
    try {
      const token =
        localStorage.getItem("authToken") || localStorage.getItem("token");
      await axios.patch(
        `${BASE_URL}/api/superadmin/users/${editAdmin._id}`,
        editAdmin,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showSnackbar("Admin updated successfully!");
      setEditDialogOpen(false);
      fetchAdmins();
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to update admin", "error");
    }
  };

  // ✅ Add new admin
  const addNewAdmin = async () => {
    try {
      const token =
        localStorage.getItem("authToken") || localStorage.getItem("token");

      // const payload = {
      //   name:newAdmin.name.trim(),
      //   email:newAdmin.email.trim(),
      //   password:newAdmin.password,
      //   mobileNumber:newAdmin.mobileNumber.trim(),
      //   company_id:newAdmin.company_id.trim(),
      //   global_role:newAdmin.global_role.trim(),
      // };
      
      const payload = {
        name: newAdmin.name?.trim() || "",
        email: newAdmin.email?.trim() || "",
        password: newAdmin.password || "",
        mobile: newAdmin.mobileNumber?.trim() || "",
        company_id: newAdmin.company_id?.trim() || "",
        global_role: newAdmin.global_role?.trim() || "",
      };

      if (Object.values(payload).some((v) => !v)) {
        return showSnackbar("All fields are required", "warning");
      }
      console.log("Sending payload:", payload);

      await axios.post(
        `${BASE_URL}/api/superadmin/users/createAdmin`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showSnackbar("Admin added successfully!");
      setAddDialogOpen(false);
      setNewAdmin({
        name: "",
        email: "",
        password: "",
        mobile: "",
        company_id: "",
        global_role: "",
      });

      fetchAdmins();
    } catch (err) {
      console.log("Add admin error:", err.response?.data || err);
      showSnackbar(
        err.response?.data?.message || "Failed to add admin",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
      <Typography variant="h4" mb={2} fontWeight="bold">
        Admins Details
      </Typography>

      {/* ✅ Add Admin Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setAddDialogOpen(true)}
        sx={{
          mb: 3,
          color: "#fff",
        }}
      >
        Add Admin
      </Button>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <TextField
          sx={{ backgroundColor: "white" }}
          label="Search by ID"
          size="small"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={fetchAdminById}
          sx={{ minWidth: 120 }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          onClick={fetchAdmins}
          sx={{ minWidth: 120 }}
        >
          Show All
        </Button>
      </Stack>

      {/* 🧾 Admin Table */}
      <Paper>
        {loading ? (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3f2fd" }}>
                  <TableCell align="center">Company ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Password</TableCell>
                  <TableCell align="center">Mobile Number</TableCell>
                  <TableCell align="center">Global Role</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.map((admin, index) => (
                  <TableRow key={admin._id || index}>
                    <TableCell align="center">{admin._id}</TableCell>
                    <TableCell align="center">{admin.name}</TableCell>
                    <TableCell align="center">{admin.email}</TableCell>
                    <TableCell align="center">{admin.password}</TableCell>
                    <TableCell align="center">{admin.mobile}</TableCell>
                    <TableCell align="center">{admin.role}</TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        <IconButton
                          color="primary"
                          onClick={() => openEditDialog(admin)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => deleteAdmin(admin._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* ✏️ Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
      >
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Name"
              size="small"
              value={editAdmin.name}
              onChange={(e) =>
                setEditAdmin({ ...editAdmin, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Email"
              size="small"
              value={editAdmin.email}
              onChange={(e) =>
                setEditAdmin({ ...editAdmin, email: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Password"
              size="small"
              value={editAdmin.password}
              onChange={(e) =>
                setEditAdmin({ ...editAdmin, password: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Mobile Number"
              size="small"
              value={editAdmin.mobileNumber}
              onChange={(e) =>
                setEditAdmin({ ...editAdmin, mobileNumber: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Global Role"
              size="small"
              value={editAdmin.role}
              onChange={(e) =>
                setEditAdmin({ ...editAdmin, role: e.target.value })
              }
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={updateAdmin}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* ➕ Add Admin Dialog */}
      <Dialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        fullWidth
      >
        <DialogTitle>Add New Admin</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Name"
              size="small"
              value={newAdmin.name}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, name: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Email"
              size="small"
              value={newAdmin.email}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, email: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Password"
              size="small"
              type="password"
              value={newAdmin.password}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, password: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Mobile Number"
              size="small"
              value={newAdmin.mobileNumber}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, mobileNumber: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="Company ID"
              size="small"
              value={newAdmin.company_id}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, company_id: e.target.value })
              }
              fullWidth
            />

            <TextField
              label="Global Role"
              size="small"
              value={newAdmin.global_role}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, global_role: e.target.value })
              }
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="success" onClick={addNewAdmin}>
            Add Admin
          </Button>
        </DialogActions>
      </Dialog>

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

export default AdminDetails;
