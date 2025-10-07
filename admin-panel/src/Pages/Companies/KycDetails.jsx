import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const BASE_URL = "https://superfone-admin.onrender.com";

const ShowAllCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const token = localStorage.getItem("token");

  // Fetch all companies
  const fetchAllCompanies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/superadmin/company/allcompany`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setSnackbar({ open: true, message: "Failed to fetch companies", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Fetch company by ID
  const fetchCompanyById = async () => {
    if (!searchId) return;
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/superadmin/company/getcompany/${searchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompanies([response.data]); // show single company in table
    } catch (error) {
      console.error("Error fetching company by ID:", error);
      setSnackbar({ open: true, message: "Company not found by ID", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Fetch company by Name
  const fetchCompanyByName = async () => {
    if (!searchName) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/superadmin/company/getcompanyname/${searchName}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCompanies([response.data]); // show single company in table
    } catch (error) {
      console.error("Error fetching company by name:", error);
      setSnackbar({ open: true, message: "Company not found by name", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchAllCompanies();
  }, [token]);

  return (
    <Box sx={{ p: 2, pt:4 }}>
      {/* Header */}
      <Typography variant="h5" fontWeight="bold" mb={2} sx={{pt:2}}>
        KYC Details
      </Typography>

      {/* Search Section */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }} elevation={3}>
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }} alignItems="center">
          <TextField
            label="Search by company gst number"
            size="small"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Button variant="contained" onClick={fetchCompanyById}>
            Search
          </Button>

          <TextField
            label="Search by Company Name"
            size="small"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <Button variant="contained" onClick={fetchCompanyByName}>
            Search
          </Button>

          <Button variant="outlined" onClick={fetchAllCompanies}>
            Show All
          </Button>
        </Stack>
      </Paper>

      {/* Loading */}
      {loading ? (
        <Box textAlign="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ p: 2, borderRadius: 3 }} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>Company Name</TableCell>
                <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>Contact Person</TableCell>
                <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>Mobile Number</TableCell>
                <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>Email Id</TableCell>
                 <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>Company Websites</TableCell>
                 <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>Company Address</TableCell>
                <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>Company GST Number</TableCell>
                <TableCell sx={{fontWeight:"bold", textAlign:"center"}}>Company Pan Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} textAlign="center">
                    No companies found.
                  </TableCell>
                </TableRow>
              ) : (
                companies.map((company) => (
                  <TableRow key={company._id}>
                    <TableCell>{company._id}</TableCell>
                    <TableCell>{company.name}</TableCell>
                    <TableCell>{company.domain}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      )}

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

export default ShowAllCompany;
