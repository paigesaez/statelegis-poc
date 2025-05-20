"use client"
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar,
  Button,
} from "@mui/material"
import { TrendingUp, Assignment, Gavel, CalendarToday, ArrowForward } from "@mui/icons-material"

export default function Dashboard() {
  // In a real app, this would come from an API
  const stats = [
    { label: "Active Bills", value: 237, icon: <Assignment color="primary" /> },
    { label: "Bills Passed", value: 42, icon: <Gavel color="success" /> },
    { label: "Bills Introduced", value: 89, icon: <TrendingUp color="info" /> },
    { label: "Committee Meetings", value: 12, icon: <CalendarToday color="secondary" /> },
  ]

  const recentActivity = [
    { id: 1, action: "Bill SB 123 moved to committee", time: "2 hours ago", type: "movement" },
    { id: 2, action: "New amendment added to HB 456", time: "5 hours ago", type: "amendment" },
    { id: 3, action: "Vote scheduled for SB 789", time: "1 day ago", type: "vote" },
    { id: 4, action: "New bill HB 321 introduced", time: "2 days ago", type: "new" },
  ]

  const upcomingEvents = [
    { id: 1, title: "Judiciary Committee Hearing", date: "2023-05-22", time: "10:00 AM" },
    { id: 2, title: "Floor Vote on Education Bill", date: "2023-05-24", time: "2:00 PM" },
    { id: 3, title: "Public Comment Period Ends", date: "2023-05-30", time: "11:59 PM" },
  ]

  const keyLegislators = [
    { id: 1, name: "Sen. Johnson", role: "Committee Chair", party: "D", bills: 12 },
    { id: 2, name: "Rep. Smith", role: "Majority Leader", party: "R", bills: 8 },
    { id: 3, name: "Sen. Williams", role: "Minority Whip", party: "D", bills: 5 },
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Legislative Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 140,
                borderRadius: 2,
              }}
              elevation={1}
            >
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                {stat.icon}
                <Typography variant="h6" color="text.secondary" sx={{ ml: 1 }}>
                  {stat.label}
                </Typography>
              </Box>
              <Typography variant="h3" component="div" sx={{ fontWeight: "bold", mt: "auto" }}>
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", borderRadius: 2 }}>
            <CardHeader title="Recent Activity" />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List>
                {recentActivity.map((activity) => (
                  <ListItem key={activity.id} divider>
                    <ListItemText primary={activity.action} secondary={activity.time} />
                    <Chip
                      label={activity.type}
                      size="small"
                      color={
                        activity.type === "movement"
                          ? "info"
                          : activity.type === "amendment"
                            ? "secondary"
                            : activity.type === "vote"
                              ? "primary"
                              : "success"
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Button endIcon={<ArrowForward />}>View All Activity</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Events */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%", borderRadius: 2 }}>
            <CardHeader title="Upcoming Events" />
            <Divider />
            <CardContent sx={{ p: 0 }}>
              <List>
                {upcomingEvents.map((event) => (
                  <ListItem key={event.id} divider>
                    <ListItemIcon>
                      <CalendarToday color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={event.title}
                      secondary={`${new Date(event.date).toLocaleDateString()} at ${event.time}`}
                    />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Button endIcon={<ArrowForward />}>View Calendar</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Key Legislators */}
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Card sx={{ borderRadius: 2 }}>
            <CardHeader title="Key Legislators" />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                {keyLegislators.map((legislator) => (
                  <Grid item xs={12} sm={4} key={legislator.id}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar sx={{ bgcolor: legislator.party === "D" ? "primary.main" : "error.main", mr: 2 }}>
                        {legislator.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1">{legislator.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {legislator.role}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Chip
                        label={legislator.party === "D" ? "Democrat" : "Republican"}
                        size="small"
                        color={legislator.party === "D" ? "primary" : "error"}
                        variant="outlined"
                      />
                      <Typography variant="body2">
                        <strong>{legislator.bills}</strong> bills sponsored
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
