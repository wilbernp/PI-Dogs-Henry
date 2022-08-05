import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { clearDetail, getDetail } from "../../redux/actions/actions.js"
import Loading from "../loading/Loading"
import s from './detail.module.css'

export default function Detail() {
    let { id } = useParams()
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetail(id))

        return () => {
            dispatch(clearDetail())
        }
    }, [])

    let { dogDetail, loading } = useSelector(state => state)
    let { image, name, height, weight, life_span, temperaments, breed_group } = dogDetail
    return (
        <div>
            {
                loading? <Loading/>:<div className={s.flex}>
                    <div className={s.home}>
                        <Link to="/home" className={s.link}>Go Home</Link>
                    </div>

                    <div className={s.container}>
                        <div className={s.flex_items}>
                            <div >
                                <img className={s.img} src={image} alt={name} />
                            </div>

                            <div className={s.info}>
                                <h1>{name}</h1>

                                <h3>breed group: {breed_group}</h3>
                                <h3>height: {height} cm</h3>
                                <h3>weight: {weight} kg</h3>
                                <h3>life span: {life_span}</h3>
                                <div className={s.temp}>
                                    <h3>Temperaments: </h3>
                                    <h4>{temperaments}</h4>
                                </div>

                            </div>
                        </div >

                    </div>


                </div>
            }
        </div>


    )
}