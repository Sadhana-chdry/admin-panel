// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Grid,
//   Paper,
//   Typography,
//   TextField,
//   InputAdornment,
//   IconButton,
//   TableContainer,
//   Table,
//   TableHead,
//   TableCell,
//   TableRow,
//   TableBody,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import EditIcon from "@mui/icons-material/Edit";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import DeleteIcon from "@mui/icons-material/Delete";

// const CompanyCallLog = () => {
//   // ✅ State for calls
//   const [callHistory, setCallHistory] = useState([
//     {
//       agent: "John Doe",
//       recipient: "123-456-7890",
//       dateTime: "2025-09-27 10:30 AM",
//       duration: "5 min",
//       status: "Completed",
//     },
//     {
//       agent: "Jane Smith",
//       recipient: "987-654-3210",
//       dateTime: "2025-09-26 02:15 PM",
//       duration: "2 min",
//       status: "Missed",
//     },
//     {
//       agent: "Bob Lee",
//       recipient: "555-555-5555",
//       dateTime: "2025-09-25 11:45 AM",
//       duration: "7 min",
//       status: "Completed",
//     },
//   ]);

//   const [filter, setFilter] = useState("All");
//   const [search, setSearch] = useState("");
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editData, setEditData] = useState({
//     agent: "",
//     recipient: "",
//     dateTime: "",
//     duration: "",
//     status: "",
//   });

//   // ✅ Delete call
//   const handleDelete = (index) => {
//     const updated = callHistory.filter((_, i) => i !== index);
//     setCallHistory(updated);
//   };

//   // ✅ Copy call
//   const handleCopy = (call) => {
//     const copied = { ...call, dateTime: new Date().toLocaleString() };
//     setCallHistory([...callHistory, copied]);
//     alert("Call copied successfully!");
//   };

//   // ✅ Edit call (open dialog)
//   const handleEdit = (index) => {
//     setEditingIndex(index);
//     setEditData(callHistory[index]);
//   };

//   // ✅ Save edited call
//   const handleSaveEdit = () => {
//     const updated = [...callHistory];
//     updated[editingIndex] = editData;
//     setCallHistory(updated);
//     setEditingIndex(null);
//     alert("Call updated successfully!");
//   };

//   // ✅ Cancel editing
//   const handleCancelEdit = () => {
//     setEditingIndex(null);
//   };

//   // ✅ Add dummy missed call
//   const handleAddContact = () => {
//     const newCall = {
//       agent: "New Agent",
//       recipient: "000-000-0000",
//       dateTime: new Date().toLocaleString(),
//       duration: "3 min",
//       status: "Missed",
//     };
//     setCallHistory([...callHistory, newCall]);
//   };

//   // ✅ Import dummy calls
//   const handleImportContacts = () => {
//     const imported = [
//       {
//         agent: "Alice",
//         recipient: "111-222-3333",
//         dateTime: "2025-09-29 01:00 PM",
//         duration: "6 min",
//         status: "Completed",
//       },
//       {
//         agent: "Mark",
//         recipient: "444-555-6666",
//         dateTime: "2025-09-30 04:20 PM",
//         duration: "4 min",
//         status: "Missed",
//       },
//     ];
//     setCallHistory([...callHistory, ...imported]);
//   };

//   // ✅ Save all calls
//   const handleSave = () => {
//     alert("Call log saved successfully!");
//   };

//   // ✅ Filter + Search logic
//   const filteredCalls = callHistory.filter((c) => {
//     const matchesFilter = filter === "All" || c.status === filter;
//     const matchesSearch =
//       c.agent.toLowerCase().includes(search.toLowerCase()) ||
//       c.recipient.includes(search) ||
//       c.dateTime.toLowerCase().includes(search.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   return (
//     <Box sx={{ p: 1, minHeight: "100vh", background: "#1e293b", color: "#fff", width:"100%", height:"100%"}}>
//       {/* Header */}
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, pt: 5 }}>
//         Company Call Log
//       </Typography>

//       {/* Search */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           gap: 2,
//           mb: 2,
//         }}
//       >
//         <TextField
//           placeholder="Search by Agent, Caller/Recipient..."
//           size="small"
//           variant="outlined"
//           sx={{ flex: 1, maxWidth: 400, background: "#fff", borderRadius: 1 }}
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
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
//       </Box>

