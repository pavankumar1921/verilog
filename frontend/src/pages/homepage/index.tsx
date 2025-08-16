import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Stack, useTheme } from "@mui/material";
import AnimatedTable from "../homepage/AnimatedTable"
import SchoolIcon from "@mui/icons-material/School";
import { Box, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import learningImage from "../../assets/learning.webp"
import { motion } from "framer-motion";
import { keyframes } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
// import "./testimonial.css";
import Footer from "../../components/Footer";


const courseList = [
  { title: "Digital", subtitle: "Design Foundations" },
  { title: "Verilog", subtitle: "HDL Programming" },
  { title: "System Verilog", subtitle: "Verification Ready" },
  { title: "UVM", subtitle: "Universal Verification" },
];

const cardData = [
  {
    title: "Position Analysis",
    desc: "Understand where your website is currently positioned in search engine queries.",
    icon: "📊",
  },
  {
    title: "Keyword Planning",
    desc: "Find the best relevant keywords that fit your SEO strategy in the long run.",
    icon: "🔑",
  },
  {
    title: "Writing Articles",
    desc: "Plan content and write articles optimized for SEO.",
    icon: "📝",
  },
  {
    title: "Backlink Strategy",
    desc: "Build strong backlinks to improve domain authority.",
    icon: "🔗",
  },
  {
    title: "Performance Metrics",
    desc: "Track performance through bounce rate, CTR, and conversions.",
    icon: "📈",
  },
];

const MotionGrid = motion(Grid);
const MotionBox = motion(Box);

export default function Home() {
  const theme = useTheme();
  const navigate = useNavigate();

  const words = ["Climb", "Explore", "Master", "Advance"];
  const [wordIndex, setWordIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!deleting && charIndex <= currentWord.length) {
      timeout = setTimeout(() => {
        setTyped(currentWord.substring(0, charIndex));
        setCharIndex(charIndex + 1);
      }, 150);
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setTyped(currentWord.substring(0, charIndex));
        setCharIndex(charIndex - 1);
      }, 75);
    } else if (!deleting && charIndex > currentWord.length) {
      timeout = setTimeout(() => setDeleting(true), 1000);
    } else if (deleting && charIndex < 0) {
      setDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words]);

  const revealProps = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, amount: 0.4 },
    transition: { duration: 0.9 },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const tableVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        delay: 1.2,
        ease: "easeOut",
      },
    },
  };

  const twinkle = keyframes`
  0% { opacity: 0.2; }
  100% { opacity: 0.4; }
`;

  const testimonials = [
    {
      name: "Client Name",
      profession: "Profession",
      quote:
        "Dolores sed duo clita tempor justo dolor et stet lorem kasd labore dolore lorem ipsum. At lorem lorem magna ut et, nonumy et labore et tempor diam tempor erat.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Jane Doe",
      profession: "SEO Specialist",
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet.",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Emily Rose",
      profession: "Digital Marketer",
      quote:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://randomuser.me/api/portraits/women/46.jpg",
    },
  ];

  return (
    <>
      {/*------------------- First Grid-------------------- */}
      <Grid
        container
        spacing={15}
        alignItems="center"
        justifyContent="center"
        sx={{ px: { xs: 2, md: 6 }, mt: { xs: 9, md: 13 } }}
      >
        {/* Left Column - Text */}
        <Grid item xs={12} md={6}>
          <motion.div
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Welcome to <span style={{ color: "limegreen" }}>S</span>ilicon
              <span style={{ color: "limegreen" }}>S</span>andbox
            </Typography>

            <Typography variant="h4" fontWeight="medium" gutterBottom>
              <span
                style={{
                  borderRight: "20px solid",
                  paddingRight: 4,
                  color: "limegreen",
                }}
              >
                {typed}
              </span>{" "}
              through levels of logic design
            </Typography>

            <Typography variant="body1" paragraph>
              We provide top-quality courses and interview support to help you
              achieve your career goals. <br />
              Explore our resources and start learning today with expert
              mentorship and real-world projects.
            </Typography>

            <Stack direction="row" spacing={2} mt={2}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "#32cd32",
                  color: "#32cd32",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgba(50, 205, 50, 0.1)",
                    borderColor: "#32cd32",
                  },
                }}
              >
                Browse Courses
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "#32cd32",
                  color: "#32cd32",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "rgba(50, 205, 50, 0.1)",
                    borderColor: "#32cd32",
                  },
                }}
              >
                Start Practicing
              </Button>
            </Stack>
          </motion.div>
        </Grid>

        {/* Right Column - Animated Table */}
        <Grid item xs={12} md={6}>
          <motion.div
            variants={tableVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <AnimatedTable />
          </motion.div>
        </Grid>
      </Grid>

      {/* ---------------------------second Section----------------------------- */}
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
          overflow: "hidden",
          background: `linear-gradient(
                      to bottom, 
                      #50e3c2 10%, 
                      #005a52 20%, 
                      #000d1a 30%
                    ),
                    url('https://www.transparenttextures.com/patterns/stardust.png')`,
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
          mt: 23,
        }}
      >
        {/* Twinkling stars layer */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: `url('https://www.transparenttextures.com/patterns/stardust.png')`,
            opacity: 0.3,
            animation: `${twinkle} 4s ease-in-out infinite alternate`,
            zIndex: 2,
          }}
        />

        {/* Highlighted Quote Section */}
        <MotionGrid
          container
          justifyContent="center"
          sx={{ mt: 20, zIndex: 3, px: 2 }}
          {...revealProps}
        >
          <Typography
            variant="h4"
            align="left"
            gutterBottom
            sx={{
              fontStyle: "italic",
              fontFamily: "'IBM Plex Serif', serif",
              color: "white",
              maxWidth: "900px",
            }}
          >
            World’s Pioneered Silicon-Based Platform <br />
            Offering <strong>Training</strong>, <strong>Coding</strong>, and{" "}
            <strong>Skill-Based Learning</strong> Facilities.
          </Typography>
        </MotionGrid>
      </Box>

      {/* --------------------------third Section---------- */}
      <MotionGrid
        container
        justifyContent="center"
        sx={{
          py: 15,
          backgroundColor: "#323035",
          backgroundImage: ` url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23000000' fill-opacity='0.64' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "40px 40px",
        }}
        {...revealProps}
      >
        <Grid item xs={12}>
          <Typography variant="h3" fontWeight="bold" align="center" mb={4}>
            Featured Courses
          </Typography>
          <Typography variant="h6" align="center" mb={3}>
            Practical Courses to Launch Your Career <br /> Master Verilog,
            System Design, and Interview Prep — all in one place.
          </Typography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ px: { xs: 2, md: 10 } }}
          >
            {courseList.map((course, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box
                  sx={{
                    height: 220,
                    borderRadius: 3,
                    p: 5,
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    boxShadow: 3,
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    "&:hover": {
                      backgroundColor: "#6fd73bff",
                      boxShadow: 4,
                    },
                  }}
                >
                  <SchoolIcon sx={{ fontSize: 40, color: "#333", mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold">
                    {course.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {course.subtitle}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </MotionGrid>

      {/* Cards Section */}
      <MotionBox
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        sx={{ textAlign: "center", mb: 6, px: 2 }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Key Takeaways
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: 700,
            mx: "auto",
            color: "text.secondary",
          }}
        >
          Here are the main topics that will be covered in the SEO training
          course. They cover all the basics of SEO and even some advanced
          techniques that will help you along the way.
        </Typography>
      </MotionBox>

      <MotionBox
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
        sx={{
          mt: 10,
          px: 4,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          py: 6,
        }}
      >
        <MotionGrid
          container
          spacing={4}
          justifyContent="center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: false }}
        >
          {cardData.map((card, index) => (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <MotionBox
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: false }}
                sx={{
                  position: "relative",
                  p: 4,
                  backgroundColor: theme.palette.background.default,
                  color: theme.palette.text.primary,
                  borderRadius: 4,
                  minHeight: 220,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  textAlign: "center",
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -30,
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "limegreen",
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 30,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {card.icon}
                </Box>

                <Typography
                  variant="h6"
                  sx={{ mt: 4, mb: 1, fontWeight: "bold" }}
                >
                  {card.title}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {card.desc}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    fontWeight: "bold",
                    px: 2,
                    py: 0.5,
                    fontSize: 14,
                    "&:hover": { backgroundColor: "#f1f1f1" },
                  }}
                >
                  Read More
                </Button>
              </MotionBox>
            </Grid>
          ))}
        </MotionGrid>
      </MotionBox>

      {/* Image Section */}
      <MotionGrid
        container
        sx={{
          mt: 20,
          mx: "auto",
          position: "relative",
          width: "60%",
          height: "500px", // Adjust height as needed
          overflow: "hidden",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        {...revealProps}
      >
        {/* Blurred Background Image */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${learningImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px)",
            transform: "scale(1.05)", // Prevent blur edge clipping
            zIndex: 0,
          }}
        />

        {/* Dark Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 1,
          }}
        />

        {/* Centered Foreground Content */}
        <Box
          sx={{
            zIndex: 2,
            textAlign: "center",
            color: "whitesmoke",
            px: 4,
            maxWidth: 600,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            We Have Good Babysitters
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Words which don’t look even slightly believable. If you are going to
            use a passage of Lorem Ipsum, you need to be sure there isn’t
            anything embarrassing hidden in the middle of text. All the Lorem
            Ipsum
          </Typography>
          <Typography
            sx={{
              color: "limegreen",
              fontWeight: "bold",
              cursor: "pointer",
              borderBottom: "2px solid limegreen",
              display: "inline-block",
              width: "fit-content",
              mx: "auto",
            }}
          >
            Read More
          </Typography>
        </Box>
      </MotionGrid>

      <Box sx={{ py: 10, textAlign: "center", maxWidth: 900, mx: "auto" }}>
        <Typography
          variant="overline"
          sx={{ color: "goldenrod", fontWeight: 600 }}
        >
          TESTIMONIAL
        </Typography>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={6}
          sx={{ color: "#0b2c5e" }}
        >
          What Our Clients Say!
        </Typography>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
          slidesPerView={1}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  pt: 1, // ✅ Push content down with padding top
                }}
              >
                <Avatar
                  src={item.image}
                  alt={item.name}
                  sx={{
                    width: 100,
                    height: 100,
                    mx: "auto",
                    mb: 2,
                    border: "4px solid white",
                    boxShadow: 3,
                  }}
                />
                <Box sx={{ fontSize: 40, color: "gold", mb: 3 }}>“</Box>
                <Typography
                  variant="body1"
                  sx={{
                    px: { xs: 2, md: 6 },
                    color: "gray",
                    fontStyle: "italic",
                    mb: 3,
                  }}
                >
                  {item.quote}
                </Typography>
                <Box
                  sx={{
                    borderBottom: "1px solid #ccc",
                    width: 100,
                    mx: "auto",
                    mb: 0,
                  }}
                />
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ color: "#0b2c5e" }}
                >
                  {item.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "gray" }}>
                  {item.profession}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* footer */}
      <Footer/>
    </>
  );
}
