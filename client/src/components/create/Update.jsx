import React, { useState, useEffect } from 'react';

import { Box, styled, TextareaAutosize, Button, FormControl, InputBase } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

import { API } from '../../service/api';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 50px;
    font-size: 18px;
    &:focus-visible {
        outline: none;
    }
`;

// Initial state for the post
const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const Update = () => {
    const navigate = useNavigate();

    // State variables
    const [post, setPost] = useState(initialPost); // Holds the current post data
    const [file, setFile] = useState(''); // Holds the selected file for upload
    const [imageURL, setImageURL] = useState(''); // Holds the URL of the uploaded image

    // Extract the 'id' parameter from the URL using react-router's useParams hook
    const { id } = useParams();

    // URL of a default image
    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    // Fetch the post data with the given id from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, []);

    // Upload the file to the server and update the post data with the image URL when the file changes
    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await API.uploadFile(data);
                if (response.isSuccess) {
                    setPost({ ...post, picture: response.data }); // Update the post's picture field
                    setImageURL(response.data);
                }
            }
        }
        getImage();
    }, [file])

    // Update the post data when the input fields change
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    // Update the blog post by sending a request to the API and navigate to the details page
    const updateBlogPost = async () => {
        await API.updatePost(post);
        navigate(`/details/${id}`);
    }

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField onChange={(e) => handleChange(e)} value={post.title} name='title' placeholder="Title" />
                <Button onClick={() => updateBlogPost()} variant="contained" color="primary">Update</Button>
            </StyledFormControl>

            <StyledTextArea
                rowsMin={5}
                placeholder="Tell your story..."
                name='description'
                onChange={(e) => handleChange(e)}
                value={post.description}
            />
        </Container>
    )
}

export default Update;