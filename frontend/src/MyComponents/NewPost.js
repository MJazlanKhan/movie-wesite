import { Button, Form, Input, Spin, Upload, message } from 'antd'
import React, { useState } from 'react'
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import FroalaEditor from 'react-froala-wysiwyg';
import "./Style.css"
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const NewPost = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const [UploadedImg, setUploadedImg] = useState(null)
    const [Loading, setLoading] = useState(null)
    const [PostDetails, setPostDetails] = useState({
        content:""
    })
    const cloudinaryConfiguration = {
        cloudName: 'dcnam8mwd',
        apiKey: 'gNB3SUQcqpoCyWaeXDFGExjwhZM',
    };

    const customRequest = async ({ file, onSuccess, onError }) => {
        const fileName = file.name;
        setLoading("imgLoad")
        try {

            const formData = new FormData();
            formData.append('file', file, { folder: "movies" });
            formData.append('upload_preset', 'movies');;

            const response = await axios.post('https://api.cloudinary.com/v1_1/dcnam8mwd/image/upload', formData);


            if (response.status === 200) {
                const imageURL = response.data.secure_url;
                setUploadedImg(imageURL)
                setLoading(null)
                setPostDetails({ ...PostDetails, ["image"]: imageURL })

            } else {

                onError(response.statusText);
            }
        } catch (error) {

            console.error('Error uploading image: ', error);
        }
    };
    const handleValues =(e)=>{
        setPostDetails({...PostDetails, [e.target.id]:e.target.value})
    }
    const handleContent =(e)=>{
        setPostDetails({...PostDetails, "content":e})
    }
    const handleSubmit = async()=>{
        try {
            const res = await axios.post("http://localhost:9000/api/admin/post", PostDetails)
            console.log(res)
            if(res.status === 200){
                message.success("Post Created Sucessfully");
                navigate("/admin/home")
            }
        } catch (error) {
            console.log(error.response.data.message)
            message.error(error.response.data.message);

        }
    }
    return (
        <div className='newpost'>
            <h2 style={{textAlign:"center", paddingBottom:"20px"}}>Add a New Movie !!</h2><Form
            validateTrigger="onSubmit"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
        >
            <Form.Item name="title"
                onChange={handleValues}
                style={{ color: "#000" }}
                label="Movie Title"
                rules={[{ required: true, message: 'Please input Movie Title' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="genre"
                onChange={handleValues}
                style={{ color: "#000" }}
                label="Genre"
                rules={[{ required: true, message: 'Please input Movie Genre' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="Summary"
                onChange={handleValues}
                style={{ color: "#000" }}
                label="Summary"
                rules={[{ required: true, message: 'Please input Movie Summary' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="image" label="Movie Image" rules={[
                {
                    required: true,
                    message: 'Please upload Movie Image',
                },
            ]}  >
                <Upload action="/upload.do"
                     customRequest={customRequest}
                    showUploadList={false} listType="picture-card">
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
            <Form.Item name="content"
                onChange={handleValues}
                style={{ color: "#000" }}
                label="Movie Description"
                rules={[{ required: true, message: 'Please input Movie Description' }]}>
                <FroalaEditor
                    config={{
                        pluginsEnabled: ['charCounter'],
                        charCounterCount: true,
                        charCounterMax: 15,
                        theme: 'dark',
                    }}
                    height="600"
                      onModelChange={handleContent}
                      model={PostDetails.content}
                    style={{ color: "#fff" }}
                />

            </Form.Item>
            <Form.Item
            style={{display:"flex", justifyContent:"center"}}>
                    <Button onClick={handleSubmit} type='primary'>Submit</Button>
            </Form.Item>
        </Form></div>
    )
}

export default NewPost