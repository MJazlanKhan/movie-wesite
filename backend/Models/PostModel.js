import express from "express";
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    Summary: {
        type: String,
        required: true,
    }, 
    image: {
        type: String,
        required: true,
    }, 
    content: {
        type: String,
        required: true,
    },
    video:{
        type: String,
        required: true,
    }
},{
    timestamps:true
})

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel