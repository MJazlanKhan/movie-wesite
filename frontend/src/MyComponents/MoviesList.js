import React, { useEffect, useState } from 'react'
import "./Style.css"
import { Spin, Tabs } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MoviesList = () => {
  const [postData, setPostData] = useState([])
  const navigate = useNavigate()
  const [Loading, setLoading] = useState(false)

  const loadPosts = async () => {
    try {
      setLoading(true)
      const res = await axios.get("https://movie-website-server.onrender.com/api/admin/allposts")
      const newData = res.data;
      setLoading(false)

      setPostData(newData)

    } catch (error) {
      setLoading(false)

      console.log(error)
    }
  }
  useEffect(() => {
    loadPosts()
  }, [])
  function filterPosts(posts, genre) {
    return posts.filter(post => post.genre.includes(genre))
  }
  const handleSinglePost = (post) => {
    console.log(post)
    navigate(`/post/${post._id}`)
  }
  return (
    <div className='MovielistWrapper'>
      <div>
        <h2 style={{ textAlign: "center" }}>Find Your Favorite Movie</h2><br />
        {Loading && <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}><Spin size='large'/></div>}
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="large"
          className='flex center'
          items={[
            {
              label: 'All',
              key: 'all',
              children: (
                <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "10px 0" }}>
                  <div className='cards'>
                    {postData.map(post => (
                      <div className='card' onClick={() => handleSinglePost(post)} style={{ backgroundImage: `url(${post.image})`, cursor: "pointer" }}> <p style={{
                        textAlign: "center",
                        marginTop: "auto",
                        padding: "10px",
                        width: "100%",
                        color: "#fff",

                        backgroundColor: "rgb(0 0 0 / 60%)",
                        fontSize: "22px"
                      }}>{post.title}</p>
                      </div>
                    ))}


                  </div>
                </div>
              )
            },
            {
              label: 'Horror',
              key: 'horror',
              children: (
                <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "10px 0" }}>
                  <div className='cards'>
                    {filterPosts(postData, 'Horror').map(post => (
                      <div className='card' style={{ backgroundImage: `url(${post.image})` }}> <p style={{
                        textAlign: "center",
                        marginTop: "auto",
                        padding: "10px",
                        width: "100%",
                        color: "#fff",

                        backgroundColor: "rgb(0 0 0 / 60%)",
                        fontSize: "22px"
                      }}>{post.title}</p>
                      </div>

                    ))}</div></div>)
            },
            {
              label: 'Mystery',
              key: 'mystery',
              children: (
                <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "10px 0" }}>
                  <div className='cards'>
                    {filterPosts(postData, 'Mystery').map(post => (
                      <div className='card' style={{ backgroundImage: `url(${post.image})` }}> <p style={{
                        textAlign: "center",
                        marginTop: "auto",
                        padding: "10px",
                        width: "100%",
                        color: "#fff",

                        backgroundColor: "rgb(0 0 0 / 60%)",
                        fontSize: "22px"
                      }}>{post.title}</p>
                      </div>

                    ))}</div></div>)
            },
            {
              label: 'Drama',
              key: 'drama',
              children: (
                <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: "10px 0" }}>
                  <div className='cards'>
                    {filterPosts(postData, 'Drama').map(post => (
                      <div className='card' style={{ backgroundImage: `url(${post.image})` }}> <p style={{
                        textAlign: "center",
                        marginTop: "auto",
                        padding: "10px",
                        width: "100%",
                        color: "#fff",

                        backgroundColor: "rgb(0 0 0 / 60%)",
                        fontSize: "22px"
                      }}>{post.title}</p>
                      </div>

                    ))}</div></div>)
            }
          ]}
        />
      </div>
    </div>
  )
}

export default MoviesList