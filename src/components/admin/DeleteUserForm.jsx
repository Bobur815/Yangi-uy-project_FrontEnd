import React, { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";

export default function DeleteUserForm() {
  const [userId, setUserId] = useState("");

  const handleDelete = () => {
    if (!userId.trim()) return;
    console.log("Delete user:", userId);
    setUserId("");
  };

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <Button color="error" variant="contained" onClick={handleDelete}>
        Delete
      </Button>
    </Stack>
  );
}
