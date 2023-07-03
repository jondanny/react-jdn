import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Container,
  ImageList,
  ImageListItem,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, selectProfile } from "../auth/auth.slice";

export default function AppProfile() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectProfile);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Cobbleweb Test
          </Typography>
          <Button color="inherit" style={{ marginLeft: "auto" }} onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Box display="flex" justifyContent="center" mb={3}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Avatar alt="Profile Avatar" src={profile?.avatar} sx={{ width: 100, height: 100 }} />
              <Box display="flex" justifyContent="center">
                <Typography variant="h6">
                  {profile?.firstName} {profile?.lastName}
                </Typography>
              </Box>
            </Box>
          </Box>
          <List disablePadding>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="User ID" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {profile?.id}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="First Name" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {profile?.firstName}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Last Name" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {profile?.lastName}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Email" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {profile?.email}
              </Typography>
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
              <ListItemText primary="Role" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {profile?.role}
              </Typography>
            </ListItem>
          </List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              overflowY: "scroll",
            }}
          >
            <ImageList variant="masonry" cols={3} gap={8} sx={{ width: 300 }}>
              {profile?.photos ? (
                profile?.photos.map((url, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={`${url}?w=248&fit=crop&auto=format`}
                      srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt="Photo"
                      loading="lazy"
                    />
                  </ImageListItem>
                ))
              ) : (
                <></>
              )}
            </ImageList>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
