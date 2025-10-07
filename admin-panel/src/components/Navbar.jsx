import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Stack,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/digidial_logo.jpg";
import { useNavigate } from "react-router-dom";
import KYCForm from "../Pages/kyc/KYCFrom";

export const NAVBAR_HEIGHT = 48;

const Navbar = () => {
  const navigate = useNavigate();
  const [openKYC, setOpenKYC] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // clear token
    navigate("/login");
  };

  const handleOpenKYC = () => setOpenKYC(true);
  const handleCloseKYC = () => setOpenKYC(false);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          height: `${NAVBAR_HEIGHT}px`,
          background: "#334155",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            minHeight: `${NAVBAR_HEIGHT}px !important`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: Logo and Title */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              component="img"
              src={logo}
              alt="digidial"
              sx={{ height: 40, width: 40, borderRadius: "50%" }}
            />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              DigiDial
            </Typography>
          </Stack>

          {/* Right: Icons and Logout */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenKYC(true)}
              sx={{ ml: 1 }}
            >
              Open KYC Form
            </Button>

            <Button
              variant="contained"
              color="primary"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ ml: 1 }}
            >
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* KYC Form Modal */}
      <Dialog open={openKYC} onClose={handleCloseKYC} fullWidth maxWidth="md">
        <DialogTitle sx={{fontWeight:"bold", pt:2}}>KYC Form</DialogTitle>
        <DialogContent>
          <KYCForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;



// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Stack,
//   Box,
//   Typography,
//   Button,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   Menu,
//   MenuItem,
//   Avatar,
//   Chip,
//   CircularProgress,
// } from "@mui/material";
// import LogoutIcon from "@mui/icons-material/Logout";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import PersonIcon from "@mui/icons-material/Person";
// import logo from "../assets/digidial_logo.jpg";
// import { useNavigate } from "react-router-dom";
// import KYCForm from "../Pages/kyc/KYCFrom";

// export const NAVBAR_HEIGHT = 48;

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [openKYC, setOpenKYC] = useState(false);
//   const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [profileDialogOpen, setProfileDialogOpen] = useState(false);

//   // Fetch user profile on component mount
//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("authToken");
      
//       if (!token) {
//         navigate("/login");
//         return;
//       }

//       const response = await fetch("https://superfone-admin.onrender.com/api/superadmin/auth/profile", {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         const profileData = await response.json();
//         setUserProfile(profileData);
//       } else if (response.status === 401) {
//         // Token expired or invalid
//         localStorage.removeItem("authToken");
//         navigate("/login");
//       } else {
//         console.error("Failed to fetch profile:", response.status);
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     setUserProfile(null);
//     navigate("/login");
//   };

//   const handleOpenKYC = () => setOpenKYC(true);
//   const handleCloseKYC = () => setOpenKYC(false);

//   const handleProfileMenuOpen = (event) => {
//     setProfileMenuAnchor(event.currentTarget);
//   };

//   const handleProfileMenuClose = () => {
//     setProfileMenuAnchor(null);
//   };

//   const handleViewProfile = () => {
//     handleProfileMenuClose();
//     setProfileDialogOpen(true);
//   };

