import React, { useState } from 'react'
import "./Style.css"
import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Radio, Spin, Upload, message, } from 'antd';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';



const Signup = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [Loading, setLoading] = useState(null)
    const [UploadedImg, setUploadedImg] = useState(null)
    const [UserDetails, setUserDetails] = useState(null)
    const navigate = useNavigate()
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
                setUserDetails({ ...UserDetails, ["pic"]: imageURL })

            } else {

                onError(response.statusText);
            }
        } catch (error) {

            console.error('Error uploading image: ', error);
        }
    };
    const handleValues = (e) => {
        setUserDetails({ ...UserDetails, [e.target.id]: e.target.value })
    }
    const handleDate = (e) => {
        const date = e.$D + ' ' + e.$M + ' ' + e.$y;
        setUserDetails({ ...UserDetails, ["DOB"]: date })
    };
    const handleSubmit = async () => {
        setLoading("SignupLoading")
        try {
            const res = await axios.post("https://movie-website-server.onrender.com/api/user/signup", UserDetails)
            console.log(res)
            if (res.status === 200) {
                message.success('User Account Created Successfully!');
            }
            setLoading(null)

            navigate('/signin')

        } catch (error) {
            const errormsg = error.response.data.message
            message.error(error.response.data.message);
            setLoading(null)
            console.log(error)
        }
    }
    return (
        <div>
            <div className='signup'>
                <div className='form'>
                    <h2 style={{ color: "#fff", textAlign: "center", borderBottom: "4px solid #fff", paddingBottom: "10px", fontSize: "30px" }}>Create a Account !!</h2><br />
                    <Form
                        validateTrigger="onSubmit"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                    >
                        <div style={{ width: "45%" }}>
                            <Form.Item name="username"
                                onChange={handleValues}
                                label="Name"
                                rules={[{ required: true, message: 'Please input your name' }]} >
                                <Input placeholder="Please input your name" />
                            </Form.Item>

                            <Form.Item name="email"
                                onChange={handleValues}
                                label="Email"
                                rules={[{ required: true, message: 'Please input your Email' }]} >
                                <Input />
                            </Form.Item>
                            <Form.Item name="password"
                                onChange={handleValues}
                                label="Password"
                                rules={[{ required: true, message: 'Please input your Password' }]} >
                                <Input />
                            </Form.Item>

                            <Form.Item name="Gender" onChange={(e) => setUserDetails({ ...UserDetails, ["gender"]: e.target.defaultValue })} label="Gender" rules={[{ required: true, message: 'Please Select Your Gender' }]}  >
                                <Radio.Group  >
                                    <Radio value="Male"> Male </Radio>
                                    <Radio value="Female"> Female </Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item name="dob" label="Date of Birth" rules={[{ required: true, message: 'Please select Your Birthday Date' }]}>
                                <DatePicker onChange={handleDate} />
                            </Form.Item>
                        </div>

                        <div style={{ width: "45%" }}>
                            <Form.Item name="Phone"
                                onChange={handleValues}
                                label="Phone"
                                rules={[{ required: true, message: 'Please input your Phone' }]}>
                                <Input />
                            </Form.Item>
                           

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
                            <Form.Item >
                                <Button type="primary" htmlType="submit" onClick={handleSubmit}>Register</Button>
                            </Form.Item>
                        </div>
                    </Form>
                    {Loading==="SignupLoading" && <>
                    <p style={{ textAlign: "center", color: "#fff" }}>Loading... <Spin/></p><br/>
                    </>}
                    <p style={{ textAlign: "center", color: "#fff" }}>Already Have and Account? <Link to="/signin">Signin</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup