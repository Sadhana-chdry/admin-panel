// import React, { useState } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   ListItemIcon,
//   Toolbar,
//   Typography,
//   Box,
//   Collapse,
// } from "@mui/material";
// import {
//   Dashboard,
//   People,
//   Business,
//   ExpandLess,
//   ExpandMore,
//   Logout,
// } from "@mui/icons-material";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// const drawerWidth = 240;

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [companyOpen, setCompanyOpen] = useState(false);
//   const [companyAgentsOpen, setCompanyAgentsOpen] = useState(false);
//   const [agentsTeamsOpen, setAgentsTeamsOpen] = useState(false);
//   const [adminsOpen, setAdminsOpen] = useState(false);

//   const handleCompanyClick = () => setCompanyOpen(!companyOpen);
//   const handleCompanyAgentsClick = () =>
//     setCompanyAgentsOpen(!companyAgentsOpen);
//   const handleAgentsTeamsClick = () => setAgentsTeamsOpen(!agentsTeamsOpen);
//   const handleAdminsClick = () => setAdminsOpen(!adminsOpen);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login");
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         [`& .MuiDrawer-paper`]: {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           background: "#334155",
//           mt: 5,
//           height: "calc(100vh - 20px)",
//           overflowY: "auto",
//         },
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "center" }}>
//         <Typography variant="h6" sx={{ color: "#fff" }}>
//           Admin Panel
//         </Typography>
//       </Toolbar>

//       <List>
//         {/* Dashboard */}
//         <ListItem disablePadding>
//           <ListItemButton
//             component={Link}
//             to="/"
//             selected={location.pathname === "/"}
//             sx={{ color: "#fff" }}
//           >
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <Dashboard />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItemButton>
//         </ListItem>

//         {/* Companies */}
//         <ListItem disablePadding>
//           <ListItemButton onClick={handleCompanyClick} sx={{ color: "#fff" }}>
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <Business />
//             </ListItemIcon>
//             <ListItemText primary="Companies" />
//             {companyOpen ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>

//         <Collapse in={companyOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItemButton
//               component={Link}
//               to="/companies/contact-list"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/companies/contact-list"}
//             >
//               <ListItemText primary="Contact List" />
//             </ListItemButton>

//             <ListItemButton
//               component={Link}
//               to="/companies/add-edit-contact"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/companies/add-edit-contact"}
//             >
//               <ListItemText primary="Add/Edit Contact" />
//             </ListItemButton>

//             <ListItemButton
//               component={Link}
//               to="/companies/add-new-company"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/companies/add-new-company"}
//             >
//               <ListItemText primary="Add New Company" />
//             </ListItemButton>

//             <ListItemButton
//               component={Link}
//               to="/companies/all-company"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/companies/all-company"}
//             >
//               <ListItemText primary="Show All Company" />
//             </ListItemButton>

//             {/* Admins submenu */}
//             <ListItemButton
//               onClick={handleAdminsClick}
//               sx={{ pl: 4, color: "#fff" }}
//             >
//               <ListItemText primary="Admins" />
//               {adminsOpen ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>

//             <Collapse in={adminsOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/companies/admin-page"
//                   sx={{ pl: 8, color: "#fff" }}
//                   selected={location.pathname === "/companies/admin-page"}
//                 >
//                   <ListItemText primary="Admins Page" />
//                 </ListItemButton>
//               </List>
//             </Collapse>

//             {/* Agents inside Companies */}
//             <ListItemButton
//               onClick={handleCompanyAgentsClick}
//               sx={{ pl: 4, color: "#fff" }}
//             >
//               <ListItemText primary="Agents" />
//               {companyAgentsOpen ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>

//             <Collapse in={companyAgentsOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/agents/add-edit"
//                   sx={{ pl: 8, color: "#fff" }}
//                   selected={location.pathname === "/agents/add-edit"}
//                 >
//                   <ListItemText primary="Add/Edit Agent" />
//                 </ListItemButton>

//                 <ListItemButton
//                   component={Link}
//                   to="/agents/profile"
//                   sx={{ pl: 8, color: "#fff" }}
//                   selected={location.pathname === "/agents/profile"}
//                 >
//                   <ListItemText primary="Agent Profile" />
//                 </ListItemButton>

//                 {/* Teams submenu */}
//                 <ListItemButton
//                   onClick={handleAgentsTeamsClick}
//                   sx={{ pl: 8, color: "#fff" }}
//                 >
//                   <ListItemText primary="Teams" />
//                   {agentsTeamsOpen ? <ExpandLess /> : <ExpandMore />}
//                 </ListItemButton>

