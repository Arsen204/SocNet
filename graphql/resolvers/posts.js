const Post = require('../../models/Post')
const checkAuth = require('../../util/checkAuth')
const { AuthenticationError, UserInputError } = require('apollo-server')

module.exports = {
    Post: {
        likesCount: (parent) => parent.likes.lenght,
        commentsCount: (parent) => parent.comments.length
    },

    Query: {
        async getPost(_, { postId }) {
            try {
                const post = await Post.findById(postId)
                if (post) {
                    return post
                } else {
                    throw new Error('Post not found')
                }
            } catch(err) {
                throw new Error(err)
            }
        },

        async getPosts(){
            try {
                const posts = await Post.find().sort({ createdAt: -1 })
                return posts
            } catch(err) {
                throw new Error(err)
            }
        }
    },

    Mutation: {
        async createPost(_, { body }, context) {
            const user = checkAuth(context)
            const newPost = new Post({
                body,
                username: user.username,
                createdAt: new Date().toISOString()
            })
            const post = await newPost.save()
            return post
        },

        async deletePost(_, { postId }, context) {
            const user = checkAuth(context)
            try {
                const post = await Post.findById(postId)
                if (user.username = post.username) {
                    await post.delete()
                    return 'Post deleted'
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            } catch(err) {
                throw new Error(err)
            }
        },

        async likePost(_, { postID }, context) {
            const { username } = checkAuth(context)
            const post = new Post.findById(postID)

            if (post) {
                if (post.likes.find(like => like.usernmae === username)) {
                    //Post already liked
                    post.likes = post.likes.filter(like => like.username !== username)
                } else {
                    //not liked post
                    post.likes.push({
                        username, 
                        createdAt: new Date().toDateString()
                    })
                }
                await post.save()
                return post
            } else {
                throw new UserInputError('Post not found')
            }
        }
    }
}