import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Card,
  CardContent,
  CardActionArea,
  LinearProgress,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  useTheme,
} from "@mui/material";
import { Edit, TrendingUp, EmojiEvents, WorkspacePremium } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../config/env";

const AVATAR_COLORS = [
  "#4caf50", "#2196f3", "#9c27b0", "#ff5722",
  "#f06292", "#ffb300", "#00bcd4", "#795548",
  "#e91e63", "#00897b", "#3949ab", "#f4511e",
];

const courses = [
  { label: "Digital Fundamentals", to: "/courses/digital", color: "#4caf50" },
  { label: "Verilog", to: "/courses/verilog", color: "#2196f3" },
  { label: "SystemVerilog", to: "/courses/systemVerilog", color: "#9c27b0" },
  { label: "UVM", to: "/courses/uvm", color: "#ff5722" },
];

const UserDashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  const [avatarOpen, setAvatarOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const avatarColor = user?.avatar || "#4caf50";
  const xpToNextLevel = 1000;
  const level = user ? Math.floor(user.xp / xpToNextLevel) + 1 : 1;
  const xpProgress = user ? Math.min((user.xp % xpToNextLevel) / xpToNextLevel * 100, 100) : 0;

  const closeAll = () => {
    setError(null);
    setNewEmail("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const callProfile = async (body: object) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user!.token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      updateUser({ ...data, token: user!.token });
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarSave = async (color: string) => {
    const ok = await callProfile({ avatar: color });
    if (ok) setAvatarOpen(false);
  };

  const handleEmailSave = async () => {
    if (!newEmail) return setError("Please enter a new email");
    const ok = await callProfile({ email: newEmail });
    if (ok) { setEmailOpen(false); closeAll(); }
  };

  const handlePasswordSave = async () => {
    if (newPassword !== confirmPassword) return setError("Passwords do not match");
    if (newPassword.length < 6) return setError("Password must be at least 6 characters");
    const ok = await callProfile({ currentPassword, newPassword });
    if (ok) { setPasswordOpen(false); closeAll(); }
  };

  return (
    <Box sx={{ minHeight: "100vh", px: { xs: 2, sm: 4, md: 6 }, py: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={1}>
        My Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Manage your profile and track your learning journey.
      </Typography>

      {/* Main layout: profile card + courses side by side */}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>

        {/* Profile Card */}
        <div style={{ flex: "0 0 300px", minWidth: 260 }}>
          <Paper
            elevation={0}
            sx={{ p: 3, borderRadius: 3, border: `1px solid ${theme.palette.divider}` }}
          >
            <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" gap={1}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: avatarColor,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "2rem",
                  cursor: "pointer",
                  border: `3px solid ${theme.palette.divider}`,
                  transition: "opacity 0.2s",
                  "&:hover": { opacity: 0.8 },
                }}
                onClick={() => { closeAll(); setAvatarOpen(true); }}
              >
                {user?.username?.[0]?.toUpperCase() ?? "U"}
              </Avatar>
              <Typography variant="caption" color="text.secondary">
                Click avatar to change color
              </Typography>
              <Typography fontWeight={700} fontSize="1.2rem" mt={1}>
                {user?.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
              <Chip
                label={user?.role === "admin" ? "Admin" : "Learner"}
                size="small"
                sx={{
                  mt: 0.5,
                  bgcolor: user?.role === "admin" ? "#ff5722" : "#1a3a1a",
                  color: user?.role === "admin" ? "#fff" : "limegreen",
                  fontWeight: 600,
                }}
              />
            </Box>

            <Divider sx={{ my: 2.5 }} />

            {/* XP bar */}
            <Box mb={2.5}>
              <Box display="flex" justifyContent="space-between" mb={0.5}>
                <Typography variant="caption" color="text.secondary">Level {level}</Typography>
                <Typography variant="caption" color="text.secondary">{user?.xp ?? 0} XP</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={xpProgress}
                sx={{
                  height: 8, borderRadius: 4,
                  bgcolor: theme.palette.action.hover,
                  "& .MuiLinearProgress-bar": { bgcolor: "limegreen", borderRadius: 4 },
                }}
              />
            </Box>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {[
                { icon: <TrendingUp sx={{ color: "limegreen", fontSize: 18 }} />, value: user?.xp ?? 0, label: "XP" },
                { icon: <EmojiEvents sx={{ color: "#ffb300", fontSize: 18 }} />, value: user?.coins ?? 0, label: "Coins" },
                { icon: <WorkspacePremium sx={{ color: "#00bfff", fontSize: 18 }} />, value: level, label: "Level" },
              ].map((s) => (
                <div key={s.label} style={{ flex: 1 }}>
                  <Box textAlign="center" p={1} borderRadius={2} sx={{ bgcolor: theme.palette.action.hover }}>
                    {s.icon}
                    <Typography fontWeight={700}>{s.value}</Typography>
                    <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                  </Box>
                </div>
              ))}
            </div>

            <Divider sx={{ mb: 2 }} />

            {/* Edit actions */}
            <Box display="flex" flexDirection="column" gap={1}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Edit fontSize="small" />}
                fullWidth
                onClick={() => { closeAll(); setEmailOpen(true); }}
                sx={{ borderColor: theme.palette.divider, textTransform: "none" }}
              >
                Change Email
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Edit fontSize="small" />}
                fullWidth
                onClick={() => { closeAll(); setPasswordOpen(true); }}
                sx={{ borderColor: theme.palette.divider, textTransform: "none" }}
              >
                Change Password
              </Button>
            </Box>
          </Paper>
        </div>

        {/* Courses section */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Courses
          </Typography>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {courses.map((c) => (
              <div key={c.label}>
                <Card
                  elevation={0}
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 3,
                    transition: "all 0.2s",
                    "&:hover": { borderColor: c.color, transform: "translateY(-2px)" },
                  }}
                >
                  <CardActionArea onClick={() => navigate(c.to)}>
                    <CardContent>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c.color, marginBottom: 8 }} />
                      <Typography fontWeight={600} mb={1.5}>{c.label}</Typography>
                      <LinearProgress
                        variant="determinate"
                        value={0}
                        sx={{
                          height: 4, borderRadius: 2,
                          bgcolor: theme.palette.action.hover,
                          "& .MuiLinearProgress-bar": { bgcolor: c.color, borderRadius: 2 },
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" mt={0.5} display="block">
                        Not started
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Avatar Color Dialog */}
      <Dialog open={avatarOpen} onClose={() => setAvatarOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Choose Avatar Color</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
            {AVATAR_COLORS.map((color) => (
              <div
                key={color}
                onClick={() => !loading && handleAvatarSave(color)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  backgroundColor: color,
                  cursor: loading ? "default" : "pointer",
                  border: avatarColor === color ? "3px solid white" : "3px solid transparent",
                  outline: avatarColor === color ? `2px solid ${color}` : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  transition: "transform 0.15s",
                }}
              >
                {user?.username?.[0]?.toUpperCase()}
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAvatarOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Change Email Dialog */}
      <Dialog open={emailOpen} onClose={() => setEmailOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Change Email</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            label="New Email"
            type="email"
            fullWidth
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailOpen(false)}>Cancel</Button>
          <Button onClick={handleEmailSave} disabled={loading} variant="contained">
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={passwordOpen} onClose={() => setPasswordOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <TextField
              label="New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordOpen(false)}>Cancel</Button>
          <Button onClick={handlePasswordSave} disabled={loading} variant="contained">
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserDashboard;
