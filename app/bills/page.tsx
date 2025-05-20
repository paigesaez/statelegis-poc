"use client"

import type React from "react"

import { useState } from "react"
import {
  Container,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Paper,
  type SelectChangeEvent,
  ThemeProvider,
  CssBaseline,
} from "@mui/material"
import { BillCard } from "@/components/bill-card"
import theme from "@/lib/theme"

// This would come from your API in a real application
const mockBills = [
  {
    id: "1",
    title: "An Act to Amend State Environmental Protection Laws",
    number: "SB 123",
    status: "in committee",
    introducedDate: "2023-01-15",
    sponsors: ["Sen. Johnson", "Sen. Williams", "Sen. Davis"],
    summary:
      "This bill proposes amendments to the state's environmental protection laws to strengthen regulations on industrial waste disposal and increase penalties for violations.",
  },
  {
    id: "2",
    title: "Education Funding Reform Act",
    number: "HB 456",
    status: "passed",
    introducedDate: "2023-02-10",
    sponsors: ["Rep. Smith", "Rep. Jones"],
    summary:
      "A bill to reform the state's education funding formula to ensure more equitable distribution of resources across school districts.",
  },
  {
    id: "3",
    title: "Healthcare Accessibility Improvement Act",
    number: "SB 789",
    status: "introduced",
    introducedDate: "2023-03-05",
    sponsors: ["Sen. Brown", "Sen. Miller", "Sen. Wilson", "Sen. Moore"],
    summary:
      "This legislation aims to improve healthcare accessibility in rural areas through tax incentives for healthcare providers and funding for telehealth infrastructure.",
  },
]

export default function BillsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value)
  }

  const filteredBills = mockBills.filter((bill) => {
    const matchesSearch =
      bill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.number.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || bill.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
          Legislative Bills
        </Typography>

        <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: "background.paper" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                label="Search bills by title or number"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                size="medium"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth variant="outlined" size="medium">
                <InputLabel id="status-filter-label">Filter by status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  id="status-filter"
                  value={statusFilter}
                  onChange={handleStatusChange}
                  label="Filter by status"
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="introduced">Introduced</MenuItem>
                  <MenuItem value="in committee">In Committee</MenuItem>
                  <MenuItem value="passed">Passed</MenuItem>
                  <MenuItem value="failed">Failed</MenuItem>
                  <MenuItem value="signed">Signed into Law</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={3}>
          {filteredBills.length > 0 ? (
            filteredBills.map((bill) => (
              <Grid item xs={12} sm={6} md={4} key={bill.id}>
                <BillCard {...bill} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box
                sx={{
                  py: 6,
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                <Typography variant="h6">No bills found matching your criteria.</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  )
}
