var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from 'react';
import { Avatar, Button, Container, CssBaseline, IconButton, Paper, TextField, Typography, } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import UniversityLogo from '../../../public/assets/images/University_of_Moratuwa_logo.png';
import BackgroundImage from '../../../public/assets/images/background.jpg';
// import authServices from 'src/services/AuthServices';
const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
    shape: {
        borderRadius: 16,
    },
});
function Copyright() {
    return (React.createElement(Typography, { variant: "body2", color: "text.secondary", align: "center" },
        "Copyright © ",
        React.createElement(Link, { color: "inherit", href: "https://mosip.io/" }, "MOSIP"),
        " ",
        new Date().getFullYear(),
        "."));
}
export default function LoginContainer() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => __awaiter(this, void 0, void 0, function* () {
        try {
            // const response = await authServices.login(username, password);
            // Handle the successful login response
            console.log('Login successful:' /*, response*/);
        }
        catch (error) {
            // Handle the login error
            console.error('Error occurred during login:', error);
            // Display an error message to the user
        }
    });
    return (React.createElement(ThemeProvider, { theme: defaultTheme },
        React.createElement(CssBaseline, null),
        React.createElement("div", { style: {
                backgroundImage: `url(${BackgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            } },
            React.createElement(Container, { maxWidth: "md", sx: { borderRadius: 16 } },
                React.createElement(Typography, { component: "div", sx: { display: 'flex', justifyContent: 'center', mb: 2 } },
                    React.createElement(Avatar, { src: UniversityLogo, alt: "University of Moratuwa", sx: { width: 200, height: 200 }, variant: "rounded" })),
                React.createElement(Paper, { elevation: 3, sx: { p: 3 } },
                    React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', gap: '2rem' } },
                        React.createElement("div", { style: { flex: 1, backgroundColor: defaultTheme.palette.primary.main, padding: '2rem' } },
                            React.createElement(Typography, { component: "h1", variant: "h4", align: "center", sx: { color: '#fff', fontWeight: 'bold', mb: 2 } }, "Booking System"),
                            React.createElement(Typography, { variant: "body1", sx: { color: '#fff', mb: 2 } }, "Cookies must be enabled in your browser")),
                        React.createElement("div", { style: { flex: 1 } },
                            React.createElement(Typography, { component: "h2", variant: "h6", sx: { mb: 2 } }, "Sign in"),
                            React.createElement(TextField, { label: "Username", value: username, onChange: (e) => setUsername(e.target.value), margin: "normal", required: true, fullWidth: true, autoFocus: true, InputProps: {
                                    startAdornment: (React.createElement(IconButton, { disabled: true },
                                        React.createElement(PersonOutlineOutlinedIcon, null))),
                                } }),
                            React.createElement(TextField, { label: "Password", value: password, onChange: (e) => setPassword(e.target.value), type: "password", margin: "normal", required: true, fullWidth: true, InputProps: {
                                    startAdornment: (React.createElement(IconButton, { disabled: true },
                                        React.createElement(LockOutlinedIcon, null))),
                                } }),
                            React.createElement(Button, { variant: "contained", onClick: handleLogin, fullWidth: true, sx: { mt: 3, mb: 2 } }, "Sign In")))),
                React.createElement(Copyright, null)))));
}
//# sourceMappingURL=LoginContainer.js.map