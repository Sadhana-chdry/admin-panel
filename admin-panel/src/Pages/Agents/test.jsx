
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   Switch,
//   FormControlLabel,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Checkbox,
//   Tabs,
//   Tab,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// const AgentProfile = () => {
//   const [selectedDept, setSelectedDept] = useState("");
//   const [password, setPassword] = useState("");
//   const [tabValue, setTabValue] = useState(0);

//   const departments = ["Sales", "Support", "HR", "IT"];

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* 🔹 Top Header */}
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
//         {/* Search */}
//         <TextField
//           placeholder="Search Agent..."
//           size="small"
//           variant="outlined"
//           sx={{ flex: 1, maxWidth: 300 }}
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

//         {/* Tabs */}
//         <Tabs
//           value={tabValue}
//           onChange={(e, newValue) => setTabValue(newValue)}
//           textColor="primary"
//           indicatorColor="primary"
//           sx={{
//             flexShrink: 0,
//             "& .MuiTab-root": { textTransform: "none", fontWeight: "bold" },
//           }}
//         >
//           <Tab label="All" />
//           <Tab label="Active" />
//           <Tab label="Inactive" />
//         </Tabs>

//         {/* Add New Agent Button */}
//         <Button variant="contained" color="primary">
//           + Add New Agent
//         </Button>
//       </Box>

//       {/* 🔹 Two Column Layout */}
//       <Grid container spacing={3}>
//         {/* LEFT SIDE */}
//         <Grid item xs={12} md={5}>
//           <Paper sx={{ p: 3, borderRadius: 2 }}>
//             <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "bold" }}>
//               Profile Picture Upload
//             </Typography>

//             <Box
//               sx={{
//                 width: 100,
//                 height: 100,
//                 borderRadius: "50%",
//                 border: "2px dashed #ccc",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 mb: 2,
//               }}
//             >
//               <Typography variant="caption">Upload</Typography>
//             </Box>

//             {/* Agent Name */}
//             <TextField
//               fullWidth
//               label="Agent Name / Email Address"
//               size="small"
//               sx={{ mb: 2 }}
//             />

//             {/* Phone Number */}
//             <TextField
//               fullWidth
//               label="Phone Number"
//               size="small"
//               sx={{ mb: 2 }}
//             />

//             {/* Active Switch */}
//             <FormControlLabel
//               control={<Switch defaultChecked />}
//               label="Active"
//             />
//           </Paper>
//         </Grid>

//         {/* RIGHT SIDE */}
//         <Grid item xs={12} md={7}>
//           <Paper sx={{ p: 3, borderRadius: 2 }}>
//             {/* Assign Department */}
//             <FormControl fullWidth size="small" sx={{ mb: 2 }}>
//               <InputLabel>Assign Department</InputLabel>
//               <Select
//                 value={selectedDept}
//                 onChange={(e) => setSelectedDept(e.target.value)}
//               >
//                 {departments.map((dept, i) => (
//                   <MenuItem key={i} value={dept}>
//                     {dept}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {/* Password */}
//             <TextField
//               fullWidth
//               label="New Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               size="small"
//               sx={{ mb: 2 }}
//             />

//             <TextField
//               fullWidth
//               label="Reset Password"
//               type="password"
//               size="small"
//               sx={{ mb: 2 }}
//             />

//             {/* Roles / Permissions */}
//             <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
//               Assign Roles/Permissions
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "column" }}>
//               <FormControlLabel
//                 control={<Checkbox />}
//                 label="Can view all calls"
//               />
//               <FormControlLabel
//                 control={<Checkbox />}
//                 label="Can manage contacts"
//               />
//               <FormControlLabel control={<Checkbox />} label="Active" />
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* 🔹 Save Button */}
//       <Box textAlign="center" sx={{ mt: 3 }}>
//         <Button variant="contained" color="primary">
//           Save Agent
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default AgentProfile;






// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   Grid,
//   Avatar,
//   Switch,
//   FormGroup,
//   FormControlLabel,
//   Checkbox,
//   MenuItem,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import {
//   Visibility,
//   VisibilityOff,
//   AddAPhoto,
//   Password,
// } from "@mui/icons-material";

// const departments = ["Sales", "Support", "HR", "IT"];
// const roles = ["Agent (Own Calls Only)", "Supervisor", "Manager"];

