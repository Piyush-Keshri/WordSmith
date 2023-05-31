import { Box, TextField, Button, styled } from "@mui/material";
import { useState } from "react";

const imageUrl = "https://i.ibb.co/g7GDHq5/logo-no-background.png";

const Component = styled(Box)`
    margin-top:30px;
    width:400px;
    margin:auto;
    box-shadow:5px 2px 5px 2px rgb(0 0 0/0.6);
`;

const Image = styled('img')({
    width: 190,
    display: "flex",
    margin: 'auto',
});

const Wrapper = styled(Box)`
    padding:35px 25px;
    display:flex;
    flex:1;
    flex-direction:column;
    & > div,& > button,& > p{
        margin-top:20px
    }

`;

const LoginButton = styled(Button)`
    background:#FB641B;
    height:48px;
`;

const SignUpButton = styled(Button)`
    background: #fff;
    height : 48px;
    box-shadow : 0 2px 4px 0 rgb(0 0 0/20%);
    color:#2874f0;
`;

const Login = () => {

    const [account, toggleAccount] = useState('login');
    const toggleSignUp = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }
    return (
        <Component>
            <Box>
                <Image src={imageUrl} />

                {account === 'login' ?
                    <Wrapper>
                        <TextField variant="standard" label="username" />
                        <TextField variant="standard" label="password" />
                        <LoginButton variant="contained">Login</LoginButton>
                        <SignUpButton variant="text" onClick={toggleSignUp}>Create An Account</SignUpButton>
                    </Wrapper>
                    :
                    <Wrapper>
                        <TextField variant="standard" label="Enter Your Name" />
                        <TextField variant="standard" label="Enter Username" />
                        <TextField variant="standard" label="Enter Password" />
                        <SignUpButton >SignUp</SignUpButton>
                        <LoginButton variant="contained" onClick={toggleSignUp}>Already Have An Account</LoginButton>
                    </Wrapper>}
            </Box>
        </Component>

    );

}

export default Login;