import image from './dogs.jpg'
import s from './landing.module.css'
import {Link} from 'react-router-dom'
export default function Landing() {
  return (

      <div className={s.container}>
        <div className={s.text}>
          
          <h3>Welcome To</h3>
          <h1>PI Dogs Henry</h1>
         <Link to='/home'>Go To Home</Link>
        </div>
        <div>
          <img className={s.img} src={image} alt="" />
        </div>
      </div>

  )
}