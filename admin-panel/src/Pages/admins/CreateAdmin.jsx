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
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import axios from "axios";

const BASE_URL = "https://superfone-admin.onrender.com";

const AdminPage = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    companyId: "",
    global_role: "",
  });
  const [editId, setEditId] = useState(null); // Track edit
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

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
      setSnackbar({ open: true, message: "added successfully", severity: "success" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchAdmins();
  }, [token]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or Update admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        // Update admin
        await axios.patch(`${BASE_URL}/api/superadmin/users/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbar({ open: true, message: "Admin updated successfully!", severity: "success" });
        setEditId(null);
      } else {
        // Create admin
        await axios.post(`${BASE_URL}/api/superadmin/users/createAdmin`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSnackbar({ open: true, message: "Admin added successfully!", severity: "success" });
      }
      setFormData({ name: "", email: "", password: "", mobile: "", companyId: "", global_role: "" });
      fetchAdmins();
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Failed to save admin", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete admin
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/api/superadmin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSnackbar({ open: true, message: "Admin deleted successfully!", severity: "success" });
      fetchAdmins();
    } catch (error) {
      console.error(error);
      setSnackbar({ open: true, message: "Failed to delete admin", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit admin
  const handleEdit = (admin) => {
    setFormData({
      name: admin.name || "",
      email: admin.email || "",
      password: "",
      mobile: admin.mobile || "",
      companyId: admin.companyId || "",
      global_role: admin.global_role || "",
    });
    setEditId(admin._id);
  };

  return (
    <Box sx={{ p: 2, pt:5, minHeight: "100vh", background: "#1e293b", color: "#fff" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Admin Dashboard
      </Typography>

      {/* Admin Form */}
      <Paper sx={{ p: 1, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {editId ? "Edit Admin" : "Add New Admin"}
        </Typography>
        <form onSubmit={handleSubmit}>
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
              value={formData.email}
              onChange={handleChange}
              size="small"
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              size="small"
              fullWidth
              required={!editId} // password optional on edit
            />
            <TextField
              label="Mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              size="small"
              fullWidth
            />
            <TextField
              label="Company ID"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              size="small"
              fullWidth
            />
            <TextField
              label="Global Role"
              name="global_role"
              value={formData.global_role}
              onChange={handleChange}
              size="small"
              fullWidth
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={26} color="inherit" /> : editId ? "Update Admin" : "Add Admin"}
            </Button>
          </Stack>
        </form>
      </Paper>

      {/* Admin Table */}
      {/* <Paper sx={{ p: 2, borderRadius: 3, background: "#283645", overflowX: "auto" }}>
        {loading && admins.length === 0 ? (
          <Box textAlign="center" p={4}>
            <CircularProgress color="inherit" />
          </Box>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Name</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Mobile</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Company ID</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Role</TableCell>
                  <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {admins.length > 0 ? (
                  admins.map((admin) => (
                    <TableRow key={admin._id}>
                      <TableCell sx={{ color: "#fff" }}>{admin.name}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{admin.email}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{admin.mobile || "-"}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{admin.companyId || "-"}</TableCell>
                      <TableCell sx={{ color: "#fff" }}>{admin.global_role || "-"}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEdit(admin)}>
                          <Edit />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(admin._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: "center", color: "#fff" }}>
                      No admins found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper> */}



      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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

export default AdminPage;
