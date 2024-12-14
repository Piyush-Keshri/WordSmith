
import { styled, Box, Typography } from '@mui/material';

// Image Container with Background and Animation
const Image = styled(Box)`
    width: 100%;
    background: url(https://i.ibb.co/QcsVfv0/dark-background-abstract-background-network-3d-background-7680x4320-8324.png) center/cover no-repeat;
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    filter: brightness(0.7);
`;

// Heading with Animation and Text Effects
const Heading = styled(Typography)`
    font: italic 3.6em "Fira Sans", serif;
    color: #FFFFFF;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
    line-height: 1.2;
    text-align: center;
    letter-spacing: 2px;
    margin: 0;
    animation: fadeIn 2s ease-in-out forwards;
`;

// Subheading with Slide-Up Animation
const SubHeading = styled(Typography)`
    font-size: 1.2em;
    font-weight: 600;
    color: #FFFFFF;
    background: rgba(0, 0, 0, 0.4);
    padding: 10px 20px;
    border-radius: 5px;
    margin-top: 20px;
    animation: slideUp 1.5s ease-in-out forwards;
`;

// Keyframes for Animations
const GlobalStyles = styled('style')`
  @keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
  }
`;

const Banner = () => {
    return (
        <>
            <GlobalStyles />
            <Image>
                <Heading>What's On Your Mind Today!</Heading>
                <SubHeading>Let your thoughts guide your creativity</SubHeading>
            </Image>
        </>
    );
};

export default Banner;
