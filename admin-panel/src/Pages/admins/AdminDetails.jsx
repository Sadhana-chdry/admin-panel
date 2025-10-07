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
  const [editAdmin, setEditAdmin] = useState({
    companyID:"",
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    role: "",
  });

  const showSnackbar = (message, severity = "success") =>
    setSnackbar({ open: true, message, severity });

  // Fetch all admins
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

  // Search admin by ID
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

  // Delete admin
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

  // Open edit dialog
  const openEditDialog = (admin) => {
    setEditAdmin({ ...admin });
    setEditDialogOpen(true);
  };

  // Update admin
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

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <Box sx={{ p: 2, maxWidth: "1200px", mx: "auto", mt: 3 }}>
      <Typography variant="h4" mb={2} fontWeight="bold">
        Admins Details
      </Typography>

      {/* Search */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
        <TextField sx={{backgroundColor:"white"}}
          label="Search by ID"
          size="small"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={fetchAdminById} sx={{ minWidth: 120 }}>
          Search
        </Button>
        <Button variant="contained" onClick={fetchAdmins} sx={{ minWidth: 120 }}>
          Show All
        </Button>
      </Stack>

      {/* Admin Table */}
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
                {admins.map((admin) => (
                  <TableRow key={admin._id}>
                    <TableCell align="center">{admin._id}</TableCell>
                    <TableCell align="center">{admin.name}</TableCell>
                    <TableCell align="center">{admin.email}</TableCell>
                    <TableCell align="center">{admin.password}</TableCell>
                    <TableCell align="center">{admin.mobileNumber}</TableCell>
                    <TableCell align="center">{admin.role}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton color="primary" onClick={() => openEditDialog(admin)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => deleteAdmin(admin._id)}>
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

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth>
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Name"
              value={editAdmin.name}
              onChange={(e) => setEditAdmin({ ...editAdmin, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Email"
              value={editAdmin.email}
              onChange={(e) => setEditAdmin({ ...editAdmin, email: e.target.value })}
              fullWidth
            />
            <TextField
              label="Password"
              value={editAdmin.password}
              onChange={(e) => setEditAdmin({ ...editAdmin, password: e.target.value })}
              fullWidth
            />
            <TextField
              label="Mobile Number"
              value={editAdmin.mobileNumber}
              onChange={(e) => setEditAdmin({ ...editAdmin, mobileNumber: e.target.value })}
              fullWidth
            />
            <TextField
              label="Global Role"
              value={editAdmin.role}
              onChange={(e) => setEditAdmin({ ...editAdmin, role: e.target.value })}
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


