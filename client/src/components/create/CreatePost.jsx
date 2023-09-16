import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material'
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider'
import { API } from '../../service/api'

// Styled Components.

const Container = styled(Box)`
    margin : 50px 100px; 
`;

const Image = styled('img')({
    width: '100%',
    height: '40vh',
    objectFit: 'cover'
});

const StyledFormControl = styled(FormControl)`
  margin-top:10px;
  display:flex;
  flex-direction:row;

`;

const InputTextField = styled(InputBase)`
    flex:1;
    margin: 0 30px;
    font-size : 25px;

`;

const TextArea = styled(TextareaAutosize)`
margin-top : 50px;
width : 100%;
font-size:14px;
border-radius : 5px;
border:none;

&:focus-visible{
    outline:none;
}
`

// Initial state for the post
const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createDate: new Date()
};

const CreatePost = () => {
    // State to capture the post data
    const [post, setPost] = useState(initialPost);

    // State to capture uploaded files
    const [file, setFile] = useState('');

    // Get the account context and navigation
    const { account } = useContext(DataContext);
    const location = useLocation();
    const navigate = useNavigate();

    // Default image URL for the banner image
    const imgUrl = post.picture ? post.picture : 'https://i.ibb.co/QcsVfv0/dark-background-abstract-background-network-3d-background-7680x4320-8324.png';

    useEffect(() => {
        // Function to handle file upload
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);

                const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        };
        getImage();

        // Set categories and username based on location and account data
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file]);

    // Function to handle input changes
    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    // Function to save the post
    const savePost = async () => {
        // Check for empty title
        if (post.title.trim() === '') {
            alert('Please enter a title');
            return;
        }

        // Check for minimum description length
        if (post.description.trim().length < 100) {
            alert('Please enter a minimum of 100 characters in the description');
            return;
        }

        // Call the API to create the post
        let response = await API.createPost(post);
        if (response.isSuccess) {
            // Navigate to the homepage after successful submission
            navigate('/');
        }
        else {
            alert('Cannot create Post');
        }
    };

    return (
        <Container>
            <Image src={imgUrl} alt='banner image' />

            <StyledFormControl>
                {/* File input for image upload */}
                <label htmlFor='fileInput'>
                    <Add fontSize='large' />
                </label>
                <input
                    type='file'
                    id='fileInput'
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />

                {/* Title input */}
                <InputTextField
                    placeholder='Title'
                    name='title'
                    value={post.title}
                    onChange={(e) => handleChange(e)}
                />

                {/* Publish button */}
                <Button variant='contained' onClick={() => savePost()}>
                    Publish
                </Button>
            </StyledFormControl>

            {/* Description textarea */}
            <TextArea
                minRows={5}
                placeholder='Tell Your Story ...'
                name='description'
                value={post.description}
                onChange={(e) => handleChange(e)}
            />
        </Container>
    );
};

export default CreatePost;