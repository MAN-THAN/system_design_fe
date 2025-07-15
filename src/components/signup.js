import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {axiosInstance} from '../axios/axiosInstance';
import { ApiEndpoints } from '../config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100vh',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  },
}));

export default function SignUp() {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    department: Yup.string().required('Department is required'),
    password: Yup.string()
      .min(6, 'Password should be of minimum 6 characters length')
      .required('Password is required'),
    allowExtraEmails: Yup.boolean(),
  });
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      department: '',
      password: '',
      allowExtraEmails: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await axiosInstance.post(ApiEndpoints.SIGNUP, {name : values.name, department : values.department, email : values.email, password : values.password});
        console.log(res);
        toast.success('Sign up successfully...');
        navigate('/login');

      } catch (error) {
        console.error(error);
        toast.error(error)   
      }
    },
  });

  const departments = [
    { value: '', label: 'Select department' },
    { value: 'computer science', label: 'Computer Science' },
    { value: 'food tech', label: 'Food Tech' },
  ];

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                fullWidth
                id="name"
                name="name"
                placeholder="Jon Snow"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                fullWidth
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="department">Department</FormLabel>
              <TextField
                select
                fullWidth
                id="department"
                name="department"
                value={formik.values.department}
                onChange={formik.handleChange}
                error={formik.touched.department && Boolean(formik.errors.department)}
                helperText={formik.touched.department && formik.errors.department}
              >
                {departments.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                fullWidth
                id="password"
                name="password"
                placeholder="••••••"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </FormControl>

            <Button color="primary" variant="contained" fullWidth type="submit">
              Sign up
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
