import React from "react";
import {
  Card,
  CardContent,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  AssignmentTurnedIn,
  HourglassTop,
  PermContactCalendarOutlined,
  ShoppingCart,
  WidgetsOutlined,
} from "@mui/icons-material";

interface FlashCardProps {
  title: string;
  count: number;
}

const FlashCard: React.FC<FlashCardProps> = ({ title, count }) => {
  // Assuming icons are mapped based on the title
  const icons = {
    "Total Orders": <ShoppingCart />,
    "Pending Orders": <HourglassTop />,
    "Completed Orders": <AssignmentTurnedIn />,
    "Total Products": <WidgetsOutlined />,
    "Total Clients": <PermContactCalendarOutlined />,
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <ListItem>
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 2 : "auto",
              justifyContent: "center",
              color: "black",
            }}
          >
            {icons[title]}
          </ListItemIcon>

          <ListItemText
            primary={title}
            primaryTypographyProps={{ fontWeight: 600, fontSize: 20 }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={count}
            primaryTypographyProps={{
              fontWeight: 600,
              fontSize: 40,
              textAlign: "right",
            }}
          />
        </ListItem>
      </CardContent>
    </Card>
  );
};

export default FlashCard;
