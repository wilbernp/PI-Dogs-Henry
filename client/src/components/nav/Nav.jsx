import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearFilter, getDogs } from '../../redux/actions/actions.js'
import Filter from '../filter/Filter'
import Order from '../order/Order'
import SearchBar from '../searchBar/SearchBar'
import s from './nav.module.css'
export default function Nav() {

    let [prevScroll, setPrevScroll] = useState(0)

    let dispatch = useDispatch()

    function handleClick(){
        dispatch(getDogs())
        dispatch(clearFilter())
    }

    useEffect(() => {
        window.addEventListener('scroll', ()=>{
            setPrevScroll(window.scrollY)
        })
    },[prevScroll])
    return (
        <nav className={prevScroll >30?`${s.navbar} ${s.hidden}`:s.navbar}>
            <div>
                <Link onClick={handleClick} className={s.link} to='/home'>Home</Link>
                <Link className={s.link} to='/createDog'>Create dog</Link>
            </div>

            <div className={s.container}>
                <Filter />
                <Order />
            </div>
            <div className={s.search}>
                <SearchBar />
            </div>
        </nav>
    )
}