//                 <Collapse in={agentsTeamsOpen} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItemButton
//                       component={Link}
//                       to="/teams/team"
//                       sx={{ pl: 12, color: "#fff" }}
//                       selected={location.pathname === "/teams/team"}
//                     >
//                       <ListItemText primary="Team" />
//                     </ListItemButton>

//                     <ListItemButton
//                       component={Link}
//                       to="/teams/member"
//                       sx={{ pl: 12, color: "#fff" }}
//                       selected={location.pathname === "/teams/member"}
//                     >
//                       <ListItemText primary="Team Member" />
//                     </ListItemButton>
//                   </List>
//                 </Collapse>
//               </List>
//             </Collapse>
//           </List>
//         </Collapse>
//       </List>

//       {/* Footer */}
//       <Typography
//         variant="caption"
//         sx={{
//           mr: 5,
//           mt: 40,
//           display: "block",
//           textAlign: "center",
//           color: "#888",
//           height: { xs: 120, sm: 150, md: 180, lg: 500 },
//         }}
//       >
//         Powered by{" "}
//         <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
//           Bitmax
//         </Box>
//       </Typography>
//     </Drawer>
//   );
// };

// export default Sidebar;

// import React, { useState } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   ListItemIcon,
//   Toolbar,
//   Typography,
//   Box,
//   Collapse,
// } from "@mui/material";
// import {
//   Dashboard,
//   People,
//   Business,
//   ExpandLess,
//   ExpandMore,
//   Logout,
// } from "@mui/icons-material";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// const drawerWidth = 240;

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [companyOpen, setCompanyOpen] = useState(false);
//   const [companyAgentsOpen, setCompanyAgentsOpen] = useState(false);
//   const [agentsTeamsOpen, setAgentsTeamsOpen] = useState(false);
//   const [adminsOpen, setAdminsOpen] = useState(false);

//   const handleCompanyClick = () => setCompanyOpen(!companyOpen);
//   const handleCompanyAgentsClick = () =>
//     setCompanyAgentsOpen(!companyAgentsOpen);
//   const handleAgentsTeamsClick = () => setAgentsTeamsOpen(!agentsTeamsOpen);
//   const handleAdminsClick = () => setAdminsOpen(!adminsOpen);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login");
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         [`& .MuiDrawer-paper`]: {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           background: "#334155",
//           mt: 5,
//           height: "calc(100vh - 20px)",
//           overflowY: "auto",
//         },
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "center" }}>
//         <Typography variant="h6" sx={{ color: "#fff" }}>
//           Admin Panel
//         </Typography>
//       </Toolbar>

//       <List>
//         {/* Dashboard */}
//         <ListItem disablePadding>
//           <ListItemButton
//             component={Link}
//             to="/"
//             selected={location.pathname === "/"}
//             sx={{ color: "#fff" }}
//           >
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <Dashboard />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItemButton>
//         </ListItem>

//         {/* Companies */}
//         <ListItem disablePadding>
//           <ListItemButton onClick={handleCompanyClick} sx={{ color: "#fff" }}>
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <Business />
//             </ListItemIcon>
//             <ListItemText primary="Companies" />
//             {companyOpen ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>

//         <Collapse in={companyOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             {/* Company Options */}
//             <ListItemButton
//               component={Link}
//               to="/companies/contact-list"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/companies/contact-list"}
//             >
//               <ListItemText primary="Contact List" />
//             </ListItemButton>

//             <ListItemButton
//               component={Link}
//               to="/companies/add-edit-contact"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/companies/add-edit-contact"}
//             >
//               <ListItemText primary="Agents Page" />
//             </ListItemButton>

//             <ListItemButton
//               component={Link}
//               to="/companies/add-new-company"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/companies/add-new-company"}
//             >
//               <ListItemText primary="Add New Company" />
//             </ListItemButton>

//             <ListItemButton
//               component={Link}
//               to="/companies/all-company"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/companies/all-company"}
//             >
//               <ListItemText primary="Show All Company" />
//             </ListItemButton>

//             {/* Admins Submenu */}
//             <ListItemButton
//               onClick={handleAdminsClick}
//               sx={{ pl: 4, color: "#fff" }}
//             >
//               <ListItemText primary="Admins" />
//               {adminsOpen ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>

