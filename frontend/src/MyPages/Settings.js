import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Spin, Upload, Form, Button, message, Input, Image } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import "./Style.css"

const Settings = () => {
    const userId = localStorage.getItem("userid")
    const username = localStorage.getItem("username")
    const [User, setUser] = useState()
    const [Status, setStatus] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();
    const [editmode, setEditmode] = useState(false)
    const [Loading, setLoading] = useState()
    const [UploadedImg, setUploadedImg] = useState()
    const navigate = useNavigate()
    const loadUser = async () => {

        try {
            const res = await axios.get(`https://movie-website-server.onrender.com/api/user/${userId}`)
            console.log(res)
            setUser(res.data)
            console.log(User)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadUser()
    }, [])

    const cloudinaryConfiguration = {
        cloudName: 'dcnam8mwd',
        apiKey: 'gNB3SUQcqpoCyWaeXDFGExjwhZM',
    };

    const customRequest = async ({ file, onSuccess, onError }) => {
        const fileName = file.name;
        setLoading("imgLoad")
        try {

            const formData = new FormData();
            formData.append('file', file, { folder: "UserProfiles" });
            formData.append('upload_preset', 'UserProfiles');;

            const response = await axios.post('https://api.cloudinary.com/v1_1/dcnam8mwd/image/upload', formData);


            if (response.status === 200) {
                const imageURL = response.data.secure_url;
                setUploadedImg(imageURL)
                setLoading(null)

            } else {

                onError(response.statusText);
            }
        } catch (error) {

            console.error('Error uploading image: ', error);
        }
    };
    const toggleEdit = () => {
        if (!editmode) {
            setEditmode(true)
        } else {
            setEditmode(false)
        }
    }

    const setPic = async () => {
        const userId = User._id
        try {
            const res = await axios.put(`https://movie-website-server.onrender.com/api/user/profile/${userId}`, { UploadedImg })
            // console.log(res)
            setUser(res.data)
            setUploadedImg(null)
            setEditmode(false)
            message.success("Profile Picture Has Been Updated !!")
        } catch (error) {
            console.log(error)
            message.error(error.response.data.message)
        }
    }
    const handleValues = (e) => {
        setUser({ ...User, [e.target.id]: e.target.value })
    }
    const handleSubmit = async () => {
        console.log(User)
        try {
            const res = await axios.put(`https://movie-website-server.onrender.com/api/user/profileDetails/${userId}`, User)
            console.log(res)
            setUser(res.data)
            localStorage.setItem("username", User.username)
            setStatus(false)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <div style={{ backgroundColor: "#010511", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%" }}>
                {User && <>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%" }}>
                        <h2 style={{ color: "#fff" }}>Details About {username} ...</h2><br />
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            {/* <img  src={User.pic} /> */}
                            <Image style={{ width: "120px", height: "120px", borderRadius:"10px" }} src={User.pic}/>
                            {editmode && <>
                                <Form.Item name="pic" label="Profile Pic" rules={[
                                    {
                                        required: true,
                                        message: 'Please upload profile image',
                                    },
                                ]}  >
                                    <Upload action="/upload.do" customRequest={customRequest} showUploadList={false} listType="picture-card">
                                        <div>
                                            {!UploadedImg && <>
                                                <PlusOutlined />
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </>}
                                            {Loading === "imgLoad" && <>
                                                <Spin />
                                            </>}
                                            {UploadedImg && <>
                                                <img style={{ width: "80%", borderRadius: "50px", height: "80%" }} src={UploadedImg} />
                                            </>}
                                        </div>
                                    </Upload>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={setPic}>Set Profile Pic</Button>
                                </Form.Item>
                            </>}


                        </div><br />
                        <EditOutlined style={{ backgroundColor: "#FFF", color: "#000", fontSize: "15px", padding: "3px", cursor: "pointer", borderRadius: "50px" }} onClick={toggleEdit} /><br />

                        {!Status &&
                            <>
                                <div style={{ color: "#FFF", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "25px", width: "40%" }}>
                                    <h4>Name : </h4> <h4>{User.username}</h4>
                                </div><br />
                                <div style={{ color: "#FFF", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "25px", width: "40%" }}>
                                    <h4>Email : </h4> <h4>{User.email}</h4>
                                </div><br />
                                <div style={{ color: "#FFF", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "25px", width: "40%" }}>
                                    <h4>Phone : </h4> <h4>{User.Phone}</h4>
                                </div><br />
                                <div style={{ color: "#FFF", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "25px", width: "40%" }}>
                                    <h4>Date Of Birth : </h4> <h4>{User.DOB}</h4>
                                </div><br />
                                <div style={{ color: "#FFF", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "25px", width: "40%" }}>
                                    <h4>Gender : </h4> <h4>{User.gender}</h4>
                                </div>
                            </>}
                        {Status && <>
                            <div className='editForm' style={{ width: "40%" }}>
                                <Form.Item onChange={handleValues} label="Name" name="username" >
                                    <Input placeholder="Please input your name ..." />
                                </Form.Item>
                                <Form.Item onChange={handleValues} label="Email" name="email" >
                                    <Input placeholder="Please input your Email ..." />
                                </Form.Item>
                                <Form.Item onChange={handleValues} label="Phone" name="Phone" >
                                    <Input placeholder="Please input your Phone Number ..." />
                                </Form.Item>
                                <Form.Item onChange={handleValues} label="Password" name="password" >
                                    <Input placeholder="Please input your  Password ..." />
                                </Form.Item>
                                <Form.Item style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100%"}}>
                                    <Button style={{marginRight:"15px"}} onClick={handleSubmit}>Update Profile</Button>
                                    <Button type="primary" onClick={()=>setStatus(false)}>Back to Profile</Button>
                                </Form.Item>
                            </div>
                        </>}
                    </div><br/>
                    {!Status && <>
                        <Button style={{fontSize:"12px"}} size='small' type='primary' onClick={() => setStatus(true)}>Edit Details</Button><br/>
                        <Button style={{fontSize:"12px"}} size='small'  onClick={() => navigate("/")}>Back</Button>
                    </>}
                </>}
            </div>
        </div>
    )
}

export default Settings