// const AgentProfile = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [agent, setAgent] = useState({
//     name: "",
//     phone: "",
//     department: "",
//     role: "",
//     Password: "",
//     Permissions: {
//       viewCalls: false,
//       manageContacts: false,
//       active: true,
//     },
//   });

//   return (
//     <Box
//       sx={{ p: 3, background: "#0f172a", minHeight: "100vh", color: "#fff" }}
//     >
//       {/* Header */}
//       <Typography variant="h5" sx={{ mb: 2 }}>
//         Add/Edit Agent
//       </Typography>

//       {/* Container */}
//       <Paper
//         sx={{
//           p: 3,
//           borderRadius: 3,
//           background: "#1e293b",
//           color: "#fff",
//         }}
//         elevation={4}
//       >
//         <Grid container spacing={3}>
//           {/* Left Side - Profile + Basic Info */}
//           <Grid item xs={12} md={4}>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 textAlign: "center",
//               }}
//             >
//               {/* Profile Upload */}
//               <Avatar sx={{ width: 100, height: 100, mb: 2 }} src="" alt="" />

//               <Button
//                 variant="outlined"
//                 startIcon={<AddAPhoto />}
//                 sx={{ mb: 3 }}
//               >
//                 Upload
//               </Button>

//               {/* Agent Name */}
//               <TextField
//                 label="Agent Name"
//                 fullWidth
//                 variant="outlined"
//                 size="small"
//                 sx={{ mb: 2, background: "#fff", borderRadius: 1 }}
//               />

//               {/* phone */}
//               <TextField
//                 label="Phone Number"
//                 fullWidth
//                 variant="outlined"
//                 size="small"
//                 sx={{ mb: 2, background: "#fff", borderRadius: 1 }}
//               />

//               <FormControlLabel
//                 control={<Switch defaultChecked color="primary" />}
//                 label="Active"
//               />
//             </Box>
//           </Grid>

//           {/* Right Side - Department, Roles, Password */}
//           <Grid item xs={12} md={8}>
//             <Grid container spacing={2}>
//               {/* departemnt */}
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   select
//                   label="Assign Departemnt"
//                   fullWidth
//                   size="small"
//                   sx={{ background: "#fff", borderRadius: 1 }}
//                 >
//                   {departments.map((dep) => (
//                     <MenuItem key={dep} value={dep}>
//                       {dep}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>

//               {/* Role */}
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   select
//                   label="Assign Role"
//                   fullWidth
//                   size="small"
//                   sx={{ background: "#fff", borderRadius: 1 }}
//                 >
//                   {roles.map((role) => (
//                     <MenuItem key={role} value={role}>
//                       {role}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>

//               {/* Password */}
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="New Password"
//                   type={showPassword ? "text" : "password"}
//                   fullWidth
//                   size="small"
//                   sx={{ background: "#fff", borderRadius: 1 }}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() => setShowPassword(!showPassword)}
//                           edge="end"
//                         >
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Reset Password"
//                   type={showPassword ? "text" : "password"}
//                   fullWidth
//                   size="small"
//                   sx={{ background: "#fff", borderRadius: 1 }}
//                 />
//               </Grid>

//               {/* Permissions */}
//               <Grid item xs={12}>
//                 <Typography variant="subtitle1" sx={{ mb: 1 }}>
//                   Assign Roles / Permissions
//                 </Typography>
//                 <FormGroup row>
//                   <FormControlLabel
//                     control={<Checkbox />}
//                     label="Can view all calls"
//                   />
//                   <FormControlLabel
//                     control={<Checkbox />}
//                     label="Can manage contacts"
//                   />
//                   <FormControlLabel control={<Checkbox />} label="Active" />
//                 </FormGroup>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* Save Button */}
//         <Box textAlign="center" mt={3}>
//           <Button
//             variant="contained"
//             sx={{
//               px: 4,
//               py: 1,
//               borderRadius: "30px",
//               background: "#1976d2",
//               "&:hover": { background: "#125ca1" },
//             }}
//           >
//             Save Agent
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default AgentProfile;


// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   Switch,
//   FormControlLabel,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Checkbox,
//   Tabs,
//   Tab,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// const AgentProfile = () => {
//   const [selectedDept, setSelectedDept] = useState("");
//   const [password, setPassword] = useState("");
//   const [tabValue, setTabValue] = useState(0);

//   const departments = ["Sales", "Support", "HR", "IT"];

//   return (
//     <Box
//       sx={{
//         p: 3,
//         minHeight: "100vh",
//         background: "#0f172a url('https://www.transparenttextures.com/patterns/cubes.png')",
//         backgroundSize: "cover",
//         color: "#fff",
//       }}
//     >
//       {/* 🔹 Header */}
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
//         Add/Edit Agent
//       </Typography>

//       {/* 🔹 Top row */}
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
//         {/* Search */}
//         <TextField
//           placeholder="Search Agent..."
//           size="small"
//           variant="outlined"
//           sx={{ flex: 1, maxWidth: 300, background: "#fff", borderRadius: 1 }}
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

//         {/* Tabs */}
//         <Tabs
//           value={tabValue}
//           onChange={(e, newValue) => setTabValue(newValue)}
//           textColor="primary"
//           indicatorColor="primary"
//           sx={{
//             "& .MuiTab-root": {
//               textTransform: "none",
//               fontWeight: "bold",
//               color: "#fff",
//             },
//           }}
//         >
//           <Tab label="All" />
//           <Tab label="Active" />
//           <Tab label="Inactive" />
//         </Tabs>

//         {/* Add New Agent */}
//         <Button variant="contained" color="primary" sx={{ flexShrink: 0 }}>
//           + Add New Agent
//         </Button>
//       </Box>

//       {/* 🔹 Two Column Layout */}
//       <Grid container spacing={3}>
//         {/* LEFT SIDE */}
//         <Grid item xs={12} md={5}>
//           <Paper sx={{ p: 3, borderRadius: 2 }}>
//             {/* Profile Upload */}
//             <Box
//               sx={{
//                 width: 100,
//                 height: 100,
//                 borderRadius: "50%",
//                 border: "2px dashed #ccc",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 mb: 2,
//                 mx: "auto",
//               }}
//             >
//               <Typography variant="caption">Upload</Typography>
//             </Box>

//             {/* Agent Name */}
//             <TextField
//               fullWidth
//               label="Agent Name / Email Address"
//               size="small"
//               sx={{ mb: 2 }}
//             />

//             {/* Phone Number */}
//             <TextField
//               fullWidth
//               label="Phone Number"
//               size="small"
//               sx={{ mb: 2 }}
//             />

//             {/* Active Switch */}
//             <FormControlLabel
//               control={<Switch defaultChecked />}
//               label="Active"
//             />
//           </Paper>
//         </Grid>

//         {/* RIGHT SIDE */}
//         <Grid item xs={12} md={7}>
//           <Paper sx={{ p: 3, borderRadius: 2 }}>
//             {/* Assign Department */}
//             <FormControl fullWidth size="small" sx={{ mb: 2 }}>
//               <InputLabel>Assign Department</InputLabel>
//               <Select
//                 value={selectedDept}
//                 onChange={(e) => setSelectedDept(e.target.value)}
//               >
//                 {departments.map((dept, i) => (
//                   <MenuItem key={i} value={dept}>
//                     {dept}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {/* New Password */}
//             <TextField
//               fullWidth
//               label="New Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               size="small"
//               sx={{ mb: 2 }}
//             />

//             {/* Reset Password */}
//             <TextField
//               fullWidth
//               label="Reset Password"
//               type="password"
//               size="small"
//               sx={{ mb: 2 }}
//             />

//             {/* Roles / Permissions */}
//             <Typography
//               variant="subtitle2"
//               sx={{ mb: 1, fontWeight: "bold" }}
//             >
//               Assign Roles/Permissions
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "column" }}>
//               <FormControlLabel
//                 control={<Checkbox />}
//                 label="Can view all calls"
//               />
//               <FormControlLabel
//                 control={<Checkbox />}
//                 label="Can manage contacts"
//               />
//               <FormControlLabel control={<Checkbox />} label="Active" />
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* 🔹 Save Button */}
//       <Box textAlign="center" sx={{ mt: 3 }}>
//         <Button variant="contained" color="primary" size="large">
//           Save Agent
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default AgentProfile;