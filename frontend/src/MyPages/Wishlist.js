import { RollbackOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

const Wishlist = () => {
    const { userId } = useParams()
    const [wishlist, setWishlist] = useState([])
    const navigate = useNavigate()
    const username = localStorage.getItem("username")
    const [Loading, setLoading] = useState(false)

    const loadWishlist = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`http://localhost:9000/api/users/wishlist/${userId}`)
            // console.log(res.data)
            setWishlist(res.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    useEffect(() => {
        loadWishlist()
    }, [])
    const handleBack = () => {
        navigate("/")
    }
    const handleSinglePost = (post) => {
        console.log(post)
        navigate(`/post/${post._id}`)
      }
    return (
        <div style={{ backgroundColor: "#010511", minHeight: "100vh", color: '#FFF', display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column" }}><br />
            <RollbackOutlined onClick={handleBack} style={{ color: '#fff', fontSize: "25px", cursor: "pointer", textAlign: "left", width: "80%" }} />

            <h1 style={{ textAlign: "center", borderBottom: "4px solid #fff", paddingBottom: "8px", width: "80%" }}>{username}'s Wishlist</h1><br />
            {Loading && <Spin size="large"/>}
            {wishlist.length === 0 && <>
                <h3>Add Your Favorite Movie to Wishlist.....</h3>
            </>}
            
            <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "10px 0" }}>
                <div className='cards'>
                    {wishlist.map(movie => (
                        <div className='card'  onClick={()=>handleSinglePost(movie)} style={{ backgroundImage: `url(${movie.image})`, cursor:"pointer" }}> <p style={{
                            textAlign: "center",
                            marginTop: "auto",
                            padding: "10px",
                            width: "100%",
                            color: "#fff",

                            backgroundColor: "rgb(0 0 0 / 60%)",
                            fontSize: "22px"
                        }}>{movie.title}</p>
                        {console.log(movie)}

                        </div>

                    ))}</div></div>

        </div>

    )
}

export default Wishlist