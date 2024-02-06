import React,{useState} from 'react'
import { Button,DatePicker,Form,Input,Radio,Spin,Upload, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signin = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const [Loading, setLoading] = useState(null)
    const [UserDetails, setUserDetails] = useState(null)
    const navigate = useNavigate()
    const handleValues =(e)=>{
        setUserDetails({...UserDetails, [e.target.id]:e.target.value})
    }
    const handleSubmit = async () => {
        setLoading("SigninLoading")
        try {
            const res = await axios.post("http://localhost:9000/api/admin", UserDetails)
            console.log(res)
            if (res.status === 200) {
                message.success('User Login Successfully!');
                const token = res.data.token
                const userid = res.data.user._id
                const username = res.data.user.username
                const type = res.data.type
                console.log(token)
                localStorage.setItem("token", token)
                localStorage.setItem("userid", userid)
                localStorage.setItem("username", username)
                localStorage.setItem("type", type)
                navigate('/admin/home')
            }
            setLoading(null)


        } catch (error) {
            const errormsg = error.response.data.message
            message.error(error.response.data.message);
            setLoading(null)
            console.log(error)
        }
    }
    return (
        <div>
            <div className='signin'>
                <div style={{width:"500px", display:"flex", alignItems:"center", flexDirection:"column", backgroundColor:" rgba(41, 41, 41, 0.713)", padding:"55px 0", borderRadius:"15px"}}>
                    <h2 style={{ color: "#fff", textAlign: "center", borderBottom: "4px solid #fff", paddingBottom: "10px", fontSize: "30px" }}>Loginn Your Account !!</h2><br />
                    <Form
                        validateTrigger="onSubmit"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                    >
                        <Form.Item name="email"
                        onChange={handleValues}
                            label="Email"
                            rules={[{ required: true, message: 'Please input your Email' }]}>
                            <Input style={{background:"none", color:"#fff"}} />
                        </Form.Item>
                        <Form.Item name="password"
                            label="Password"
                            onChange={handleValues}
                            rules={[{ required: true, message: 'Please input your Password' }]}>
                            <Input style={{background:"none", color:"#fff"}} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType='submit' onClick={handleSubmit}>Login </Button>
                        </Form.Item>
                    </Form>
                    {Loading === "SigninLoading" &&<>
                    <p style={{color:"#fff"}}>Loading... <Spin/></p><br/>
                    </>}
                    <p style={{color:"#fff"}}>Dont Have an Account <Link to="/signup">SignUp</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signin