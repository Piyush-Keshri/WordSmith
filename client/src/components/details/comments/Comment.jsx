import { useContext } from "react";

import { Typography, Box, styled } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const Delete = styled(DeleteIcon)`
    margin-left: auto;
`;

const Comment = ({ comment, setToggle }) => {
    const { account } = useContext(DataContext);

    const removeComment = async () => {
        try {
            // Attempt to delete the comment
            await API.deleteComment(comment._id);
            // If successful, update the state to trigger a re-render
            setToggle(prev => !prev);
        } catch (error) {
            // Handle any errors here, e.g., log the error or show a user-friendly message
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                {comment.name === account.username && <Delete onClick={() => removeComment()} />}
            </Container>
            <Typography>{comment.comments}</Typography>
        </Component>
    )
}

export default Comment;