//       {/* Filters + Actions */}
//       <Grid container spacing={2} sx={{ mb: 2, alignItems: "center" }}>
//         <Grid item>
//           <Button variant="contained" color="primary" onClick={() => setFilter("All")}>
//             All
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button
//             variant="contained"
//             sx={{ background: "#fff", color: "#1e293b" }}
//             onClick={() => setFilter("Completed")}
//           >
//             Incoming
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button
//             variant="contained"
//             sx={{ background: "#fff", color: "#1e293b" }}
//             onClick={() => setFilter("Missed")}
//           >
//             Outgoing
//           </Button>
//         </Grid>

//         {/* Right aligned actions */}
//         <Grid item xs />
//         <Grid item>
//           <Button variant="contained" color="primary" onClick={handleAddContact}>
//             Missed
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button
//             variant="contained"
//             sx={{ background: "#fff", color: "#1e293b" }}
//             onClick={handleImportContacts}
//           >
//             Date Range
//           </Button>
//         </Grid>
//       </Grid>

//       {/* Divider */}
//       <Box sx={{ borderBottom: "1px solid white", my: 2 }} />

//       {/* Table */}
//       <Paper
//         sx={{
//           p: 2,
//           borderRadius: 2,
//           background: "#283645",
//           color: "#fff",
//           overflowX: "auto",
//         }}
//       >
//         <TableContainer>
//           <Table size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Agent</TableCell>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                   Caller/Recipient
//                 </TableCell>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Date-Time</TableCell>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Duration</TableCell>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Call Status</TableCell>
//                 <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredCalls.length > 0 ? (
//                 filteredCalls.map((call, index) => (
//                   <TableRow key={index}>
//                     <TableCell sx={{ color: "#fff" }}>{call.agent}</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>{call.recipient}</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>{call.dateTime}</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>{call.duration}</TableCell>
//                     <TableCell sx={{ color: "#fff" }}>{call.status}</TableCell>
//                     <TableCell>
//                       <IconButton color="primary" onClick={() => handleEdit(index)}>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton color="secondary" onClick={() => handleCopy(call)}>
//                         <ContentCopyIcon />
//                       </IconButton>
//                       <IconButton color="error" onClick={() => handleDelete(index)}>
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} sx={{ color: "#fff", textAlign: "center" }}>
//                     No records found
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>

//       {/* Save Button */}
//       <Box textAlign="center" sx={{ mt: 3 }}>
//         <Button variant="contained" color="primary" size="large" onClick={handleSave}>
//           Save Call Log
//         </Button>
//       </Box>

//       {/* Edit Dialog */}
//       <Dialog open={editingIndex !== null} onClose={handleCancelEdit}>
//         <DialogTitle>Edit Call</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           <TextField
//             label="Agent"
//             value={editData.agent}
//             onChange={(e) => setEditData({ ...editData, agent: e.target.value })}
//           />
//           <TextField
//             label="Recipient"
//             value={editData.recipient}
//             onChange={(e) => setEditData({ ...editData, recipient: e.target.value })}
//           />
//           <TextField
//             label="Date-Time"
//             value={editData.dateTime}
//             onChange={(e) => setEditData({ ...editData, dateTime: e.target.value })}
//           />
//           <TextField
//             label="Duration"
//             value={editData.duration}
//             onChange={(e) => setEditData({ ...editData, duration: e.target.value })}
//           />
//           <TextField
//             label="Status"
//             value={editData.status}
//             onChange={(e) => setEditData({ ...editData, status: e.target.value })}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCancelEdit}>Cancel</Button>
//           <Button onClick={handleSaveEdit} variant="contained" color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CompanyCallLog;


// ..........................................................

// import React, { useState, useRef, useEffect } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   InputAdornment,
//   IconButton,
//   TableContainer,
//   Table,
//   TableCell,
//   TableRow,
//   TableHead,
//   TableBody,
//   Slider,
//   Button,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Tooltip,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import PauseIcon from "@mui/icons-material/Pause";
// import StopIcon from "@mui/icons-material/Stop";
// import VolumeUpIcon from "@mui/icons-material/VolumeUp";
// import VolumeOffIcon from "@mui/icons-material/VolumeOff";
// import MicIcon from "@mui/icons-material/Mic";
// import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
// import SaveIcon from "@mui/icons-material/Save";
// import InfoIcon from "@mui/icons-material/Info";
// import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";

