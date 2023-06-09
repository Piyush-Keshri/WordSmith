import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    background: url(https://i.ibb.co/tzSQf6Y/23964.jpg);
    background-repeat: no-repeat;
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Heading = styled(Typography)`
    font: italic 3.2em "Fira Sans", serif;
    color: #FFFFFF;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    background: #FFFFFF;
`;

const Banner = () => {

    return (
        <Image>
            <Heading>Whats On Your Mind Today!</Heading>
        </Image>
    )
}

export default Banner;