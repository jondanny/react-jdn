import { Container, Link, Paper, Typography } from "@mui/material";

export default function AppRegisterSuccess() {
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center" mb={3}>
          Signup Success
        </Typography>
        <Link href="/login">Go to login page</Link>
      </Paper>
    </Container>
  );
}
