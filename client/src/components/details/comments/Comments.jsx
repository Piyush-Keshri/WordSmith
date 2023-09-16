// Import necessary React hooks, components, and styles from MUI
import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled, Typography } from '@mui/material';

// Import DataContext and API from their respective sources
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';

// Import Comment component
import Comment from './Comment';

// Define a styled component for the main container
const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;

// Define a styled component for an image
const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

// Define a styled component for a textarea
const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

// Define an initial comment state
const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

// Define the Comments component
const Comments = ({ post }) => {
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    // Initialize state variables for comment, comments list, and a toggle
    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);

    // Access account data from DataContext
    const { account } = useContext(DataContext);

    // Use useEffect to fetch comments data when the component mounts or when the toggle state changes
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                }
            } catch (error) {
                console.log('Error while fetching comments:', error);
            }
        };
        getData();
    }, [toggle, post])

    // Handle changes in the comment textarea
    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    // Function to add a new comment
    const addComment = async () => {
        await API.newComment(comment);
        setComment(initialValue)
        setToggle(prev => !prev);
    }

    // Render the component
    return (
        <Box>
            <Container>
                <Image src={url} alt="dp" />
                <StyledTextArea
                    minRows={5}
                    placeholder="what's on your mind?"
                    onChange={(e) => handleChange(e)}
                    value={comment.comments}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    style={{ height: 40 }}
                    onClick={(e) => addComment(e)}
                >Post</Button>
            </Container>
            <Box>
                {comments && comments.length > 0 ? (
                    comments.map(comment => (
                        <Comment key={comment.id} comment={comment} setToggle={setToggle} />
                    ))
                ) : (
                    <Typography>No comments found</Typography>
                )}
            </Box>
        </Box>
    )
}

// Export the Comments component as the default export
export default Comments;