//             <Collapse in={adminsOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/admins/admin-page"
//                   sx={{ pl: 8, color: "#fff" }}
//                   selected={location.pathname === "/admins/admin-page"}
//                 >
//                   <ListItemText primary="Admins Page" />
//                 </ListItemButton>
//               </List>
//             </Collapse>

//             {/* Agents Submenu */}
//             <ListItemButton
//               onClick={handleCompanyAgentsClick}
//               sx={{ pl: 4, color: "#fff" }}
//             >
//               <ListItemText primary="Agents" />
//               {companyAgentsOpen ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>

//             <Collapse in={companyAgentsOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/agents/add-edit"
//                   sx={{ pl: 8, color: "#fff" }}
//                   selected={location.pathname === "/agents/add-edit"}
//                 >
//                   <ListItemText primary="Add/Edit Agent" />
//                 </ListItemButton>

//                 <ListItemButton
//                   component={Link}
//                   to="/agents/profile"
//                   sx={{ pl: 8, color: "#fff" }}
//                   selected={location.pathname === "/agents/profile"}
//                 >
//                   <ListItemText primary="Agent Profile" />
//                 </ListItemButton>

//                 {/* Teams Submenu */}
//                 <ListItemButton
//                   onClick={handleAgentsTeamsClick}
//                   sx={{ pl: 8, color: "#fff" }}
//                 >
//                   <ListItemText primary="Teams" />
//                   {agentsTeamsOpen ? <ExpandLess /> : <ExpandMore />}
//                 </ListItemButton>

//                 <Collapse in={agentsTeamsOpen} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItemButton
//                       component={Link}
//                       to="/teams/team"
//                       sx={{ pl: 12, color: "#fff" }}
//                       selected={location.pathname === "/teams/team"}
//                     >
//                       <ListItemText primary="Team" />
//                     </ListItemButton>

//                     <ListItemButton
//                       component={Link}
//                       to="/teams/member"
//                       sx={{ pl: 12, color: "#fff" }}
//                       selected={location.pathname === "/teams/member"}
//                     >
//                       <ListItemText primary="Team Member" />
//                     </ListItemButton>
//                   </List>
//                 </Collapse>
//               </List>
//             </Collapse>
//           </List>
//         </Collapse>
//       </List>

//       {/* Footer */}
//       <Typography
//         variant="caption"
//         sx={{
//           mr: 5,
//           mt: 40,
//           display: "block",
//           textAlign: "center",
//           color: "#888",
//         }}
//       >
//         Powered by{" "}
//         <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
//           Bitmax
//         </Box>
//       </Typography>
//     </Drawer>
//   );
// };

// export default Sidebar;

// import React, { useState } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   ListItemIcon,
//   Toolbar,
//   Typography,
//   Box,
//   Collapse,
// } from "@mui/material";
// import {
//   Dashboard,
//   People,
//   Business,
//   ExpandLess,
//   ExpandMore,
// } from "@mui/icons-material";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// const drawerWidth = 240;

// const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const [companyOpen, setCompanyOpen] = useState(false);
//   const [companyAgentsOpen, setCompanyAgentsOpen] = useState(false);
//   const [agentsTeamsOpen, setAgentsTeamsOpen] = useState(false);
//   const [adminsOpen, setAdminsOpen] = useState(false);

//   const handleCompanyClick = () => setCompanyOpen(!companyOpen);
//   const handleCompanyAgentsClick = () =>
//     setCompanyAgentsOpen(!companyAgentsOpen);
//   const handleAgentsTeamsClick = () => setAgentsTeamsOpen(!agentsTeamsOpen);
//   const handleAdminsClick = () => setAdminsOpen(!adminsOpen);

//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login");
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: drawerWidth,
//         [`& .MuiDrawer-paper`]: {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           background: "#334155",
//           mt: 5,
//           height: "calc(100vh - 20px)",
//           overflowY: "auto",
//         },
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "center" }}>
//         <Typography variant="h6" sx={{ color: "#fff" }}>
//           Admin Panel
//         </Typography>
//       </Toolbar>

//       <List>
//         {/* Dashboard */}
//         <ListItem disablePadding>
//           <ListItemButton
//             component={Link}
//             to="/"
//             selected={location.pathname === "/"}
//             sx={{ color: "#fff" }}
//           >
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <Dashboard />
//             </ListItemIcon>
//             <ListItemText primary="Dashboard" />
//           </ListItemButton>
//         </ListItem>

