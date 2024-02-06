import React, { useEffect, useState } from 'react';
import {
    FileDoneOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import AllPosts from '../MyComponents/AllPosts';
import NewPost from '../MyComponents/NewPost';
import { Link, useNavigate } from 'react-router-dom';
import Users from '../MyComponents/Users';

const { Header, Sider, Content } = Layout;
const AdminDashboard= () => {
  const navigate = useNavigate()
  const type = localStorage.getItem("type")

  const [Status, setStatus] = useState("AllPosts")
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  
  return (
    <>
    {type === 'admin' && <>
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
       <Link to="/"> <h1 style={{color:"#fff", textAlign:"center", padding:"15px 0", borderBottom:"4px solid #fff", marginBottom:"30px"}}>Mov<span style={{color:"#F2114E"}}>ine</span></h1></Link>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <FileDoneOutlined />,
              label: 'All Posts',
              onClick:()=>setStatus("AllPosts")

            },
            {
              key: '2',
              label: 'Add New Post',
              icon: <UploadOutlined />,
              onClick:()=>setStatus("newPost")
            },
            {
              key: '3',
              icon: <UserOutlined />,
              label: 'Users',
              onClick:()=>setStatus("Users")
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            // margin: '24px 16px',
            padding: 25,
            minHeight: "100vh",
            height:"100%",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {Status === "AllPosts" &&<>
          <AllPosts/>
          </>}
          {Status === "newPost" &&<>
          <NewPost/>
          </>}
          {Status === "Users" &&<>
          <Users/>
          </>}
        </Content>
      </Layout>
    </Layout>
    </>}
    {!type && <>
      {setTimeout(() => {
        navigate('/');
      }, 3000)}
      <h1>You are Not a Admin Redirecting you in 3 Seconds</h1>
    </>}
    </>
  );
};

export default AdminDashboard;