import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Typography, Chip, Skeleton } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import API_URL from "../../config/api";

interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  category: string;
}

const levelColor: Record<string, string> = {
  Beginner:     "#10b981",
  Intermediate: "#f59e0b",
  Advanced:     "#ef4444",
};

const categoryLabel: Record<string, string> = {
  verilog:       "Verilog",
  systemverilog: "SystemVerilog",
  digital:       "Digital Design",
  uvm:           "UVM",
};

export default function CourseList() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(`${API_URL}/courses?category=${category}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setCourses(data);
        else setError("Failed to load courses.");
      })
      .catch(() => setError("Failed to load courses."))
      .finally(() => setLoading(false));
  }, [category]);

  const bg      = isDark ? "#0f172a" : "#f8fafc";
  const card    = isDark ? "#1e293b" : "#ffffff";
  const border  = isDark ? "#334155" : "#e2e8f0";
  const subtext = isDark ? "#94a3b8" : "#64748b";

  return (
    <div style={{ minHeight: "90vh", backgroundColor: bg, padding: "2rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <Typography
            variant="overline"
            sx={{ color: "limegreen", letterSpacing: 3, fontWeight: 600, fontSize: 11 }}
          >
            {categoryLabel[category ?? ""] ?? category?.toUpperCase()}
          </Typography>
          <Typography variant="h4" fontWeight="bold" sx={{ mt: 0.5 }}>
            All Courses
          </Typography>
          <Typography variant="body2" sx={{ color: subtext, mt: 0.5 }}>
            Pick a course to start learning
          </Typography>
        </div>

        {/* Error */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
        )}

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  width="100%"
                  height={260}
                  sx={{ bgcolor: isDark ? "#1e293b" : "#e2e8f0", borderRadius: 3 }}
                />
              ))
            : courses.map((course) => (
                <div
                  key={course._id}
                  onClick={() => navigate(`/courses/${category}/${course._id}`)}
                  style={{
                    backgroundColor: card,
                    border: `1px solid ${border}`,
                    borderRadius: 16,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      height: 140,
                      background: course.thumbnail
                        ? `url(${course.thumbnail}) center/cover`
                        : `linear-gradient(135deg, #10b98130, #10b98160)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 48,
                    }}
                  >
                    {!course.thumbnail && "📘"}
                  </div>

                  {/* Body */}
                  <div style={{ padding: "1rem" }}>
                    <Chip
                      label={course.level}
                      size="small"
                      sx={{
                        mb: 1,
                        backgroundColor: `${levelColor[course.level]}20`,
                        color: levelColor[course.level],
                        fontWeight: 600,
                        fontSize: 11,
                      }}
                    />
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ mb: 0.5, fontSize: "1rem", lineHeight: 1.3 }}
                    >
                      {course.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: subtext,
                        mb: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {course.description || "No description available."}
                    </Typography>

                    <div style={{ display: "flex", gap: 12, color: subtext, fontSize: 12 }}>
                      {course.duration && (
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <AccessTimeIcon sx={{ fontSize: 14 }} />
                          {course.duration}
                        </span>
                      )}
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <SignalCellularAltIcon sx={{ fontSize: 14 }} />
                        {course.level}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Empty state */}
        {!loading && !error && courses.length === 0 && (
          <div style={{ textAlign: "center", marginTop: "4rem", color: subtext }}>
            <Typography variant="h6">No courses available yet.</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>Check back soon!</Typography>
          </div>
        )}
      </div>
    </div>
  );
}