//         {/* Companies */}
//         <ListItem disablePadding>
//           <ListItemButton onClick={handleCompanyClick} sx={{ color: "#fff" }}>
//             <ListItemIcon sx={{ color: "#fff" }}>
//               <Business />
//             </ListItemIcon>
//             <ListItemText primary="Companies" />
//             {companyOpen ? <ExpandLess /> : <ExpandMore />}
//           </ListItemButton>
//         </ListItem>

//         <Collapse in={companyOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             {/* Company Options */}
//             <ListItemButton
//               component={Link}
//               to="/companies/contact-list"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/companies/contact-list"}
//             >
//               <ListItemText primary="Contact List" />
//             </ListItemButton>

//             <ListItemButton
//               component={Link}
//               to="/companies/add-new-company"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/companies/add-new-company"}
//             >
//               <ListItemText primary="Add New Company" />
//             </ListItemButton>

//             <ListItemButton
//               component={Link}
//               to="/companies/all-company"
//               sx={{ pl: 4, color: "#fff" }}
//               selected={location.pathname === "/companies/all-company"}
//             >
//               <ListItemText primary="Show All Company" />
//             </ListItemButton>

//             {/* Admins Submenu */}
//             <ListItemButton
//               onClick={handleAdminsClick}
//               sx={{ pl: 4, color: "#fff" }}
//             >
//               <ListItemText primary="Admins" />
//               {adminsOpen ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>

//             <Collapse in={adminsOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/admins/admin-page"
//                   sx={{ pl: 8, color: "#fff" }}
//                   selected={location.pathname === "/admins/admin-page"}
//                 >
//                   <ListItemText primary="Admins Page" />
//                 </ListItemButton>
//               </List>
//             </Collapse>

//             {/* Agents Submenu */}
//             <ListItemButton
//               onClick={handleCompanyAgentsClick}
//               sx={{ pl: 4, color: "#fff" }}
//             >
//               <ListItemText primary="Agents" />
//               {companyAgentsOpen ? <ExpandLess /> : <ExpandMore />}
//             </ListItemButton>

//             <Collapse in={companyAgentsOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItemButton
//                   component={Link}
//                   to="/agents/add-edit"
//                   sx={{ pl: 8, color: "#fff" }}
//                   selected={location.pathname === "/agents/add-edit"}
//                 >
//                   <ListItemText primary="Add/Edit Agent" />
//                 </ListItemButton>

//                 <ListItemButton
//                   component={Link}
//                   to="/agents/profile"
//                   sx={{ pl: 8, color: "#fff" }}
//                   selected={location.pathname === "/agents/profile"}
//                 >
//                   <ListItemText primary="Agent Profile" />
//                 </ListItemButton>

//                 {/* Teams Submenu */}
//                 <ListItemButton
//                   onClick={handleAgentsTeamsClick}
//                   sx={{ pl: 8, color: "#fff" }}
//                 >
//                   <ListItemText primary="Teams" />
//                   {agentsTeamsOpen ? <ExpandLess /> : <ExpandMore />}
//                 </ListItemButton>

//                 <Collapse in={agentsTeamsOpen} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItemButton
//                       component={Link}
//                       to="/teams/team"
//                       sx={{ pl: 12, color: "#fff" }}
//                       selected={location.pathname === "/teams/team"}
//                     >
//                       <ListItemText primary="Team" />
//                     </ListItemButton>

//                     <ListItemButton
//                       component={Link}
//                       to="/teams/member"
//                       sx={{ pl: 12, color: "#fff" }}
//                       selected={location.pathname === "/teams/member"}
//                     >
//                       <ListItemText primary="Team Member" />
//                     </ListItemButton>
//                   </List>
//                 </Collapse>
//               </List>
//             </Collapse>
//           </List>
//         </Collapse>
//       </List>

//       {/* Footer */}
//       <Typography
//         variant="caption"
//         sx={{
//           mr: 5,
//           mt: 40,
//           display: "block",
//           textAlign: "center",
//           color: "#888",
//         }}
//       >
//         Powered by{" "}
//         <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
//           Bitmax
//         </Box>
//       </Typography>
//     </Drawer>
//   );
// };

// export default Sidebar;



