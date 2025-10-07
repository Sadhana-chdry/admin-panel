// import React, { use, useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Stack,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";
// import { ErrorOutline } from "@mui/icons-material";
// import { Snackbar, Alert } from "@mui/material";
// // import axios from "axios";

// const BASE_URL = "https://superfone-admin.onrender.com";
// // const BASE_URL = "https://superfone-admin.onrender.com/api/admin/company/create";

// const AddNewCompany = () => {

//   // const token = localStorage.getItem("token");

//   const [formData, setFormData] = useState({
//     name: "",
//     domain: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [companies, setCompanies] = useState([]);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // handle input form
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const token = localStorage.getItem("token");

//     try {
//       await axios.post(`${BASE_URL}/api/admin/company/create`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       setFormData({ name: "", domain: "" });
//       fetchCompanies(); // refresh company list if needed
//     } catch (error) {
//       console.error("Error adding company:", error.response || error.message);
//       // ignore errors
//     } finally {
//       setLoading(false);
//       setSnackbar({
//         open: true,
//         message: "Company added successfully!",
//         severity: "success",
//       });
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         p: 2,
//         minHeight: "100vh",
//         background: "#334155",
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           width: { xs: "100%", sm: "400px" },
//           p: 4,
//           borderRadius: 3,
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
//           Add New Company
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <Stack spacing={2}>
//             <TextField
//               label="Company Name"
//               name="name"
//               size="small"
//               fullWidth
//               required
//               value={formData.name}
//               onChange={handleChange}
//             />

//             <TextField
//               label="Company Domain"
//               name="domain"
//               size="small"
//               fullWidth
//               required
//               value={formData.domain}
//               onChange={handleChange}
//             />

//             <Button
//               type="submit"
//               variant="contained"
//               size="large"
//               disabled={loading}
//               sx={{ borderRadius: 2, py: 1.2 }}
//               fullWidth
//             >
//               {loading ? (
//                 <CircularProgress size={26} color="inherit" />
//               ) : (
//                 "Add Company"
//               )}
//             </Button>

//             {message && (
//               <Typography
//                 mt={2}
//                 textAlign="center"
//                 color={message.includes("✅") ? "green" : "error"}
//               >
//                 {message}
//               </Typography>
//             )}
//           </Stack>
//         </form>

//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={3000}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         >
//           <Alert
//             onClose={() => setSnackbar({ ...snackbar, open: false })}
//             severity={snackbar.severity}
//             sx={{ width: "100%" }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Paper>
//     </Box>
//   );
// };
// export default AddNewCompany;