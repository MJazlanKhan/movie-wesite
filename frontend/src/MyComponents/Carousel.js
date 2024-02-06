import React from 'react'
const images =[
    'C:/Users/User/Desktop/Downloads/pxfuel.jpg',
    // 'C:/Users/User/Desktop/Downloads/pxfuel.jpg',
    // 'C:/Users/User/Desktop/Downloads/pxfuel.jpg',

  ];
const Carousel = () => {
  return (
    <div>
         <Carousel >
        {images.map(img => (
          <div key={img}>
            <div style={{height: '160px', backgroundImage: `url(${img})`, backgroundSize: 'cover'}}></div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Carousel