import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  Box,
  Collapse,
} from "@mui/material";
import {
  Dashboard,
  People,
  Business,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyAgentsOpen, setCompanyAgentsOpen] = useState(false);
  const [agentsTeamsOpen, setAgentsTeamsOpen] = useState(false);
  const [adminsOpen, setAdminsOpen] = useState(false);

  const handleCompanyClick = () => setCompanyOpen(!companyOpen);
  const handleCompanyAgentsClick = () =>
    setCompanyAgentsOpen(!companyAgentsOpen);
  const handleAgentsTeamsClick = () => setAgentsTeamsOpen(!agentsTeamsOpen);
  const handleAdminsClick = () => setAdminsOpen(!adminsOpen);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#334155",
          mt: 5,
          height: "calc(100vh - 20px)",
          overflowY: "auto",
        },
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6" sx={{ color: "#fff" }}>
        Super Admin 
        </Typography>
      </Toolbar>

      <List>
        {/* Dashboard */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            selected={location.pathname === "/"}
            sx={{ color: "#fff" }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        {/* Companies */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleCompanyClick} sx={{ color: "#fff" }}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Business />
            </ListItemIcon>
            <ListItemText primary="Companies" />
            {companyOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={companyOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* Company Options */}
            <ListItemButton
              component={Link}
              to="/companies/contact-list"
              sx={{ pl: 4, color: "#fff" }}
              selected={location.pathname === "/companies/contact-list"}
            >
              <ListItemText primary="Contact List" />
            </ListItemButton>

            <ListItemButton
              component={Link}
              to="/companies/add-new-company"
              sx={{ pl: 4, color: "#fff" }}
              selected={location.pathname === "/companies/add-new-company"}
            >
              <ListItemText primary="Add New Company" />
            </ListItemButton>

            {/* <ListItemButton
              component={Link}
              to="/companies/all-company"
              sx={{ pl: 4, color: "#fff" }}
              selected={location.pathname === "/companies/all-company"}
            >
              <ListItemText primary="Show All Company" />
            </ListItemButton> */}

              {/* KYc Details */}
              <ListItemButton
                component={Link}
                to="/companies/kyc-details"
                sx={{ pl: 4, color: "#fff" }}
                selected={location.pathname === "/companies/kyc-details"}
              >
                <ListItemText primary="KYC Details" />
              </ListItemButton>

            {/* Admins Submenu */}
            <ListItemButton
              onClick={handleAdminsClick}
              sx={{ pl: 4, color: "#fff" }}
            >
              <ListItemText primary="Admins" />
              {adminsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={adminsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/admins/create-admin"
                  sx={{ pl: 8, color: "#fff" }}
                  selected={location.pathname === "/admins/create-admin"}
                >
                  <ListItemText primary="Create Admin" />
                </ListItemButton>
              </List>

              {/* Admin Details */}
              <List component="div" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/admins/admin-details"
                  sx={{ pl: 8, color: "#fff" }}
                  selected={location.pathname === "/admins/admin-details"}
                >
                  <ListItemText primary="Admins Details" />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Agents Submenu */}
            <ListItemButton
              onClick={handleCompanyAgentsClick}
              sx={{ pl: 4, color: "#fff" }}
            >
              <ListItemText primary="Agents" />
              {companyAgentsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={companyAgentsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  component={Link}
                  to="/agents/add-edit"
                  sx={{ pl: 8, color: "#fff" }}
                  selected={location.pathname === "/agents/add-edit"}
                >
                  <ListItemText primary="Add/Edit Agent" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  to="/agents/profile"
                  sx={{ pl: 8, color: "#fff" }}
                  selected={location.pathname === "/agents/profile"}
                >
                  <ListItemText primary="Agent Profile" />
                </ListItemButton>

                {/* Teams Submenu */}
                <ListItemButton
                  onClick={handleAgentsTeamsClick}
                  sx={{ pl: 8, color: "#fff" }}
                >
                  <ListItemText primary="Teams" />
                  {agentsTeamsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

                <Collapse in={agentsTeamsOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton
                      component={Link}
                      to="Teams/teams-page"
                      sx={{ pl: 12, color: "#fff" }}
                      selected={location.pathname === "Teams/teams-page"}
                    >
                      <ListItemText primary="Team Page" />
                    </ListItemButton>

                    <ListItemButton
                      component={Link}
                      to="Teams/teams-member"
                      sx={{ pl: 12, color: "#fff" }}
                      selected={location.pathname === "Teams/teams-member"}
                    >
                      <ListItemText primary="Teams Member" />
                    </ListItemButton>
                  </List>
                </Collapse>
              </List>
            </Collapse>
          </List>
        </Collapse>
      </List>

      {/* Footer */}
      <Typography
        variant="caption"
        sx={{
          mr: 5,
          mt: 40,
          display: "block",
          textAlign: "center",
          color: "#888",
        }}
      >
        Powered by{" "}
        <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
          Bitmax
        </Box>
      </Typography>
    </Drawer>
  );
};

export default Sidebar;
