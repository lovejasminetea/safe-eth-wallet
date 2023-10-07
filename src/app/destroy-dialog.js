import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";

export default function DestroyDialog({ destroyWallet }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        size="small"
        onClick={() => {
          setOpen(true);
        }}
      >
        Destroy
      </Button>
      <Dialog open={open}>
        <DialogTitle>Waring</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you have saved the backup file?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              destroyWallet();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
