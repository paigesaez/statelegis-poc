import type { FC } from "react"
import { Card, CardContent, CardActions, Typography, Chip, Box, Button, Stack, Divider } from "@mui/material"
import { CalendarMonth, Person, Description } from "@mui/icons-material"

interface BillProps {
  id: string
  title: string
  number: string
  status: "introduced" | "in committee" | "passed" | "failed" | "signed"
  introducedDate: string
  sponsors: string[]
  summary: string
}

const getStatusColor = (status: BillProps["status"]) => {
  switch (status) {
    case "introduced":
      return "default"
    case "in committee":
      return "secondary"
    case "passed":
      return "success"
    case "failed":
      return "error"
    case "signed":
      return "primary"
    default:
      return "default"
  }
}

const getStatusLabel = (status: BillProps["status"]) => {
  switch (status) {
    case "introduced":
      return "Introduced"
    case "in committee":
      return "In Committee"
    case "passed":
      return "Passed"
    case "failed":
      return "Failed"
    case "signed":
      return "Signed into Law"
    default:
      return status
  }
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export const BillCard: FC<BillProps> = ({ id, title, number, status, introducedDate, sponsors, summary }) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Box>
            <Typography variant="h5" component="div" gutterBottom>
              {number}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {title}
            </Typography>
          </Box>
          <Chip label={getStatusLabel(status)} color={getStatusColor(status) as any} size="medium" />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {summary}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1.5}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarMonth fontSize="small" color="action" />
            <Typography variant="body2">Introduced: {formatDate(introducedDate)}</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Person fontSize="small" color="action" />
            <Typography variant="body2">
              Sponsors:{" "}
              {sponsors.length > 2
                ? `${sponsors[0]}, ${sponsors[1]}, +${sponsors.length - 2} more`
                : sponsors.join(", ")}
            </Typography>
          </Box>
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button size="small" startIcon={<Description />} href={`/bills/${id}`} sx={{ ml: -0.5 }}>
          View Full Bill
        </Button>
      </CardActions>
    </Card>
  )
}
