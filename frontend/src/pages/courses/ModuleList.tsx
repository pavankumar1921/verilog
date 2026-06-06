import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Typography, Button, Skeleton, Chip } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";

interface Course {
  _id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  thumbnail: string | null;
}

interface Module {
  _id: string;
  title: string;
  order: number;
}

interface Lesson {
  _id: string;
  title: string;
  duration: string;
  order: number;
}

export default function ModuleList() {
  const { category, courseId } = useParams<{ category: string; courseId: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { user } = useAuth();

  const [course, setCourse]       = useState<Course | null>(null);
  const [modules, setModules]     = useState<Module[]>([]);
  const [lessons, setLessons]     = useState<Record<string, Lesson[]>>({});
  const [expanded, setExpanded]   = useState<string | null>(null);
  const [enrolled, setEnrolled]   = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  const token = user?.token;

  // Load course + modules
  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/courses/${courseId}`).then((r) => r.json()),
      fetch(`${API_URL}/courses/${courseId}/modules`).then((r) => r.json()),
    ])
      .then(([courseData, modulesData]) => {
        setCourse(courseData);
        setModules(Array.isArray(modulesData) ? modulesData : []);
      })
      .catch(() => setError("Failed to load course."))
      .finally(() => setLoading(false));
  }, [courseId]);

  // Check enrollment
  useEffect(() => {
    if (!token) return;
    fetch(`${API_URL}/courses/${courseId}/enrollment`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setEnrolled(d.enrolled))
      .catch(() => {});
  }, [courseId, token]);

  // Expand module → load its lessons
  const toggleModule = async (moduleId: string) => {
    if (expanded === moduleId) {
      setExpanded(null);
      return;
    }
    setExpanded(moduleId);
    if (lessons[moduleId]) return; // already loaded
    try {
      const r = await fetch(`${API_URL}/courses/${courseId}/modules/${moduleId}/lessons`);
      const data = await r.json();
      setLessons((prev) => ({ ...prev, [moduleId]: Array.isArray(data) ? data : [] }));
    } catch {
      setLessons((prev) => ({ ...prev, [moduleId]: [] }));
    }
  };

  const handleEnroll = async () => {
    if (!user) { navigate("/login"); return; }
    setEnrolling(true);
    try {
      const r = await fetch(`${API_URL}/courses/${courseId}/enroll`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await r.json();
      if (r.ok) setEnrolled(true);
      else alert(data.message);
    } catch {
      alert("Enrollment failed. Try again.");
    } finally {
      setEnrolling(false);
    }
  };

  const bg     = isDark ? "#0f172a" : "#f8fafc";
  const card   = isDark ? "#1e293b" : "#ffffff";
  const border = isDark ? "#334155" : "#e2e8f0";
  const sub    = isDark ? "#94a3b8" : "#64748b";

  return (
    <div style={{ minHeight: "90vh", backgroundColor: bg, padding: "2rem" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Back */}
        <button
          onClick={() => navigate(`/courses/${category}`)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "limegreen", display: "flex", alignItems: "center",
            gap: 6, marginBottom: "1.5rem", fontSize: 14, padding: 0,
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} /> Back to courses
        </button>

        {loading ? (
          <>
            <Skeleton variant="rounded" height={180} sx={{ mb: 3, bgcolor: isDark ? "#1e293b" : "#e2e8f0", borderRadius: 3 }} />
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" height={64} sx={{ mb: 1.5, bgcolor: isDark ? "#1e293b" : "#e2e8f0", borderRadius: 2 }} />
            ))}
          </>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <>
            {/* Course Hero */}
            <div
              style={{
                backgroundColor: card,
                border: `1px solid ${border}`,
                borderRadius: 16,
                overflow: "hidden",
                marginBottom: "2rem",
              }}
            >
              {course?.thumbnail && (
                <div
                  style={{
                    height: 180,
                    background: `url(${course.thumbnail}) center/cover`,
                  }}
                />
              )}
              <div style={{ padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <Chip
                    label={course?.level}
                    size="small"
                    sx={{ mb: 1, backgroundColor: "#10b98120", color: "#10b981", fontWeight: 600, fontSize: 11 }}
                  />
                  <Typography variant="h5" fontWeight="bold">{course?.title}</Typography>
                  <Typography variant="body2" sx={{ color: sub, mt: 0.5 }}>{course?.description}</Typography>
                  {course?.duration && (
                    <Typography variant="caption" sx={{ color: sub, mt: 1, display: "block" }}>
                      ⏱ {course.duration}
                    </Typography>
                  )}
                </div>

                {enrolled ? (
                  <Chip
                    icon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                    label="Enrolled"
                    sx={{ backgroundColor: "#10b98120", color: "#10b981", fontWeight: 600 }}
                  />
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleEnroll}
                    disabled={enrolling}
                    sx={{ backgroundColor: "limegreen", color: "#000", fontWeight: 700, "&:hover": { backgroundColor: "#84cc16" } }}
                  >
                    {enrolling ? "Enrolling..." : "Enroll Free"}
                  </Button>
                )}
              </div>
            </div>

            {/* Modules */}
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1.5 }}>
              Course Modules
            </Typography>

            {modules.length === 0 && (
              <Typography variant="body2" sx={{ color: sub }}>No modules available yet.</Typography>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {modules.map((mod) => (
                <div
                  key={mod._id}
                  style={{ backgroundColor: card, border: `1px solid ${border}`, borderRadius: 12, overflow: "hidden" }}
                >
                  {/* Module header */}
                  <button
                    onClick={() => toggleModule(mod._id)}
                    style={{
                      width: "100%", background: "none", border: "none",
                      cursor: "pointer", padding: "1rem 1.25rem",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      color: isDark ? "#f1f5f9" : "#0f172a",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span
                        style={{
                          width: 28, height: 28, borderRadius: "50%",
                          background: "#10b98120", color: "#10b981",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 12, fontWeight: 700, flexShrink: 0,
                        }}
                      >
                        {mod.order}
                      </span>
                      <span style={{ fontWeight: 600, textAlign: "left" }}>{mod.title}</span>
                    </div>
                    {expanded === mod._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </button>

                  {/* Lessons list */}
                  {expanded === mod._id && (
                    <div style={{ borderTop: `1px solid ${border}` }}>
                      {!lessons[mod._id] ? (
                        <div style={{ padding: "1rem 1.25rem" }}>
                          <Skeleton variant="text" height={28} />
                          <Skeleton variant="text" height={28} />
                        </div>
                      ) : lessons[mod._id].length === 0 ? (
                        <div style={{ padding: "1rem 1.25rem", color: sub, fontSize: 14 }}>
                          No lessons yet.
                        </div>
                      ) : (
                        lessons[mod._id].map((lesson, idx) => (
                          <div
                            key={lesson._id}
                            onClick={() =>
                              enrolled
                                ? navigate(`/courses/${category}/${courseId}/${mod._id}/${lesson._id}`)
                                : handleEnroll()
                            }
                            style={{
                              padding: "0.75rem 1.25rem 0.75rem 3.5rem",
                              display: "flex", alignItems: "center", justifyContent: "space-between",
                              borderTop: idx === 0 ? "none" : `1px solid ${border}`,
                              cursor: "pointer",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? "#ffffff08" : "#f1f5f9")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              {enrolled ? (
                                <span style={{ color: "#10b981", fontSize: 13 }}>▶</span>
                              ) : (
                                <LockIcon sx={{ fontSize: 14, color: sub }} />
                              )}
                              <span style={{ fontSize: 14, color: isDark ? "#cbd5e1" : "#334155" }}>
                                {lesson.title}
                              </span>
                            </div>
                            {lesson.duration && (
                              <span style={{ fontSize: 12, color: sub }}>{lesson.duration}</span>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
