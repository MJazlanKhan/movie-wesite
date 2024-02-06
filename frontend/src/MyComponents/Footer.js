import { FacebookFilled, InstagramFilled, YoutubeFilled } from '@ant-design/icons'
import React from 'react'

const Footer = () => {
    return (
        <div>
            <hr /><br /><br /><br />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems:"center"}}>
                <div style={{ width: "30%", textAlign: "center" }}>
                    <h2 style={{ color: "#fff" }}>Social Links</h2><br />
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", gap: "10px", alignItems: "center" }}>
                        <FacebookFilled style={{ color: '#fff', fontSize: "40px" }} />
                        <InstagramFilled style={{ color: '#fff', fontSize: "40px" }} />
                        <YoutubeFilled style={{ color: '#fff', fontSize: "40px" }} />
                    </div><br />
                </div>
                <div style={{ width: "30%", textAlign: "center" }}>
                    <h1  style={{width:"100px",color:"#fff", borderBottom:"6px solid #fff"}}>Mov<span style={{color:"#F2114E"}}>ine</span></h1>
                </div>
            </div><br /><br /><br />
        </div>
    )
}

export default Footer