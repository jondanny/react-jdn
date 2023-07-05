import React, { useState } from "react";
import { Avatar, Box, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAppSelector } from "../../app/hooks";
import { selectErrors, selectIsAuthenticated, selectLoading } from "./auth.slice";
import { Navigate } from "react-router-dom";
import { register } from "./auth.api";

export default function AppRegister() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectLoading);
  const errors = useAppSelector(selectErrors);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileUploadError, setFileUploadError] = useState<boolean>(false);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters long")
      .max(25, "First name cannot exceed 25 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters long")
      .max(25, "Last name cannot exceed 25 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/.*[0-9].*/, "Password must contain at least one number"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (selectedFiles.length < 4) {
        setFileUploadError(true);
      } else {
        register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          files: selectedFiles,
        });
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    if (files.length < 4) setFileUploadError(true);
    else setFileUploadError(false);
  };

  return isAuthenticated ? (
    <Navigate to={"/profile"} replace={true} />
  ) : (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        display="flex"
        alignItems="center"
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  required
                  fullWidth
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.firstName && !!formik.errors.firstName}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  required
                  fullWidth
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lastName && !!formik.errors.lastName}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  name="email"
                  label="Email Address"
                  required
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  required
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && !!formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  required
                  fullWidth
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  id="files"
                  style={{ display: "none" }}
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={handleFileChange}
                />
                <label htmlFor="files" style={{ fontSize: "30px", cursor: "pointer" }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <CloudUploadIcon />
                    {selectedFiles.length > 0 ? (
                      <Typography>{selectedFiles.length + " photos uploaded"}</Typography>
                    ) : (
                      <Typography> Upload files</Typography>
                    )}
                  </Box>
                </label>
                {fileUploadError && (
                  <Typography color="error" fontSize="0.75rem">
                    Must upload at least 4 files
                  </Typography>
                )}
              </Grid>
              {errors.length !== 0 && (
                <Grid item xs={12}>
                  {errors.map((error, index) => (
                    <Typography color="error" variant="body2" key={index}>
                      {error}
                    </Typography>
                  ))}
                </Grid>
              )}
            </Grid>

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={isLoading}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
