import React from 'react'
import Header from '../MyComponents/Header'
import MoviesList from '../MyComponents/MoviesList'
import Footer from '../MyComponents/Footer'

const Home = () => {
  let username = localStorage.getItem("user")
  return (
    <div>

        <div style={{backgroundColor:"#010511", minWidth:"fit-content"}}>
          {console.log(username)}
            <Header/>
            <MoviesList/>
            <Footer/>
        </div>
    </div>
  )
}

export default Home