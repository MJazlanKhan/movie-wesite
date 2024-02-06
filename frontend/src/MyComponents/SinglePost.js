import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { RollbackOutlined, PlusCircleOutlined, MinusCircleFilled } from "@ant-design/icons"
import { Carousel, Image, Spin, message } from 'antd';
const SinglePost = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [Loading, setLoading] = useState(null)
    const [postData, setPostData] = useState([])
    const [wishlistItems, setWishlistItems] = useState(null)
    const { postId } = useParams();
    const userId = localStorage.getItem("userid")


    const loadPost = async () => {
        // console.log(postId)
        const res = await axios.get(`http://localhost:9000/api/post/${postId}`)
        setPostData(res.data)
    }
    useEffect(() => {
        loadPost()
    }, [])
    const handleBack = () => {
        navigate("/")
    }
    const RemoveWishlist = async () => {
        setLoading("wishlistLoad")
        try {
            const res = await axios.delete(`http://localhost:9000/api/users/wishlist/remove/${userId}/${postId}`);

            console.log(res)
            message.success("Post Delete From Wishlist")
            setLoading(null)
            navigate(`/post/${postData._id}`)

        } catch (error) {
            console.log(error)
            setLoading(null)
            message.error(error.response.data.message)

        }
    }

    const handleWishlist = async () => {
        setLoading("wishlistLoad")
        try {
            const res = await axios.put("http://localhost:9000/api/users/wishlist/add", {
                postId: postId,
                userId: userId
            })

            console.log(res)
            message.success("Post Added to Wishlist")
            setLoading(null)
        } catch (error) {
            console.log(error)
            setLoading(null)
            message.error(error.response.data.message)

        }
    }
    const checkWishlist = async () => {

        try {
            const res = await axios.get(`http://localhost:9000/api/users/wishlist/${userId}`)

            console.log(res.data)
            setWishlistItems(res.data)
        } catch (error) {
            console.log(error)

        }
    }
    useEffect(() => {
        checkWishlist()
    }, [])
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <>

            <div style={{ backgroundColor: "#010511", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%" }}><br />
                <div style={{ display: "flex", justifyContent: "space-between", width: "80%" }}>
                    <RollbackOutlined onClick={handleBack} style={{ color: '#fff', fontSize: "25px", cursor: "pointer" }} />
                    {wishlistItems && wishlistItems.map(item => {
                        console.log("postData._id:", postData._id);
                        console.log("wishlistItem._id:", item._id);
                        if (item._id === postData._id) {
                            return (
                                <div onClick={RemoveWishlist} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "200px", cursor: "pointer", flexDirection: "column" }}>
                                    <MinusCircleFilled style={{ color: '#fff', fontSize: "25px", }} /><span style={{ color: "#fff", padding: "5px 0" }}>Remove From Wishlist</span>
                                    {Loading === "wishlistLoad" && <Spin />}
                                </div>
                            );
                        }
                    })}
                    {(!wishlistItems || wishlistItems.length === 0 || !wishlistItems.some(item => item._id === postData._id)) &&
                        <div onClick={handleWishlist} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "150px", cursor: "pointer", flexDirection: "column" }}>
                            <PlusCircleOutlined style={{ color: '#fff', fontSize: "25px", }} /><span style={{ color: "#fff", padding: "5px 0" }}>Add to Wishlist</span>
                            {Loading === "wishlistLoad" && <Spin />}
                        </div>
                    }
                </div>

                <div style={{ backgroundColor: "#010511", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%" }}>
                    <div style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}>
                        <h1 style={{ color: "#fff" }}>Playing {postData.title} ...</h1><br />
                        {postData.video && <>
                            <MediaPlayer style={{ height: "80vh", width: "80%", display: "flex", justifyContent: "center", alignItems: "center" }} title={postData.title} src={postData.video}>
                                <MediaProvider />
                                <DefaultVideoLayout thumbnails={postData.image} icons={defaultLayoutIcons} />
                            </MediaPlayer>
                        </>}

                    </div>
                    <div className='content' style={{ color: "#fff", width: "60%" }}>
                        <h2 style={{ textAlign: "center" }}>More Info About {postData.title} ...</h2><br />
                        <div style={{ display: "flex", justifyContent: "center" }}><br />

                            {/* <img /> */}
                            <Image style={{ width: "300px", height: "400px" }} src={postData.image} />
                        </div><br /> <br />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h2>Genre of the Movie : </h2>
                            <h3 style={{ textAlign: "right" }} >{postData.genre}</h3>
                        </div><br /><br />
                        <div >
                            <h2>Summary of the Movie : </h2><br />
                            <h3 style={{ textAlign: "left" }}>{postData.Summary}</h3>
                        </div><br /><br />
                        <div >
                            <h2>Review About the Movie : </h2><br />
                            <h3 style={{ textAlign: "left" }} dangerouslySetInnerHTML={{ __html: postData.content }}></h3><br />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SinglePost