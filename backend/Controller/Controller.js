import express from "express";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
import UserModel from "../Models/UserModel.js";
import AdminModel from "../Models/AdminModel.js";
import PostModel from "../Models/PostModel.js";
import mongoose from "mongoose";
class Controller {
    static userRegisteration = async (req, res) => {
        const { email, password, username, Phone, DOB, gender, pic } = req.body;
        // console.log(req.body)
        try {
            if (email, password, username, Phone, DOB, gender, pic) {
                const isUser = await UserModel.findOne({ email: email });
                if (!isUser) {
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashPassword = await bcryptjs.hash(password, genSalt);

                    const newUser = new UserModel({
                        email: email,
                        password: hashPassword,
                        username: username,
                        Phone: Phone,
                        DOB: DOB,
                        gender: gender,
                        pic: pic,
                    })
                    const savedUser = await newUser.save()
                    if (savedUser) {
                        return res.status(200).json({ message: "Users Registration Sucessfully" })
                    }
                } else {
                    return res.status(400).json({ message: "Email Already Registered" })
                }
            } else {
                return res.status(400).json({ message: "All Fields are Required" })
            }
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }
    static userLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            if (email && password) {
                const isEmail = await UserModel.findOne({ email: email });


                if (isEmail) {
                    if (isEmail.status === "Disabled") {
                        return res.status(500).send({ message: "Your Account Has Been Disabled Contact Admin!!" })
                    } else {
                        if (isEmail.email === email && await bcryptjs.compare(password, isEmail.password)) {

                            const token = jwt.sign({ userID: isEmail._id }, "secretkey", {
                                expiresIn: "2d"
                            });

                            return res.status(200).json({
                                message: "Login Successfully",
                                token,
                                user: isEmail,
                            });
                        } else {
                            return res.status(400).json({ message: "Wrong Credentials" });
                        }
                    }
                } else {
                    return res.status(400).json({ message: "Email ID Not Found!!" });
                }
            }
            else {
                return res.status(400).json({ message: "All Fields are Required" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    static adminLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            if (email && password) {
                const isEmail = await AdminModel.findOne({ email: email })
                if (isEmail) {
                    if (isEmail.email === email && isEmail.password === password) {
                        const token = jwt.sign({ userID: isEmail._id }, "secretkey", {
                            expiresIn: "2d"
                        });
                        return res.status(200).json({
                            message: "Login Sucessfully",
                            token,
                            type: "admin",
                            user: isEmail
                        });
                    } else {
                        return res.status(400).json({ message: "Wrong Credentials" })

                    }
                } else {
                    return res.status(400).json({ message: "Email ID Not Found!!" })
                }
            } else {

                return res.status(400).json({ message: "All Fields are Required" })
            }
        } catch (error) {
            return res.status(400).json({ message: error.message })
        }
    }

    static createPost = async (req, res) => {
        const { title, Summary, content, genre, image, video } = req.body;

        try {
            if (!title || !Summary || !content || !image || !genre || !video) {
                return res.status(400).json({ message: "All fields are required" });
            }

            const newPost = new PostModel({
                title,
                Summary,
                content,
                image,
                genre,
                video
            });
            const savedPost = await newPost.save();

            if (savedPost) {
                return res.status(200).json({ message: "Movie post created successfully" });
            } else {
                return res.status(500).json({ message: "Failed to create a blog post" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    static allPosts = async (req, res) => {
        try {
            const posts = await PostModel.find()
            res.status(200).send(posts)
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }


    }
    static allUsers = async (req, res) => {
        try {
            const Users = await UserModel.find()
            res.status(200).send(Users)
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }


    }
    static SingleUser = async (req, res) => {
        const { userId } = req.params
        try {
            const User = await UserModel.findById(userId)
            res.status(200).send(User)
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }


    }
    static SinglePost = async (req, res) => {
        const { postId } = req.params
        try {
            const SinglePost = await PostModel.findById(postId)
            if (!SinglePost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).json(SinglePost)
        } catch (error) {
            return res.status(400).json({ message: error.message });

        }
    }
    static deletePost = async (req, res) => {
        const { postId } = req.params
        // console.log(postId)
        try {
            const DeletedPost = await PostModel.findByIdAndDelete(postId)
            if (!DeletedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(200).send("Post Has Been Deleted")
        } catch (error) {
            return res.status(400).json({ message: error.message });

        }
    }
    static editPost = async (req, res) => {

        const { postId } = req.params;

        const { title, Summary, content, genre, image, video } = req.body;
        // console.log(req.body)
        try {

            const post = await PostModel.findById(postId);

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            post.title = title;
            post.Summary = Summary;
            post.content = content;
            post.genre = genre;
            post.image = image;
            post.video = video;

            const updatedPost = await post.save();

            res.json(updatedPost);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating post' });
        }

    }
    static editProfile = async (req, res) => {

        const { userId } = req.params;
        console.log(req.body)
        const { UploadedImg } = req.body;
        // // console.log(req.body)
        try {

            const User = await UserModel.findById(userId);

            if (!User) {
                return res.status(404).json({ message: 'User not found' });
            }
            if (!UploadedImg) {
                return res.status(400).json({ message: 'Please Upload Image to Proceed' });

            }


            User.pic = UploadedImg;

            const updatedUser = await User.save();

            res.json(updatedUser);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating User' });
        }

    }
    static editProfileDetails = async (req, res) => {

        const { userId } = req.params;
        console.log(userId)
        const { username, email, password, Phone } = req.body;
        // // console.log(req.body)
        try {

            const User = await UserModel.findById(userId);

            if (!User) {
                return res.status(404).json({ message: 'User not found' });
            }

            User.username = username;
            User.email = email;
            User.password = password;
            User.Phone = Phone;

            const updatedUser = await User.save();

            res.json(updatedUser);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating User' });
        }

    }
    static disableUser = async (req, res) => {

        const { userId } = req.params;

        // const { Name, Summary, content, Genre, image } = req.body;
        console.log(userId)
        try {

            const User = await UserModel.findById(userId);

            if (!User) {
                return res.status(404).json({ message: 'User not found' });
            }


            User.status = "Disabled";

            const updatedUser = await User.save();

            res.json(updatedUser);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating User' });
        }

    }
    static enableUser = async (req, res) => {

        const { userId } = req.params;

        // const { Name, Summary, content, Genre, image } = req.body;
        console.log(userId)
        try {

            const User = await UserModel.findById(userId);

            if (!User) {
                return res.status(404).json({ message: 'User not found' });
            }


            User.status = "Active";

            const updatedUser = await User.save();

            res.json(updatedUser);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating User' });
        }

    }
    static RemoveWishlist = async (req, res) => {
        const { userId, postId } = req.params;
    console.log(req.body)
        try {
            const user = await UserModel.findById(userId);
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            if (user.status === "Disabled") {
                return res.status(400).json({ message: 'Your Account is Disabled By Admin' });
            }
    
            if (!user.wishlist.includes(postId)) {
                return res.status(400).json({ message: 'Post not found in wishlist' });
            }
    
            // Remove postId from wishlist
            user.wishlist.pull(postId);
            await user.save();
    
            // Send updated user object in response
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
    
    
    static addtoWishlist = async (req, res) => {
        const { userId, postId } = req.body;

        try {
            const user = await UserModel.findById(userId);
            const post = await PostModel.findById(postId).populate()
            if (user.status === "Disabled") {
                return res.status(400).json({ message: 'Your Account is Disabled By Admin' });

            } else {
                if (user.wishlist.includes(postId)) {
                    return res.status(400).json({ message: 'Post already in wishlist' });
                }
                user.wishlist.push(post);
                await user.save();

                res.json(user);
            }


        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
    static Wishlist = async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await UserModel.findById(userId).populate({
                path: 'wishlist',
                model: 'Post'
            });

            const wishlist = [];

            for (const postId of user.wishlist) {
                const post = await PostModel.findById(postId);
                wishlist.push(post);
            }

            res.json(wishlist);

        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }

}
export default Controller