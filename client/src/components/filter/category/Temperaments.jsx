import { useSelector } from "react-redux"
import s from '../filter.module.css'


export default function Temperaments({ updateFilters, filters }) {

    const { temperaments } = useSelector(state => state)

    return (
        <div className={s.grid_temp}>
            {
                temperaments.map(t => {
                    return (
                        <div key={t.id}>
                            <a 
                            className={filters.temperament !== t.name? s.a: `${s.a} ${s.click}`} 
                            href="!#" onClick={(e) => {
                                updateFilters(e, t.name, "temperament")
                                }}>{t.name}</a>
                        </div>
                    )
                })
            }
        </div>

    )
}