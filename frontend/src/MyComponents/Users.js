import React, { useEffect, useState } from 'react'
import { Button, Popconfirm, Space, Table, Tag, message } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;
const Users = () => {
    const [UserData, setUserData] = useState([])
    const [messageApi, contextHolder] = message.useMessage();

    const loadUsers = async () => {
        try {
            const res = await axios.get("https://movie-website-server.onrender.com/api/admin/allUsers")
            setUserData(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        loadUsers()
    }, [UserData])
    const sortedData = [...UserData].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt); 
        
      });
    const data = sortedData.map(User => ({
        key: User._id,
        pic: User.pic,
        Name: User.username,
        Phone: User.Phone,
        DOB: User.DOB,
        email: User.email,
        gender: User.gender,
        status:User.status
    }))
    const handleDisable = async (record) => {
        const userId = record.key

        try {
            const res = await axios.put(`https://movie-website-server.onrender.com/api/admin/user/disable/${userId}`)
            if (res.status === 200) {
                message.success("User Has Been Disabled !!")
                loadUsers()
            }
        } catch (error) {
            console.log(error)
            message.error("User Disabling Failed !!")
        }
    }
    const handleEnable =async (record)=>{
        const userId = record.key

    try {
        const res = await axios.put(`https://movie-website-server.onrender.com/api/admin/user/enable/${userId}`)
        if (res.status === 200) {
            message.success("User Has Been Disabled !!")
            loadUsers()
        }
    } catch (error) {
        console.log(error)
        message.error("User Disabling Failed !!")
    }
    }
    return (
        <div>

            <h2 style={{ textAlign: "center" }}>All Users Data</h2><br />
            <Table dataSource={data}>
                <Column
                    title="Featured Image"
                    dataIndex="pic"
                    render={(text, record) => (
                        <img style={{ width: "75px" }} src={record.pic} />
                        // <p>{record.pic}</p>
                    )}
                />
                <Column title="Name" dataIndex="Name" key="Name" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Phone Number" dataIndex="Phone" key="Phone" />
                <Column title="Date Of Birth" dataIndex="DOB" key="DOB"  />
                <Column title="Gender" dataIndex="gender" key="gender" />
                <Column title="Status" dataIndex="status" key="status" />

                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <>
                        {record.status === "Active" &&  <>
                        <Space size="middle">
                            <Popconfirm
                                title="Disable the User"
                                description="Are you sure to Disable this User?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => handleDisable(record)}
                                // onConfirm={() => console.log(record)}
                            >
                                <Button danger>Disable</Button>
                            </Popconfirm>
                        </Space>
                        </>}
                        {record.status === "Disabled" &&  <>
                        <Space size="middle">
                            <Popconfirm
                                title="Enable the User"
                                description="Are you sure to Enable this User?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => handleEnable(record)}
                                // onConfirm={() => console.log(record)}
                            >
                                <Button type='primary'>Enable</Button>
                            </Popconfirm>
                        </Space>
                        </>}
                        </>
                      
                    )}
                />
            </Table></div>
    )
}

export default Users