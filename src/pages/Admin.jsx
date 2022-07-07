import {
  BookOnline,
  CardTravel,
  Dashboard,
  Directions,
  DirectionsBus,
  Drafts,
  Inbox,
  Logout,
  Message,
  People,
  Print,
  Settings,
  Train,
  TravelExplore,
} from "@mui/icons-material";
import { Box, Divider, Grid } from "@mui/material";
import DashboardPage from "../components/admin/Dashboard";
import NavlinkItem from "../components/admin/NavlinkItem";
import Reports from "./admin/Reports";
import Routes from "./admin/Routes";
import Tickets from "./admin/Tickets";
import Users from "./admin/Users";
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
                {/* <NavlinkItem
                  title="buses"
                  link="/buses"
                  icon={<DirectionsBus />}
                /> */}
                <NavlinkItem title="reports" link="/reporst" icon={<Print />} />
                <NavlinkItem
                  title="messages"
                  link="/messages"
                  icon={<Message />}
                />
                <NavlinkItem
                  title="settings"
                  link="/settings"
                  icon={<Settings />}
                />
                <NavlinkItem title="logout" link="/logout" icon={<Logout />} />
              </ul>
            </Box>
          </Grid>
          <Grid item xs={12} md={8} lg={9}>
            <Box sx={{ p: 2 }}>
              <Routes />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Admin;
