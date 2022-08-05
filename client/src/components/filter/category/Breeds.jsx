import { useSelector } from "react-redux"

import s from '../filter.module.css'

export default function Breeds({ updateFilters, filters }) {

    

    const { breeds } = useSelector(state => state)

    const breedModified = [...breeds, {name:"unknown"}]
    // breeds.push({
        
    // })

    return (
        <div className={s.grid_breeds}>
            {
                breedModified.map((b, i) => {
                    return (
                        <div key={i}>
                            <a 
                            className={filters.breed !== b.name? s.a: `${s.a} ${s.click}`} 
                            href="!#" 
                            onClick={(e) => {
                                updateFilters(e, b.name, "breed")
                                // setClick(b)
                                }}>{b.name}</a>
                        </div>

                    )
                })
            }
        </div>
    )
}