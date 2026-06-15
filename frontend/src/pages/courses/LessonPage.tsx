import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Typography, Button, Skeleton, LinearProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAuth } from "../../context/AuthContext";
import API_URL from "../../config/api";

interface ContentBlock {
  type: "text" | "image" | "video";
  value: string;
  caption?: string;
}

interface Lesson {
  _id: string;
  title: string;
  duration: string;
  content: ContentBlock[];
  order: number;
}

interface SiblingLesson {
  _id: string;
  title: string;
  order: number;
}

export default function LessonPage() {
  const { category, courseId, moduleId, lessonId } = useParams<{
    category: string;
    courseId: string;
    moduleId: string;
    lessonId: string;
  }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { user } = useAuth();
  const token = user?.token;

  const [lesson, setLesson]           = useState<Lesson | null>(null);
  const [allLessons, setAllLessons]   = useState<SiblingLesson[]>([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");
  const [completed, setCompleted]     = useState(false);
  const [marking, setMarking]         = useState(false);

  // Load lesson content
  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    setLoading(true);
    setError("");
    fetch(`${API_URL}/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (r.status === 403) throw new Error("not_enrolled");
        if (!r.ok) throw new Error("not_found");
        return r.json();
      })
      .then((data) => setLesson(data))
      .catch((e) => {
        if (e.message === "not_enrolled") navigate(`/courses/${category}/${courseId}`);
        else setError("Failed to load lesson.");
      })
      .finally(() => setLoading(false));
  }, [lessonId, token]);

  // Load sibling lessons for prev/next navigation
  useEffect(() => {
    fetch(`${API_URL}/courses/${courseId}/modules/${moduleId}/lessons`)
      .then((r) => r.json())
      .then((data) => setAllLessons(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, [moduleId]);

  const markComplete = async () => {
    if (completed || marking) return;
    setMarking(true);
    try {
      await fetch(`${API_URL}/courses/${courseId}/lessons/${lessonId}/complete`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setCompleted(true);
    } catch {
      // silent
    } finally {
      setMarking(false);
    }
  };

  const currentIdx  = allLessons.findIndex((l) => l._id === lessonId);
  const prevLesson  = allLessons[currentIdx - 1] ?? null;
  const nextLesson  = allLessons[currentIdx + 1] ?? null;
  const progress    = allLessons.length ? ((currentIdx + 1) / allLessons.length) * 100 : 0;

  const bg     = isDark ? "#0f172a" : "#f8fafc";
  const card   = isDark ? "#1e293b" : "#ffffff";
  const border = isDark ? "#334155" : "#e2e8f0";
  const sub    = isDark ? "#94a3b8" : "#64748b";

  return (
    <div style={{ minHeight: "90vh", backgroundColor: bg }}>

      {/* Top progress bar */}
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ height: 3, backgroundColor: border, "& .MuiLinearProgress-bar": { backgroundColor: "limegreen" } }}
      />

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "2rem" }}>

        {/* Back */}
        <button
          onClick={() => navigate(`/courses/${category}/${courseId}`)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "limegreen", display: "flex", alignItems: "center",
            gap: 6, marginBottom: "1.5rem", fontSize: 14, padding: 0,
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 18 }} /> Back to modules
        </button>

        {loading ? (
          <>
            <Skeleton variant="text" height={48} width="60%" sx={{ mb: 1, bgcolor: isDark ? "#1e293b" : "#e2e8f0" }} />
            <Skeleton variant="rounded" height={300} sx={{ mb: 2, bgcolor: isDark ? "#1e293b" : "#e2e8f0" }} />
            <Skeleton variant="text" height={24} sx={{ bgcolor: isDark ? "#1e293b" : "#e2e8f0" }} />
            <Skeleton variant="text" height={24} sx={{ bgcolor: isDark ? "#1e293b" : "#e2e8f0" }} />
          </>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : lesson ? (
          <>
            {/* Lesson title */}
            <div style={{ marginBottom: "2rem" }}>
              <Typography variant="caption" sx={{ color: sub }}>
                Lesson {lesson.order}{lesson.duration ? ` · ${lesson.duration}` : ""}
              </Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ mt: 0.5 }}>
                {lesson.title}
              </Typography>
            </div>

            {/* Content blocks */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {lesson.content.map((block, idx) => (
                <div key={idx}>
                  {block.type === "text" && (
                    <div
                      style={{
                        backgroundColor: card,
                        border: `1px solid ${border}`,
                        borderRadius: 12,
                        padding: "1.5rem",
                        lineHeight: 1.8,
                        fontSize: 15,
                        color: isDark ? "#e2e8f0" : "#1e293b",
                      }}
                      dangerouslySetInnerHTML={{ __html: block.value }}
                    />
                  )}

                  {block.type === "image" && (
                    <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${border}` }}>
                      <img
                        src={block.value}
                        alt={block.caption || `Image ${idx + 1}`}
                        style={{ width: "100%", display: "block", maxHeight: 480, objectFit: "contain", backgroundColor: card }}
                      />
                      {block.caption && (
                        <div style={{ padding: "0.5rem 1rem", backgroundColor: card, color: sub, fontSize: 13 }}>
                          {block.caption}
                        </div>
                      )}
                    </div>
                  )}

                  {block.type === "video" && (
                    <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${border}`, backgroundColor: "#000" }}>
                      <video
                        src={block.value}
                        controls
                        style={{ width: "100%", display: "block", maxHeight: 480 }}
                        onEnded={markComplete}
                      />
                      {block.caption && (
                        <div style={{ padding: "0.5rem 1rem", backgroundColor: card, color: sub, fontSize: 13 }}>
                          {block.caption}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mark complete + nav */}
            <div
              style={{
                marginTop: "3rem",
                paddingTop: "1.5rem",
                borderTop: `1px solid ${border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <Button
                variant={completed ? "outlined" : "contained"}
                startIcon={completed ? <CheckCircleIcon /> : undefined}
                onClick={markComplete}
                disabled={completed || marking}
                sx={{
                  backgroundColor: completed ? "transparent" : "limegreen",
                  borderColor: "limegreen",
                  color: completed ? "limegreen" : "#000",
                  fontWeight: 700,
                  "&:hover": { backgroundColor: completed ? "transparent" : "#84cc16" },
                }}
              >
                {completed ? "Completed" : marking ? "Marking..." : "Mark as Complete"}
              </Button>

              <div style={{ display: "flex", gap: 10 }}>
                {prevLesson && (
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(`/courses/${category}/${courseId}/${moduleId}/${prevLesson._id}`)}
                    sx={{ borderColor: border, color: isDark ? "#e2e8f0" : "#334155" }}
                  >
                    Previous
                  </Button>
                )}
                {nextLesson && (
                  <Button
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate(`/courses/${category}/${courseId}/${moduleId}/${nextLesson._id}`)}
                    sx={{ backgroundColor: "limegreen", color: "#000", fontWeight: 700, "&:hover": { backgroundColor: "#84cc16" } }}
                  >
                    Next Lesson
                  </Button>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
