import { Box, TextField, Button } from "@mui/material";
const imageUrl = "https://i.ibb.co/HPQfYp6/logo-color.png";
const Login = () => {
    return (
        <Box>
            <img src={imageUrl} height="350" width="350" />
            <TextField variant="standard" />
            <TextField variant="standard" />
            <Button variant="contained">Login</Button>
            <Button variant="text">Create An Account</Button>
        </Box>

    );

}

export default Login;