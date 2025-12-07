import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Rating,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

type CourseCardProps = {
  title: string;
  image: string;
  rating?: number;
};

const CourseCard: React.FC<CourseCardProps> = ({ title, image, rating = 4.5 }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Card
      sx={{
        width: 260,
        borderRadius: 2,
        boxShadow: 4,
        backgroundColor: "background.paper",
        color: "text.primary",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ position: "relative", pb: 2 }}>
        {/* Top row: Title + Menu */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" noWrap>{title}</Typography>

          <IconButton
            size="small"
            onClick={handleMenuOpen}
            aria-label="course menu"
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <BookmarkBorderIcon fontSize="small" sx={{ mr: 1 }} /> Bookmark
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <InfoOutlinedIcon fontSize="small" sx={{ mr: 1 }} /> More Details
            </MenuItem>
          </Menu>
        </Box>

        {/* Rating */}
        <Box mt={1}>
          <Rating name="read-only" value={rating} readOnly size="small" />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
