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

// Object to Store the entered Data

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createDate: new Date()

}

const CreatePost = () => {

    // Hook to capture object data.
    const [post, setPost] = useState(initialPost);

    // Hook to capture uploaded files
    const [file, setFile] = useState('');

    const { account } = useContext(DataContext);

    const location = useLocation();
    const navigate = useNavigate();

    const imgUrl = post.picture ? post.picture : 'https://i.ibb.co/QcsVfv0/dark-background-abstract-background-network-3d-background-7680x4320-8324.png';

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                const response = await API.uploadFile(data);
                post.picture = response.data;
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
    }, [file])

    // Function to capture changes made in Input Area.
    const handleChange = (e) => {

        setPost({ ...post, [e.target.name]: e.target.value });

    }

    // Function to save all data when publish button is clicked

    const savePost = async () => {

        let response = await API.createPost(post);
        if (response.isSuccess) {
            navigate('/');
        }
    };


    return (
        <Container>
            <Image src={imgUrl} alt='banner image' />

            <StyledFormControl>

                <label htmlFor='fileInput'>
                    <Add fontSize='large' />
                </label>
                <input
                    type='file'
                    id='fileInput'
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField placeholder='Title' name='title' onChange={(e) => handleChange(e)} />

                <Button variant='contained' onClick={() => savePost()}>Publish</Button>

            </StyledFormControl>

            <TextArea
                minRows={5}
                placeholder='Tell Your Story ...'
                name='description'
                onChange={(e) => handleChange(e)}
            />

        </Container>

    );

}

export default CreatePost;