import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useMediaQuery,
  useTheme,
  type DialogProps
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface PopupDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: DialogProps["maxWidth"];
}

const PopupDialog: React.FC<PopupDialogProps> = ({
  open,
  onClose,
  title,
  children,
  width = "md"
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={width}
      fullWidth
      fullScreen={fullScreen}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default PopupDialog;
