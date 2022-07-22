import {
  BookOnline,
  Dashboard,
  Directions,
  Logout,
  Message,
  People,
  Print,
  Settings,
} from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import NavlinkItem from "./NavlinkItem";
import { Outlet } from "react-router-dom";
const Admin = () => {
  return (
    <>
      <Box className="admin-panel bg-light-cyan">
        <Grid container>
          <Grid item xs={9} md={4} lg={3}>
            <Box
              sx={{ height: { md: "100%" } }}
              className="bg-primary admin-leftbar"
            >
              <ul>
                <NavlinkItem
                  title="dashboard"
                  link="/dashboard"
                  icon={<Dashboard />}
                />
                <NavlinkItem title="users" link="/users" icon={<People />} />
                <NavlinkItem
                  title="tickets"
                  link="/tickets"
                  icon={<BookOnline />}
                />
                <NavlinkItem
                  title="regions & routes"
                  link="/routes"
                  icon={<Directions />}
                />
                <NavlinkItem title="reports" link="/reports" icon={<Print />} />
                <NavlinkItem
                  title="messages"
                  link="/admin_messages"
                  icon={<Message />}
                />
                <NavlinkItem
                  title="settings"
                  link="#"
                  icon={<Settings />}
                />
                <NavlinkItem title="logout" link="/logout" icon={<Logout />} />
              </ul>
            </Box>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Box sx={{ p: 2 }}>
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Admin;
