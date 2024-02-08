import React, { useEffect, useState } from 'react'
import { Button, Popconfirm, Space, Spin, Table, Tag, message, Form, Input, Upload, Pagination } from 'antd';
import axios from 'axios';
import FroalaEditor from 'react-froala-wysiwyg';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Column, ColumnGroup } = Table;
const AllPosts = () => {
    const [postData, setPostData] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [EditingPost, setEditingPost] = useState()
    const [messageApi, contextHolder] = message.useMessage();
    const [Loading, setLoading] = useState(false)
    const [UploadedImg, setUploadedImg] = useState(null)
    const [PostDetails, setPostDetails] = useState({
        content: "",
    })
    const navigate = useNavigate()

    const loadPosts = async () => {
        try {
            setLoading(true)
            const res = await axios.get("http://localhost:9000/api/admin/allposts")
            setPostData(res.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    useEffect(() => {
        loadPosts()
    }, [])
    const sortedData = [...postData].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    const data = sortedData.map(post => ({
        key: post._id,
        pic: post.image || '',  // Assuming image is the property you want to display for 'pic'
        Name: post.title || '',
        Summary: post.Summary || '',
        content: post.content || '',
        PublishingDate: post.createdAt ? post.createdAt.split('T')[0] : '',
        Genre: post.genre || '',
        image: post.image || ''
    }))

    const handleDelete = async (record) => {
        // console.log(record)
        const postId = record._id
        try {
            const res = await axios.delete(`http://localhost:9000/api/admin/post/${postId}`)
            if (res.status === 200) {
                message.success("Post Has Been Deleted !!")
                loadPosts()
            }
        } catch (error) {
            console.log(error)
            message.error("Post Delete Failed !!")
        }
    }
    const editPost = async (record) => {
        setEditingPost(record)
        setEditMode(true)
    }


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
                setEditingPost({ ...EditingPost, ["image"]: imageURL })

            } else {

                onError(response.statusText);
            }
        } catch (error) {

            console.error('Error uploading image: ', error);
        }
    };
    const handleValues = (e) => {
        setEditingPost({ ...EditingPost, [e.target.id]: e.target.value })
        console.log(EditingPost)
    }
    const handleContent = (e) => {
        setEditingPost({ ...EditingPost, "content": e })
    }
    const submitEditedValues = async () => {

        const postId = EditingPost._id
        try {
            setLoading("editpost")
            const res = await axios.put(`http://localhost:9000/api/admin/post/${postId}`, EditingPost)
            console.log(res)
            if (res.status === 200) {
                message.success("Post Updated SucessFully")
                setLoading(false)
                setEditMode(false)
                loadPosts()
            }

        } catch (error) {
            console.log(error)
            message.success("Error Updating Failed")

            setLoading(false)
            setEditMode(false)
        }
    }
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const onPageChange = (page, pageSize) => {
        setCurrentPage(page);
    };

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const displayedData = sortedData.slice(start, end);
    return (
        <div>

            <h2 style={{ textAlign: "center" }}>All Movie Posts</h2><br />

            {editMode ? (<>
                {console.log(EditingPost)}

                <div className='newpost'>
                    <h2 style={{ textAlign: "center", paddingBottom: "20px" }}>Editing A Movie !!</h2><Form
                        validateTrigger="onSubmit"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                    >
                        {Loading === "editpost" && <>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Spin size='large' /><br /><br /><br />
                            </div>
                        </>}
                        <Form.Item name="title"
                            onChange={handleValues}

                            style={{ color: "#000" }}
                            label="Movie Title"
                            initialValue={EditingPost.title}
                            rules={[{ required: true, message: 'Please input Movie Title' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="genre"
                            onChange={handleValues}
                            style={{ color: "#000" }}
                            label="Genre"
                            initialValue={EditingPost.genre}

                            rules={[{ required: true, message: 'Please input Movie Genre' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="Summary"
                            onChange={handleValues}
                            style={{ color: "#000" }}
                            label="Summary"
                            initialValue={EditingPost.Summary}

                            rules={[{ required: true, message: 'Please input Movie Summary' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="video"
                            onChange={handleValues}
                            style={{ color: "#000" }}
                            label="video"
                            initialValue={EditingPost.video}

                            rules={[{ required: true, message: 'Please input Movie Link (Youtube)' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="image" label="Movie Image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please upload Movie Image',
                                },
                            ]}   >
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
                                        <img style={{ width: "80px", borderRadius: "5px", height: "80px" }} src={UploadedImg} />
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
                                model={EditingPost.content}
                                style={{ color: "#fff" }}
                            />

                        </Form.Item>
                        <Form.Item
                            style={{ display: "flex", justifyContent: "center" }}>
                            <Button onClick={submitEditedValues} type='primary'>Submit</Button>
                        </Form.Item>
                    </Form></div>
            </>) : (<>
                {Loading && <>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Spin size='large' /><br /><br /><br />
                    </div>
                </>}
                <Table pagination={false}  dataSource={displayedData}>
                    <Column
                        title="Featured Image"
                        dataIndex="pic"
                        render={(text, record) => (
                            <img style={{ width: "75px" }} src={record.image} />
                        )}
                    />
                    <Column
                        title="Name"
                        dataIndex="Name"
                        render={(text, record) => (
                            <p style={{width:"100px"}}>{record.title}</p>
                        )}
                    />
                    <Column
                        title="Summary"
                        dataIndex="Summary"
                        
                        render={(text, record) => (
                            <p style={{width:"300px"}}>{record.Summary}</p>
                        )}
                    />
                    <Column
                        title="Publishing Date"
                        dataIndex="PublishingDate"
                        render={(text, record) => (
                            <p>{record.createdAt.split("T")[0]}</p>
                        )}
                    />
                    <Column
                        title="Last Update"
                        dataIndex="LastUpdate"
                        render={(text, record) => (
                            <p>{record.updatedAt.split("T")[0]}</p>
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <Button primary onClick={() => editPost(record)}>Edit</Button>

                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => handleDelete(record)}
                                >
                                    <Button danger>Delete</Button>
                                </Popconfirm>
                            </Space>
                        )}
                    />
                </Table>
                <Pagination
                    onChange={onPageChange}
                    defaultCurrent={1}
                    total={sortedData.length}
                    pageSize={pageSize}
                />
            </>)}


        </div>
    )
}

export default AllPosts