import React from 'react'
import "./Style.css"
import { BellOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Carousel, Dropdown, Menu, message } from 'antd'
import { Link, useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")
  const userid = localStorage.getItem("userid")
  const handleLogout = () => {

    try {
      localStorage.removeItem('userid')
      localStorage.removeItem('token')
      message.success(`Good Bye ${username}`)
      localStorage.removeItem('username')
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  const defaultmenu = (
    <Menu style={{ backgroundColor: "#010511", width: "150px" }}>
      <Menu.Item
        style={{
          color: "#fff",
          fontSize: "18px",
          height: "auto",
          lineHeight: "normal",
          padding: "6px 16px"
        }}
      >
        <Link to="/signup">Signup</Link>
      </Menu.Item>

      <Menu.Item
        style={{
          color: "#fff",
          fontSize: "18px",
          height: "auto",
          lineHeight: "normal",
          padding: "6px 16px"
        }}
      >
        <Link to="/signin">Login</Link>
      </Menu.Item>
    </Menu>
  );
  const signedItems = (
    <Menu style={{ backgroundColor: "#010511", width: "150px" }}>
      <Menu.Item
        style={{
          color: "#fff",
          fontSize: "18px",
          height: "auto",
          lineHeight: "normal",
          padding: "6px 16px"
        }}
        className='item'
      >
        <Link style={{ color: "#fff" }} to={`/user/wishlist/${userid}`}>My List</Link>
      </Menu.Item>

      <Menu.Item

        style={{
          color: "#fff",
          fontSize: "18px",
          height: "auto",
          lineHeight: "normal",
          padding: "6px 16px"
        }}
        className='item'
      >
        <Link to={`/user/settings/${userid}`}>Settings</Link>
      </Menu.Item>
      <Menu.Item

        style={{
          color: "#fff",
          fontSize: "18px",
          height: "auto",
          lineHeight: "normal",
          padding: "6px 16px"
        }}
        className='item'
      >
        <Link onClick={handleLogout}>Logout</Link>
      </Menu.Item>
    </Menu>
  );


  return (
    <div className='Header' >
      <div className='headerWrapper'>
        <header>
          <h1>Mov<span>ine</span></h1>
          <div className='menu'>
            <ul>
              {/* <li>Exclusive</li>
              <li>Trending</li> */}
              <li><Link style={{ color: "#fff", textDecoration: "none" }} to={`/user/settings/${userid}`}>Upcoming</Link></li>
              <li><Link style={{ color: "#fff", textDecoration: "none" }} to={`/user/wishlist/${userid}`}>Wishlist</Link></li>
            </ul>
            <div className='icons'>
              <SearchOutlined className='icon' />
              <BellOutlined className='icon' />
              {!token && <>
                <Dropdown overlay={defaultmenu} trigger={['hover']}>
                  <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
              </>}
              {token && <>
                <Dropdown overlay={signedItems} trigger={['hover']}>
                  <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
              </>}
            </div>
          </div>
        </header>
      </div>

      <section className='featuredinfo'>
        <h2 style={{ fontSize: "40px" }}>The Avengers</h2><br />
        <div className='flex'>
          <p>Genre :</p> <p>Epic</p> <p>Fantasy</p>
        </div><br />
        <div style={{ fontSize: "18px", lineHeight: "25px" }}>The Avengers is a British espionage television series, created in 1961, that ran for 161 episodes until 1969. It initially focused on David Keel (Ian Hendry),[5] aided by John Steed (Patrick Macnee). Hendry left after the first series; Steed then became the main character, partnered with a succession of assistants.
        </div><br />
        <Button shape="round" size='large' style={{ backgroundColor: "#ED1045", color: "#fff", border: "none" }}>Watch Now</Button>
      </section>
    </div>
  )
}

export default Header