// const CallDetails = () => {
//   const [callHistory, setCallHistory] = useState([
//     {
//       id: 1,
//       agent: "John Doe",
//       recipient: "123-456-7890",
//       dateTime: "2025-09-27 10:30 AM",
//       status: "Answered",
//       recording: null,
//       duration: "00:00",
//       notes:
//         "Discussed project status update. Client seems satisfied with the progress. Scheduled follow-up for next week.",
//     },
//     {
//       id: 2,
//       agent: "Jane Smith",
//       recipient: "987-654-3210",
//       dateTime: "2025-09-26 02:15 PM",
//       status: "Answered",
//       recording: null,
//       duration: "00:00",
//       notes: "Client had technical issues. Provided troubleshooting steps.",
//     },
//     {
//       id: 3,
//       agent: "Bob Lee",
//       recipient: "555-555-5555",
//       dateTime: "2025-09-25 11:45 AM",
//       status: "UnAnswered",
//       recording: null,
//       duration: "00:00",
//       notes: "No answer. Left voicemail with callback information.",
//     },
//   ]);

//   const [search, setSearch] = useState("");
//   const [filter] = useState("All");
//   const [selectedCall, setSelectedCall] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [recordedAudio, setRecordedAudio] = useState(null);
//   const [recordingTime, setRecordingTime] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(1);
//   const [muted, setMuted] = useState(false);
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [editNotes, setEditNotes] = useState("");
//   const [showRecordingHelp, setShowRecordingHelp] = useState(true);

//   const audioRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const recordingIntervalRef = useRef(null);
//   const audioChunksRef = useRef([]);

//   // Audio player effects
//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = muted ? 0 : volume;
//     }
//   }, [volume, muted]);

//   useEffect(() => {
//     let interval;
//     if (isPlaying && audioRef.current) {
//       audioRef.current.play();
//       interval = setInterval(() => {
//         if (audioRef.current) {
//           setProgress(Math.floor(audioRef.current.currentTime));
//           if (audioRef.current.currentTime >= audioRef.current.duration) {
//             setIsPlaying(false);
//             setProgress(0);
//           }
//         }
//       }, 1000);
//     } else if (audioRef.current) {
//       audioRef.current.pause();
//     }
//     return () => clearInterval(interval);
//   }, [isPlaying]);

//   // Recording timer effect
//   useEffect(() => {
//     if (isRecording) {
//       recordingIntervalRef.current = setInterval(() => {
//         setRecordingTime((prev) => prev + 1);
//       }, 1000);
//     } else {
//       clearInterval(recordingIntervalRef.current);
//     }

//     return () => clearInterval(recordingIntervalRef.current);
//   }, [isRecording]);

