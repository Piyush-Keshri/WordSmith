import { AppBar, Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom";
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

    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/login'>LOGOUT</Link>
            </Container>
        </Component>
    )

}

export default Header;