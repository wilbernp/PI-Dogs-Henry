import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getFilter, setCurrentPage, switchFilter} from "../../redux/actions/actions.js"
import Breeds from "./category/Breeds"
import Temperaments from "./category/Temperaments"
import s from './filter.module.css'

export default function Filter() {

    const dispatch = useDispatch()

    let [filters, setFilters] = useState({})

    useEffect(()=>{
        dispatch(getFilter(filters))
        dispatch(setCurrentPage(1))
        console.log('desde filter')
    }, [filters])

    function updateFilters(e, filter, category){
        e.preventDefault()
        setFilters({[category]: filter})
        dispatch(switchFilter())
    }
    return(
        <>
         <div className={s.dropdown}>
                <button className={s.dropbtn}>{!filters.temperament?"Temperaments":filters.temperament}</button>
                <div className={`${s.dropdown_content} ${s.content_temp}`}>
                <Temperaments 
                    updateFilters={updateFilters}
                    filters={filters}
                    />
                </div>
         </div>
         <div className={s.dropdown}>
                <button className={s.dropbtn}>{!filters.breed?"Breed Groups":filters.breed}</button>
                <div className={`${s.dropdown_content} ${s.content_breeds}`}>
                    <Breeds 
                    updateFilters={updateFilters}
                    filters={filters}
                    />
                </div>
         </div>
            
        </>
    )
}


    // let [disable, setDisable] = useState({
    //     temperaments: true,
    //     breeds: true
    // })

    // let [filters, setFilters] = useState({
    //     temperaments: "",
    //     breeds: ""
    // })


    // // console.log(breeds)

    // let dispatch = useDispatch()

    // useEffect(()=>{
    //     dispatch(getFilter(filters))
    // }, [filters])

    // function handleLink(e) {
    //     e.preventDefault()
    //     console.log(e.target.name)
    //     console.log(disable)
    //     setDisable((prev) => {
    //         return{
    //             ...prev,
    //             [e.target.name]: !prev[e.target.name]
    //         }
    //     })
    // }

    // function changeFilter(e, name, category) {
    //     e.preventDefault()
    //     setFilters((prev) => {
    //         return{
    //             ...prev,
    //             [category]: name
    //         }
    //     })
    // }

    // function render(value, category){
    //     return value && value.map(v => {
    //         return (
                // <p>
                //     <a href="!#" onClick={(e) => changeFilter(e, v.name, category)}>{v.name}</a>
                // </p>
    //         )
    //     })
    // }

    // return (
    //     <div>
    //         {/* {
    //             filter && (
    //                 <div>
    //                     {filter}
    //                 </div>
    //             )
    //         } */}
    //         <a name="temperaments" href="!#" onClick={handleLink}>temperaments</a>
    //         {
    //             !disable.temperaments && render(temperaments, "temperaments")
    //         }
    //         <br />
    //         <a name="breeds" href="!#" onClick={handleLink}>breeds</a>
    //         {
                
    //             !disable.breeds && render(dogs, "breeds")
    //         }
    //     </div>
    // )