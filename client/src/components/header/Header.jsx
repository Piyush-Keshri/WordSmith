import { AppBar, Toolbar, styled, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../service/api";
const Component = styled(AppBar)`
background:#FFFFFF;
color:#000;
`;

const Container = styled(Toolbar)`

justify-content: center;
&>a{
    padding : 25px;
    text-decoration:none;
}
`



const Header = () => {
    const navigate = useNavigate();
    const logout = async () => {
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Button variant="text" onClick={logout}>LOGOUT</Button>
            </Container>
        </Component>
    )

}

export default Header;