//   const handleCloseProfileDialog = () => {
//     setProfileDialogOpen(false);
//   };

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         sx={{
//           height: `${NAVBAR_HEIGHT}px`,
//           background: "#334155",
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//         }}
//       >
//         <Toolbar
//           sx={{
//             minHeight: `${NAVBAR_HEIGHT}px !important`,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           {/* Left: Logo and Title */}
//           <Stack direction="row" spacing={1} alignItems="center">
//             <Box
//               component="img"
//               src={logo}
//               alt="digidial"
//               sx={{ height: 40, width: 40, borderRadius: "50%" }}
//             />
//             <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//               DigiDial
//             </Typography>
//           </Stack>

//           {/* Right: User Info and Actions */}
//           <Stack direction="row" spacing={2} alignItems="center">
//             {/* User Profile Chip - Show only when profile is loaded */}
//             {loading ? (
//               <CircularProgress size={24} sx={{ color: "white" }} />
//             ) : userProfile ? (
//               <Chip
//                 avatar={
//                   <Avatar sx={{ bgcolor: "#3b82f6", width: 24, height: 24 }}>
//                     {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
//                   </Avatar>
//                 }
//                 label={userProfile.name || userProfile.email || "User"}
//                 variant="outlined"
//                 onClick={handleProfileMenuOpen}
//                 sx={{ 
//                   color: "white", 
//                   borderColor: "white",
//                   '&:hover': { bgcolor: "rgba(255,255,255,0.1)" },
//                   height: 32
//                 }}
//               />
//             ) : (
//               <Button
//                 variant="outlined"
//                 startIcon={<AccountCircleIcon />}
//                 onClick={handleProfileMenuOpen}
//                 sx={{ 
//                   color: "white", 
//                   borderColor: "white",
//                   '&:hover': { bgcolor: "rgba(255,255,255,0.1)" }
//                 }}
//               >
//                 Profile
//               </Button>
//             )}
            
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => setOpenKYC(true)}
//               sx={{ ml: 1 }}
//             >
//               Open KYC Form
//             </Button>

//             {/* <Button
//               variant="contained"
//               color="secondary"
//               startIcon={<LogoutIcon />}
//               onClick={handleLogout}
//               sx={{ ml: 1 }}
//             >
//               Logout
//             </Button> */}

//           </Stack>
//         </Toolbar>
//       </AppBar>

//       {/* Profile Menu */}
//       <Menu
//         anchorEl={profileMenuAnchor}
//         open={Boolean(profileMenuAnchor)}
//         onClose={handleProfileMenuClose}
//         PaperProps={{
//           sx: { 
//             mt: 1.5,
//             minWidth: 200 
//           }
//         }}
//       >
//         <MenuItem onClick={handleViewProfile}>
//           <PersonIcon sx={{ mr: 2 }} />
//           View Profile
//         </MenuItem>
//         <MenuItem onClick={handleLogout}>
//           <LogoutIcon sx={{ mr: 2 }} />
//           Logout
//         </MenuItem>
//       </Menu>

//       {/* Profile Dialog */}
//       <Dialog 
//         open={profileDialogOpen} 
//         onClose={handleCloseProfileDialog} 
//         fullWidth 
//         maxWidth="sm"
//       >
//         <DialogTitle sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
//           <AccountCircleIcon sx={{ mr: 1 }} />
//           User Profile
//         </DialogTitle>
//         <DialogContent>
//           {loading ? (
//             <Box display="flex" justifyContent="center" py={4}>
//               <CircularProgress />
//             </Box>
//           ) : userProfile ? (
//             <Stack spacing={3} py={2}>
//               {/* Profile Header */}
//               <Box display="flex" alignItems="center" spacing={2}>
//                 <Avatar
//                   sx={{
//                     width: 60,
//                     height: 60,
//                     bgcolor: "#3b82f6",
//                     fontSize: "1.5rem",
//                     mr: 2,
//                   }}
//                 >
//                   {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" fontWeight="bold">
//                     {userProfile.name || "User Name"}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {userProfile.role || "Super Admin"}
//                   </Typography>
//                 </Box>
//               </Box>

//               {/* Profile Details */}
//               <Box>
//                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                   EMAIL
//                 </Typography>
//                 <Typography variant="body1" gutterBottom>
//                   {userProfile.email || "N/A"}
//                 </Typography>
//               </Box>

//               {userProfile.phone && (
//                 <Box>
//                   <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                     PHONE
//                   </Typography>
//                   <Typography variant="body1" gutterBottom>
//                     {userProfile.phone}
//                   </Typography>
//                 </Box>
//               )}

//               {/* User ID */}
//               <Box>
//                 <Typography variant="subtitle2" color="text.secondary" gutterBottom>
//                   USER ID
//                 </Typography>
//                 <Typography variant="body2" fontFamily="monospace">
//                   {userProfile.id || userProfile._id || "N/A"}
//                 </Typography>
//               </Box>

//               {/* Refresh Button */}
//               <Button
//                 variant="outlined"
//                 onClick={fetchUserProfile}
//                 disabled={loading}
//                 sx={{ mt: 2 }}
//               >
//                 Refresh Profile
//               </Button>
//             </Stack>
//           ) : (
//             <Box textAlign="center" py={4}>
//               <Typography color="error" gutterBottom>
//                 Failed to load profile data
//               </Typography>
//               <Button
//                 variant="contained"
//                 onClick={fetchUserProfile}
//                 disabled={loading}
//               >
//                 Retry
//               </Button>
//             </Box>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* KYC Form Modal */}
//       <Dialog open={openKYC} onClose={handleCloseKYC} fullWidth maxWidth="md">
//         <DialogTitle sx={{fontWeight:"bold", pt:2}}>KYC Form</DialogTitle>
//         <DialogContent>
//           <KYCForm />
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default Navbar;
