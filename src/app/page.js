"use client";

import { Container, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import Generate from "@/app/generate";
import Decrypt from "@/app/decrypt";

export default function Home() {
  const [value, setValue] = useState("generate");

  function handleTabChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: 500, maxWidth: "95%" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleTabChange} variant="fullWidth">
                <Tab label="Generate" value="generate" />
                <Tab label="Decrypt" value="decrypt" />
              </TabList>
            </Box>

            <TabPanel value="generate">
              <Generate></Generate>
            </TabPanel>
            <TabPanel value="decrypt">
              <Decrypt></Decrypt>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </Container>
  );
}
