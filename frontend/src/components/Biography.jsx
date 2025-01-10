import React from 'react'

const Biography = ({imageUrl}) => {
  return (
   <>
   <div className='container biography'>
    <div className="banner">
      <img src ={imageUrl} alt='biography' />
    </div>
    <div className="banner">
      <p>Biography
      </p>
      <h1>Who are we</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, ducimus facilis quae laboriosam dicta, voluptatibus reprehenderit repudiandae libero, expedita quas ex esse veritatis exercitationem neque explicabo distinctio temporibus quisquam molestiae.
      </p>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore ipsam doloribus fuga est alias culpa inventore soluta eum! Nam recusandae similique quos dicta corporis ad id optio asperiores dolor veniam.
      </p>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt eaque vero consectetur, delectus, similique, ullam ad quos sint placeat ducimus facere esse voluptatibus cumque! Et sed voluptate blanditiis reprehenderit sequi.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo doloremque harum eos fugit vero, perspiciatis sunt ut laudantium dolores veniam eius quis dicta quod sed debitis tenetur commodi quibusdam doloribus?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus illo consequatur quaerat, tempore cum eveniet delectus blanditiis enim soluta error nostrum saepe repellat praesentium dolor expedita, eius aperiam totam a!</p>
    </div>
   </div>
   </>
  )
}

export default Biography