//   // Start recording function
//   const startRecording = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const mediaRecorder = new MediaRecorder(stream);
//       mediaRecorderRef.current = mediaRecorder;
//       audioChunksRef.current = [];

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0) {
//           audioChunksRef.current.push(event.data);
//         }
//       };

//       mediaRecorder.onstop = () => {
//         const audioBlob = new Blob(audioChunksRef.current, {
//           type: "audio/wav",
//         });
//         const audioUrl = URL.createObjectURL(audioBlob);
//         setRecordedAudio(audioUrl);

//         // Clean up media stream
//         stream.getTracks().forEach((track) => track.stop());
//       };

//       mediaRecorder.start();
//       setIsRecording(true);
//       setRecordingTime(0);
//       setShowRecordingHelp(false);
//     } catch (error) {
//       console.error("Error starting recording:", error);
//       alert("Error accessing microphone. Please check permissions.");
//     }
//   };

//   // Stop recording function
//   const stopRecording = () => {
//     if (mediaRecorderRef.current && isRecording) {
//       mediaRecorderRef.current.stop();
//       setIsRecording(false);
//     }
//   };

//   // Save recording to call history
//   const saveRecording = () => {
//     if (recordedAudio && selectedCall) {
//       const duration = `${String(Math.floor(recordingTime / 60)).padStart(
//         2,
//         "0"
//       )}:${String(recordingTime % 60).padStart(2, "0")}`;

//       setCallHistory((prev) =>
//         prev.map((call) =>
//           call.id === selectedCall.id
//             ? {
//                 ...call,
//                 recording: recordedAudio,
//                 duration: duration,
//               }
//             : call
//         )
//       );

//       setRecordedAudio(null);
//       setRecordingTime(0);
//       alert("Recording saved successfully!");
//     }
//   };

//   // Delete recording
//   const deleteRecording = () => {
//     if (selectedCall) {
//       setCallHistory((prev) =>
//         prev.map((call) =>
//           call.id === selectedCall.id
//             ? {
//                 ...call,
//                 recording: null,
//                 duration: "00:00",
//               }
//             : call
//         )
//       );
//       setRecordedAudio(null);
//       if (audioRef.current) {
//         audioRef.current.pause();
//         setIsPlaying(false);
//         setProgress(0);
//       }
//     }
//   };

//   const handleDelete = (index) => {
//     const updated = callHistory.filter((_, i) => i !== index);
//     setCallHistory(updated);
//   };

//   const handleEdit = (call) => {
//     setSelectedCall(call);
//     setEditNotes(call.notes);
//     setEditDialogOpen(true);
//   };

//   const saveNotes = () => {
//     if (selectedCall) {
//       setCallHistory((prev) =>
//         prev.map((call) =>
//           call.id === selectedCall.id ? { ...call, notes: editNotes } : call
//         )
//       );
//       setEditDialogOpen(false);
//       alert("Notes updated successfully!");
//     }
//   };

//   const handleCopy = (call) => {
//     const text = `Agent: ${call.agent}\nRecipient: ${call.recipient}\nDate: ${call.dateTime}\nStatus: ${call.status}`;
//     navigator.clipboard.writeText(text);
//     alert("Copied to clipboard!");
//   };

//   const formatTime = (seconds) => {
//     return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
//       seconds % 60
//     ).padStart(2, "0")}`;
//   };

//   const filteredCalls = callHistory.filter((c) => {
//     const matchesFilter = filter === "All" || c.status === filter;
//     const matchesSearch =
//       c.agent.toLowerCase().includes(search.toLowerCase()) ||
//       c.recipient.includes(search) ||
//       c.dateTime.toLowerCase().includes(search.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   const togglePlay = () => {
//     if (selectedCall?.recording || recordedAudio) {
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const toggleMute = () => setMuted(!muted);

//   const handleProgressChange = (e, val) => {
//     setProgress(val);
//     if (audioRef.current) {
//       audioRef.current.currentTime = val;
//       if (!isPlaying) {
//         setIsPlaying(true);
//       }
//     }
//   };

//   const handleVolumeChange = (e, val) => {
//     setVolume(val / 100);
//   };

//   return (
//     <Box
//       sx={{
//         p: 2,
//         minHeight: "100vh",
//         background: "#1e293b",
//         color: "#fff",
//         width: "100%",
//         height: "100%",
//       }}
//     >
//       {/* Header */}
//       <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, pt: 3 }}>
//         Call Details
//       </Typography>

//       {/* Search */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           gap: 2,
//           mb: 2,
//         }}
//       >
//         <TextField
//           placeholder="Search by Agent, Caller/Recipient..."
//           size="small"
//           variant="outlined"
//           sx={{ flex: 1, maxWidth: 400, background: "#fff", borderRadius: 1 }}
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
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
//       </Box>

//       {/* Recording Instructions Alert */}
//       {showRecordingHelp && (
//         <Alert 
//           severity="info" 
//           icon={<RecordVoiceOverIcon />}
//           sx={{ mb: 2, background: '#1e40af', color: '#fff' }}
//           onClose={() => setShowRecordingHelp(false)}
//         >
//           <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
//             How to Record a Call:
//           </Typography>
//           <Typography variant="body2">
//             1. Click on any call in the table to select it<br />
//             2. Click the "Start Recording" button below<br />
//             3. Speak into your microphone<br />
//             4. Click "Stop Recording" when finished<br />
//             5. Save your recording to attach it to the call
//           </Typography>
//         </Alert>
//       )}

//       {/* Main Content */}
//       <Box
//         sx={{
//           display: "flex",
//           gap: 3,
//           flexDirection: { xs: "column", lg: "row" },
//         }}
//       >
//         {/* Table Section */}
//         <Paper
//           sx={{
//             p: 2,
//             borderRadius: 2,
//             background: "#283645",
//             color: "#fff",
//             overflowX: "auto",
//             flex: 1,
//           }}
//         >
//           <TableContainer>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                     Agent Summary
//                   </TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                     Date
//                   </TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                     Time
//                   </TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                     Call Status
//                   </TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                     Recording
//                   </TableCell>
//                   <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
//                     Actions
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredCalls.length > 0 ? (
//                   filteredCalls.map((call, index) => (
//                     <TableRow
//                       key={call.id}
//                       sx={{
//                         cursor: "pointer",
//                         backgroundColor:
//                           selectedCall?.id === call.id
//                             ? "#374151"
//                             : "transparent",
//                         "&:hover": { backgroundColor: "#374151" },
//                         borderLeft: selectedCall?.id === call.id ? "4px solid #3b82f6" : "none",
//                       }}
//                       onClick={() => {
//                         setSelectedCall(call);
//                         setShowRecordingHelp(false);
//                       }}
//                     >
//                       <TableCell sx={{ color: "#fff" }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           {call.agent}
//                           {selectedCall?.id === call.id && (
//                             <Tooltip title="Currently selected for recording">
//                               <MicIcon sx={{ color: '#3b82f6', fontSize: 16 }} />
//                             </Tooltip>
//                           )}
//                         </Box>
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {call.dateTime.split(" ")[0]}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {call.dateTime.split(" ")[1]}{" "}
//                         {call.dateTime.split(" ")[2]}
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         <Chip
//                           label={call.status}
//                           size="small"
//                           color={
//                             call.status === "Answered" ? "success" : "error"
//                           }
//                           sx={{ color: "#fff" }}
//                         />
//                       </TableCell>
//                       <TableCell sx={{ color: "#fff" }}>
//                         {call.recording ? (
//                           <Chip
//                             label={call.duration}
//                             size="small"
//                             color="primary"
//                             icon={<PlayArrowIcon />}
//                           />
//                         ) : (
//                           <Chip
//                             label="No Recording"
//                             size="small"
//                             variant="outlined"
//                             color="default"
//                           />
//                         )}
//                       </TableCell>
//                       <TableCell>
//                         <IconButton
//                           color="primary"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleEdit(call);
//                           }}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton
//                           color="success"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleCopy(call);
//                           }}
//                         >
//                           <ContentCopyIcon />
//                         </IconButton>
//                         <IconButton
//                           color="error"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDelete(index);
//                           }}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell
//                       colSpan={6}
//                       sx={{ color: "#fff", textAlign: "center" }}
//                     >
//                       No records found
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Box>

//       {/* Edit Notes Dialog */}
//       <Dialog
//         open={editDialogOpen}
//         onClose={() => setEditDialogOpen(false)}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{ sx: { background: "#334155", color: "#fff" } }}
//       >
//         <DialogTitle>Edit Agent Notes</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             multiline
//             rows={4}
//             fullWidth
//             value={editNotes}
//             onChange={(e) => setEditNotes(e.target.value)}
//             sx={{ mt: 1, background: "#475569", borderRadius: 1 }}
//             InputProps={{ sx: { color: "#fff" } }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
//           <Button onClick={saveNotes} variant="contained">
//             Save Notes
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Recording and Notes Section */}
//       <Box 
//         sx={{
//           width: "100%",
//           maxWidth: "1000px",
//           mx: "auto",
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//         }}
//       >
//         {/* Call Recording Player */}
//         <Paper
//           sx={{
//             p: 2,
//             borderRadius: 2,
//             background: "#334155",
//             color: "#fff",
//             mb: 2,
//             mt: 2,
//             border: selectedCall ? "2px solid #3b82f6" : "2px solid #475569",
//           }}
//         >
//           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//               Call Recording
//             </Typography>
//             <Tooltip title="Recording Instructions">
//               <IconButton 
//                 size="small" 
//                 onClick={() => setShowRecordingHelp(!showRecordingHelp)}
//                 sx={{ color: '#9ca3af' }}
//               >
//                 <InfoIcon />
//               </IconButton>
//             </Tooltip>
//           </Box>

//           {selectedCall ? (
//             <Box>
//               <Typography variant="body2" sx={{ mb: 2, color: '#3b82f6', fontWeight: 'bold' }}>
//                 📞 Selected: {selectedCall.agent} - {selectedCall.recipient}
//               </Typography>

//               {/* Recording Status */}
//               {isRecording && (
//                 <Alert 
//                   severity="warning" 
//                   icon={<FiberManualRecordIcon />}
//                   sx={{ mb: 2, background: '#dc2626', color: '#fff' }}
//                 >
//                   <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//                     🔴 RECORDING... {formatTime(recordingTime)}
//                   </Typography>
//                   <Typography variant="body2">
//                     Speak into your microphone. Click "Stop Recording" when finished.
//                   </Typography>
//                 </Alert>
//               )}

//               {/* Recording Controls */}
//               <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//                 {!isRecording ? (
//                   <Button
//                     variant="contained"
//                     color="error"
//                     startIcon={<FiberManualRecordIcon />}
//                     onClick={startRecording}
//                     size="large"
//                     sx={{ py: 1.5 }}
//                   >
//                     🎤 Start Recording
//                   </Button>
//                 ) : (
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     startIcon={<StopIcon />}
//                     onClick={stopRecording}
//                     size="large"
//                     sx={{ py: 1.5 }}
//                   >
//                     ⏹️ Stop Recording ({formatTime(recordingTime)})
//                   </Button>
//                 )}

//                 {recordedAudio && (
//                   <Button
//                     variant="contained"
//                     color="success"
//                     startIcon={<SaveIcon />}
//                     onClick={saveRecording}
//                   >
//                     💾 Save Recording to Call
//                   </Button>
//                 )}

//                 {(selectedCall.recording || recordedAudio) && (
//                   <Button
//                     variant="outlined"
//                     color="warning"
//                     startIcon={<DeleteIcon />}
//                     onClick={deleteRecording}
//                   >
//                     🗑️ Delete Recording
//                   </Button>
//                 )}
//               </Box>

//               {/* Audio Player */}
//               {(selectedCall.recording || recordedAudio) && (
//                 <Box sx={{ mt: 2, p: 2, background: '#475569', borderRadius: 1 }}>
//                   <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
//                     🎧 Playback Controls:
//                   </Typography>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1,
//                       mb: 1,
//                     }}
//                   >
//                     <IconButton
//                       onClick={togglePlay}
//                       sx={{ color: "#fff", background: "#3b82f6" }}
//                     >
//                       {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
//                     </IconButton>

//                     <Slider
//                       value={progress}
//                       max={
//                         audioRef.current
//                           ? Math.floor(audioRef.current.duration) || 330
//                           : 330
//                       }
//                       onChange={handleProgressChange}
//                       sx={{ flex: 1, color: "#38bdf8" }}
//                     />

//                     <Typography variant="body2" sx={{ minWidth: 80 }}>
//                       {formatTime(progress)} /{" "}
//                       {selectedCall.duration || "05:30"}
//                     </Typography>
//                   </Box>

//                   {/* Volume Control */}
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <IconButton onClick={toggleMute} sx={{ color: "#fff" }}>
//                       {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
//                     </IconButton>
//                     <Slider
//                       value={volume * 100}
//                       onChange={handleVolumeChange}
//                       sx={{ flex: 1, color: "#38bdf8" }}
//                     />
//                   </Box>
//                 </Box>
//               )}

//               {/* Hidden Audio Element */}
//               <audio
//                 ref={audioRef}
//                 src={recordedAudio || selectedCall.recording}
//                 onEnded={() => {
//                   setIsPlaying(false);
//                   setProgress(0);
//                 }}
//               />
//             </Box>
//           ) : (
//             <Box sx={{ textAlign: 'center', py: 3 }}>
//               <RecordVoiceOverIcon sx={{ fontSize: 48, color: '#9ca3af', mb: 1 }} />
//               <Typography variant="body2" sx={{ color: "#9ca3af", mb: 1 }}>
//                 👆 Select a call from the table above to start recording
//               </Typography>
//               <Typography variant="caption" sx={{ color: "#6b7280" }}>
//                 Click on any row in the call history table to begin
//               </Typography>
//             </Box>
//           )}
//         </Paper>

//         {/* Agent Notes */}
//         {selectedCall && (
//           <Paper
//             sx={{
//               p: 2,
//               borderRadius: 2,
//               background: "#334155",
//               color: "#fff",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 1,
//               }}
//             >
//               <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                 📝 Agent Notes
//               </Typography>
//               <IconButton
//                 color="primary"
//                 size="small"
//                 onClick={() => handleEdit(selectedCall)}
//               >
//                 <EditIcon />
//               </IconButton>
//             </Box>
//             <Typography variant="body2" sx={{ fontWeight: "normal" }}>
//               {selectedCall.notes}
//             </Typography>
//           </Paper>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default CallDetails;

