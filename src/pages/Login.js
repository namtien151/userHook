import React from 'react'


import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useForm}  from 'react-hook-form' ; 
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from 'yup'
import CITEDU from "../assets/imgs/CIT Education.png";
import Logo from "../assets/imgs/Logo.jpg";



function Copyright(props) {
    
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://www.facebook.com/citeducation3105">
                CIT Education
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

function Login() {
    var navigate = useNavigate();
    const validationScheme = yup.object().shape({
        firstName: yup.string().min(2).max(7).required(),
        lastName: yup.string().min(2).max(7).required(),
        email : yup.string().email().required(),
        password: yup.string().min(6).max(20).required(),
    });
    const { register, handleSubmit, formState: { errors }, } = useForm({
        mode:"onChange" ,
        resolver: yupResolver(validationScheme) 
    });
   
    const handleData =(dataLogin) => {  
        console.log(dataLogin);
        var dataRegister = JSON.parse(localStorage.getItem('dataRegister') ) ;
        console.log(dataRegister);
        if (dataLogin.email === dataRegister.email && dataLogin.password === dataRegister.password) { 
            toast.success("Đăng nhập thành công");
            setTimeout(() => {
                navigate("/") ;
               }, 5000); 
        } else { 
            toast.error('Đăng nhập thất bại');
        }

    }
    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Box
                component="img"
                sx={{
                    height: "100%",
                    width: "50%",
                }}
                alt="CITEDU"
                src={CITEDU}
            />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box
                        component="img"
                        sx={{
                            height: 100,
                            width: 150,
                        }}
                        alt="Logo"
                        src={Logo}
                    />
                    <Typography component="h1" variant="h5">
                        Sign in CIT Education
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(handleData)}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField 
                                      {...register("email")}
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                />
                                  <Typography  sx={{color:"red" , fontSize:"15px" , marginTop: "10px"}}>{errors?.email?.message}</Typography>
                                <Typography
                                    sx={{ fontSize: "12px", marginTop: "7px" }}
                                    color="tomato"
                                >
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField 
                                      {...register("password")}
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                                  <Typography  sx={{color:"red" , fontSize:"15px" , marginTop: "10px"}}>{errors?.password?.message}</Typography>
                                <Typography
                                    sx={{ fontSize: "12px", marginTop: "7px" }}
                                    color="tomato"
                                >
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox value="allowExtraEmails" color="primary" />
                                    }
                                    label="Agree with CIT Education's terms and conditions"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/register" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
        </Box>
    )
}

export default Login