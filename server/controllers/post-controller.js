import Post from '../model/post.js';


// This function creates a new post by instantiating a Post model with the data from the request body.
// The post is then saved to the database, and a success message is returned if the operation is successful.
//  If any errors occur during the process, an error message is returned.
export const createPost = async (request, response) => {
    try {
        const post = await new Post(request.body);
        post.save();

        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

// This function retrieves all posts based on optional query parameters (username and category).
// If a username parameter is provided, it finds all posts with a matching username. 
// If a category parameter is provided, it finds all posts with a matching category. 
// If no query parameters are provided, it returns all posts.

export const getAllPosts = async (request, response) => {
    let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        if (username)
            posts = await Post.find({ username: username });
        else if (category)
            posts = await Post.find({ categories: category });
        else
            posts = await Post.find({});

        response.status(200).json(posts);
    } catch (error) {
        response.status(500).json(error)
    }
}

// This function retrieves a specific post by its ID. It uses the findById method of the Post model to find the post with the specified ID.

export const getPost = async (request, response) => {

    try {
        const post = await Post.findById(request.params.id);
        return response.status(200).json(post);
    }
    catch (error) {

        response.status(500).json(error);
    }

}

//  This function updates a specific post by its ID. It first finds the post in the database using the provided ID. 
// If the post is not found, a 404 status code is returned with an error message. 
// If the post is found, it is updated with the data from the request body using the findByIdAndUpdate method.
export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            response.status(404).json({ msg: 'Post not found' })
        }

        await Post.findByIdAndUpdate(request.params.id, { $set: request.body })

        response.status(200).json('post updated successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

// This function deletes a specific post by its ID. It finds the post in the database using the provided ID. 
// It then deletes the post using the delete method. After successful deletion, a success message is returned.

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        await Post.findByIdAndDelete(post._id)

        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}