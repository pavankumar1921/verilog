import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  useTheme,
} from "@mui/material";
import { People, TrendingUp, EmojiEvents, Search } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { API_URL } from "../../config/env";

type UserRecord = {
  _id: string;
  username: string;
  email: string;
  role: "user" | "admin";
  avatar: string | null;
  xp: number;
  coins: number;
  createdAt: string;
};

const AdminDashboard: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();

  const [users, setUsers] = useState<UserRecord[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${user!.token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to load users");
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user]);

  const filtered = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalXP = users.reduce((sum, u) => sum + u.xp, 0);
  const totalCoins = users.reduce((sum, u) => sum + u.coins, 0);

  const summaryCards = [
    {
      icon: <People sx={{ color: "#00bfff", fontSize: 28 }} />,
      label: "Total Users",
      value: users.length,
      bg: "rgba(0,191,255,0.08)",
    },
    {
      icon: <TrendingUp sx={{ color: "limegreen", fontSize: 28 }} />,
      label: "Total XP Earned",
      value: totalXP.toLocaleString(),
      bg: "rgba(0,255,0,0.06)",
    },
    {
      icon: <EmojiEvents sx={{ color: "#ffb300", fontSize: 28 }} />,
      label: "Total Coins",
      value: totalCoins.toLocaleString(),
      bg: "rgba(255,179,0,0.08)",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", px: { xs: 2, sm: 4, md: 6 }, py: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={1}>
        Admin Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Overview of all users and their progress.
      </Typography>

      {/* Summary Cards */}
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 32 }}>
        {summaryCards.map((card) => (
          <div key={card.label} style={{ flex: "1 1 200px", minWidth: 180 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: `1px solid ${theme.palette.divider}`,
                bgcolor: card.bg,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {card.icon}
              <Box>
                <Typography variant="h5" fontWeight={700}>{card.value}</Typography>
                <Typography variant="caption" color="text.secondary">{card.label}</Typography>
              </Box>
            </Paper>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <Paper
        elevation={0}
        sx={{ borderRadius: 3, border: `1px solid ${theme.palette.divider}`, overflow: "hidden" }}
      >
        <Box
          p={2.5}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          gap={2}
        >
          <Typography fontWeight={600} fontSize="1rem">All Users</Typography>
          <TextField
            size="small"
            placeholder="Search by username or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: 260 }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {error && <Alert severity="error" sx={{ mx: 2.5, mb: 2 }}>{error}</Alert>}

        {loading ? (
          <Box display="flex" justifyContent="center" py={6}>
            <CircularProgress size={36} />
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ "& th": { fontWeight: 700, fontSize: "0.8rem", color: "text.secondary" } }}>
                  <TableCell>User</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">XP</TableCell>
                  <TableCell align="right">Coins</TableCell>
                  <TableCell>Joined</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4, color: "text.secondary" }}>
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((u) => (
                    <TableRow key={u._id} hover sx={{ "&:last-child td": { border: 0 } }}>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1.5}>
                          <Avatar
                            sx={{
                              width: 34,
                              height: 34,
                              bgcolor: u.avatar || "#4caf50",
                              fontSize: "0.85rem",
                              fontWeight: 700,
                            }}
                          >
                            {u.username[0].toUpperCase()}
                          </Avatar>
                          <Typography fontWeight={600} fontSize="0.9rem">{u.username}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: "text.secondary", fontSize: "0.85rem" }}>{u.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={u.role === "admin" ? "Admin" : "User"}
                          size="small"
                          sx={{
                            bgcolor: u.role === "admin" ? "#ff5722" : "#1a3a1a",
                            color: u.role === "admin" ? "#fff" : "limegreen",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600} fontSize="0.9rem" sx={{ color: "limegreen" }}>
                          {u.xp}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600} fontSize="0.9rem" sx={{ color: "#ffb300" }}>
                          {u.coins}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                        {new Date(u.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
