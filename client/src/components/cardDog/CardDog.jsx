import { Link } from 'react-router-dom'
import s from './CardDog.module.css'

// recibe por props todos los datos que va renderizar
export default function CardDog(props) {

    const {data} = props
    return (
        <div className={s.container}>
            {
                // si el array no esta vacio renderizara cada uno de los datos del array
                data.length ? data.map(d => {
                    
                    return (
                        <Link key={d.id} className={s.link} to={`/detail/${d.id}`}>
                            <div key={d.id} className={s.card}>
                            <img src={d.image} alt={d.name} width="200" height="200"/>
                            <h2>{d.name}</h2>
                            <h3>Temperaments</h3>
                            <p>{d.temperaments}</p>
                            <h3>Breed Group</h3>
                            <p>{d.breed_group}</p>
                        </div>
                        </Link>
                        
                    )
                }): 
                // si llega un array vacio es porque se hiso una busqueda de un dato que no existe
                <h1 className={s.not}>Not Found</h1>
            }

        </div>
    )
}