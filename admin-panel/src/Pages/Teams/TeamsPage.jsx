// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
// } from "@mui/material";
// import { Delete } from "@mui/icons-material";
// import axios from "axios";

// const BASE_URL = "https://superfone-admin.onrender.com";

// const TeamsPage = () => {
//   const [members, setMembers] = useState([]);
//   const [teams, setTeams] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     teamId: "",
//   });

//   const fetchMembers = async () => {
//     const res = await axios.get(`${BASE_URL}/api/superadmin/team-members`);
//     setMembers(res.data || []);
//   };

//   const fetchTeams = async () => {
//     const res = await axios.get(`${BASE_URL}/api/superadmin/teams`);
//     setTeams(res.data || []);
//   };

//   useEffect(() => {
//     fetchMembers();
//     fetchTeams();
//   }, []);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post(`${BASE_URL}/api/superadmin/team-members/create`, formData);
//     fetchMembers();
//     setFormData({ name: "", email: "", teamId: "" });
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`${BASE_URL}/api/superadmin/team-members/${id}`);
//     fetchMembers();
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, color: "#fff" }}>
//       <Typography variant="h5" gutterBottom>
//         Team Members Management
//       </Typography>

//       <Paper sx={{ p: 3, mb: 3, backgroundColor: "#1e293b" }}>
//         <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
//           <TextField
//             label="Member Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             sx={{ flex: 1, background: "#fff", borderRadius: 1 }}
//           />
//           <TextField
//             label="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             sx={{ flex: 1, background: "#fff", borderRadius: 1 }}
//           />
//           <TextField
//             select
//             label="Select Team"
//             name="teamId"
//             value={formData.teamId}
//             onChange={handleChange}
//             SelectProps={{ native: true }}
//             sx={{ flex: 1, background: "#fff", borderRadius: 1 }}
//           >
//             <option value="">Select</option>
//             {teams.map((team) => (
//               <option key={team._id} value={team._id}>
//                 {team.name}
//               </option>
//             ))}
//           </TextField>
//           <Button variant="contained" color="primary" type="submit">
//             Add Member
//           </Button>
//         </form>
//       </Paper>

//       <TableContainer component={Paper} sx={{ background: "#1e293b" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell sx={{ color: "#fff" }}>#</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Name</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Email</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Team</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {members.map((m, i) => (
//               <TableRow key={m._id}>
//                 <TableCell sx={{ color: "#fff" }}>{i + 1}</TableCell>
//                 <TableCell sx={{ color: "#fff" }}>{m.name}</TableCell>
//                 <TableCell sx={{ color: "#fff" }}>{m.email}</TableCell>
//                 <TableCell sx={{ color: "#fff" }}>
//                   {m.team?.name || "N/A"}
//                 </TableCell>
//                 <TableCell>
//                   <IconButton color="error" onClick={() => handleDelete(m._id)}>
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default TeamsPage;



import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        "https://superfone-admin.onrender.com/api/superadmin/team/all",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );

      // Ensure teams is always an array
      const fetchedTeams = Array.isArray(response.data)
        ? response.data
        : response.data?.teams || [];

      setTeams(fetchedTeams);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching teams:", error);
      setTeams([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress color="primary" />
      </Box>
    );

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2} sx={{ color: "#fff" }}>
        Teams
      </Typography>

      {teams.length === 0 ? (
        <Typography sx={{ color: "#fff" }}>No teams found.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Team ID</TableCell>
                <TableCell>Team Name</TableCell>
                <TableCell>Admin ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team._id}>
                  <TableCell>{team._id}</TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.adminId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
export default TeamsPage;

