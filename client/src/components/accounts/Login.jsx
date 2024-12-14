import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { useState, useContext } from "react";

// API
import { API } from "../../service/api.js";

import { DataContext } from "../../context/DataProvider.jsx";
import { useNavigate } from "react-router-dom";

// Styled Components form MUI

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

const Error = styled(Typography)`
  /*  font-size: 10px; */
    color:#ff6161;
    line-height:0;
    margin-top:10px;
    font-weight:600; 

`

// Object to Store SignUp Values

let signupInitialValues = {
    name: "",
    username: "",
    password: ""
}

// Object to Store Login Values

let loginInitialValues = {
    username: "",
    password: ""
}

// Login Component 

const Login = ({ isUserAuthenticated }, { handleLogin }) => {
    const imageUrl = "https://i.ibb.co/g7GDHq5/logo-no-background.png";

    // Hook to switch between login and signup when create an account button is clicked.
    const [account, toggleAccount] = useState('login');

    // Hook to capture signup values
    const [signup, setSignup] = useState(signupInitialValues);

    // Hook to display error 
    const [error, setError] = useState('');

    // Hook to capture login Values
    const [login, setLogin] = useState(loginInitialValues);

    // Hook to store data in context
    const { setAccount } = useContext(DataContext);

    const toggleSignUp = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    // Function to capture data from signUp input fields
    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    // Function to store the entered data in the signup input fields to database

    const signupUser = async () => {
        // Field Validation
        if (signup.name.trim().length <= 0 || signup.username.trim().length <= 0 || signup.password.trim().length <= 0) {
            alert('Please Enter valid values');
            return;
        }

        // Password Validation: At least 6 characters long and contains both numbers and alphabets
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(signup.password)) {
            alert('Password must be at least 6 characters long and contain both letters and numbers.');
            return;
        }

        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        }
        else {
            setError('Something Went Wrong!!')
        }
    }


    // Function For Login The User
    const navigate = useNavigate();

    const loginUser = async () => {

        // Field Validation
        if (!login.username || !login.password) {
            setError('Please Fill in All Fields');
            return;
        }

        const response = await API.userLogin(login);
        console.log(response);
        // if (response.status === 400) {
        //     alert('Username or password is incorrect');
        //     return;
        // }

        if (response.isSuccess) {
            if (response.data.status) {
                setError('');

                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

                setAccount({ username: response.data.username, name: response.data.name });
                isUserAuthenticated(true);
                navigate('/');
            } else {
                alert('Username or password is incorrect');
                return;
            }
        }
        else {
            alert('Error!');
            return;
        }
    }

    return (
        <Component>
            <Box>
                <Image src={imageUrl} />

                {account === 'login' ?
                    <Wrapper>
                        <TextField required variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name="username" label="username" />

                        <TextField required variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name="password" label="password" type="password" />
                        {error && <Error>{error}</Error>}
                        <LoginButton variant="contained" onClick={() => loginUser()}>Login </LoginButton>



                        <SignUpButton variant="text" onClick={toggleSignUp}>Create An Account</SignUpButton>
                    </Wrapper>
                    :
                    <Wrapper>
                        <TextField required variant="filled" onChange={(e) => onInputChange(e)} name="name" label="name" />

                        <TextField required variant="filled" onChange={(e) => onInputChange(e)} label="username" name="username" />

                        <TextField required variant="filled" onChange={(e) => onInputChange(e)} label="Enter Password" name="password" type="password" />


                        {error && <Error>{error}</Error>}

                        <SignUpButton onClick={() => signupUser()}>SignUp</SignUpButton>

                        <LoginButton variant="contained" onClick={toggleSignUp}> Already Have An Account</LoginButton>
                    </Wrapper>}
            </Box>
        </Component>

    );

}

export default Login;


// import { Box, TextField, Button, styled, Typography } from "@mui/material";
// import { useState, useContext } from "react";
// import { API } from "../../service/api.js";
// import { DataContext } from "../../context/DataProvider.jsx";
// import { useNavigate } from "react-router-dom";

// const Component = styled(Box)`
//     margin-top:30px;
//     width:400px;
//     margin:auto;
//     box-shadow:5px 2px 5px 2px rgb(0 0 0/0.6);
// `;

// const Image = styled('img')({
//     width: 190,
//     display: "flex",
//     margin: 'auto',
// });

// const Wrapper = styled(Box)`
//     padding:35px 25px;
//     display:flex;
//     flex:1;
//     flex-direction:column;
//     & > div,& > button,& > p{
//         margin-top:20px
//     }

// `;

// const LoginButton = styled(Button)`
//     background:#FB641B;
//     height:48px;
// `;

// const SignUpButton = styled(Button)`
//     background: #fff;
//     height : 48px;
//     box-shadow : 0 2px 4px 0 rgb(0 0 0/20%);
//     color:#2874f0;
// `;

// const Error = styled(Typography)`
//     color:#ff6161;
//     margin-top:10px;
//     font-weight:600;
// `

// const initialValues = {
//     name: "",
//     username: "",
//     password: ""
// };

// const Login = ({ isUserAuthenticated }) => {
//     const imageUrl = "https://i.ibb.co/g7GDHq5/logo-no-background.png";

//     const [account, toggleAccount] = useState('login');
//     const [formData, setFormData] = useState(initialValues);
//     const [error, setError] = useState('');
//     const { setAccount } = useContext(DataContext);
//     const navigate = useNavigate();

//     const toggleSignUp = () => {
//         toggleAccount(account === 'signup' ? 'login' : 'signup');
//     };

//     const onInputChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async () => {
//         try {
//             if (!formData.username || !formData.password) {
//                 throw new Error('Please fill in all fields.');
//             }

//             let response;
//             if (account === 'login') {
//                 response = await API.userLogin(formData);
//                 if (!response.isSuccess || !response.data.status) {
//                     throw new Error('Username or password is incorrect.');
//                 }
//             } else {
//                 if (Object.values(formData).some(value => !value.trim())) {
//                     throw new Error('Please enter valid values.');
//                 }
//                 response = await API.userSignup(formData);
//             }

//             sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
//             sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

//             setAccount({ username: response.data.username, name: response.data.name });
//             isUserAuthenticated(true);
//             navigate('/');
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     return (
//         <Component>
//             <Box>
//                 <Image src={imageUrl} />
//                 <Wrapper>
//                     {account === 'login' ?
//                         <>
//                             <TextField required variant="standard" value={formData.username} onChange={onInputChange} name="username" label="Username" />
//                             <TextField required variant="standard" value={formData.password} onChange={onInputChange} name="password" label="Password" type="password" />
//                         </>
//                         :
//                         <>
//                             <TextField required variant="filled" onChange={onInputChange} name="name" label="Name" />
//                             <TextField required variant="filled" onChange={onInputChange} name="username" label="Username" />
//                             <TextField required variant="filled" onChange={onInputChange} name="password" label="Password" type="password" />
//                         </>
//                     }
//                     {error && <Error>{error}</Error>}
//                     <LoginButton variant="contained" onClick={handleSubmit}>{account === 'login' ? 'Login' : 'Sign Up'}</LoginButton>
//                     <SignUpButton onClick={toggleSignUp}>{account === 'login' ? 'Create an Account' : 'Already have an Account'}</SignUpButton>
//                 </Wrapper>
//             </Box>
//         </Component>
//     );
// };

// export default Login;
