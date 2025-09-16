import React, { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";

export default function AddCategoryForm() {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    // TODO: call your API: POST /categories { name }
    console.log("Add category:", name);
    setName("");
  };

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        label="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Add
      </Button>
    </Stack>
  );
}
