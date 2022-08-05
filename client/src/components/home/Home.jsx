import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { clearFilter, getBreeds, getDogs, getTemperaments, setCurrentPage } from '../../redux/actions/actions.js'
import CardDog from '../cardDog/CardDog'
import Paginate from '../pagination/Paginate'
import ErrorHome from '../error/ErrorHome'


import s from './home.module.css'
import Nav from '../nav/Nav'
import Loading from '../loading/Loading'

export default function Home() {
    let [minLimit, setMinLimit] = useState(1)
    let [maxLimit, setMaxLimit] = useState(6)

    let dispatch = useDispatch()
    const { dogs, loading, filter, isFilter, error, currentPage } = useSelector((state) => state)

    useEffect(() => {
        if (filter.length) {
            dispatch(clearFilter())
        }
        dispatch(getDogs())
        dispatch(getTemperaments())
        dispatch(getBreeds())
    }, [])

    // useEffect(() => {
        
    // }, [dogs])

    const data = filter.length || isFilter ? filter : dogs
    const dogsPage = 8
    const end = currentPage * dogsPage
    const start = end - dogsPage
    const dogsFiltered = data.length && data.slice(start, end)
    const totalDogs = filter.length ? filter.length : dogs.length
    const totalPages = totalDogs > 7 ? Math.ceil(totalDogs / dogsPage) : 1

    function handleClick(page) {
        if (totalPages > maxLimit) {
            if (page >0 && page<4) {
                setMinLimit(1)
                setMaxLimit(6)
                dispatch(setCurrentPage(page))
                
                return
            }
            if (page <= totalPages && page > (totalPages - 4)) {
                setMinLimit(totalPages - 6)
                setMaxLimit(totalPages - 1)
                dispatch(setCurrentPage(page))
                return
            }
        }


        if (page > currentPage) {
            if ((page - minLimit) === 4) {
                setMinLimit(minLimit + 1)
                setMaxLimit(maxLimit + 1)
            } else if (page - minLimit === 5) {
                setMinLimit(minLimit + 2)
                setMaxLimit(maxLimit + 2)
            }
        } else if (page < currentPage) {
            if ((page - minLimit) === 2) {
                setMinLimit(minLimit - 1)
                setMaxLimit(maxLimit - 1)
            } else if ((page - minLimit) === 1) {
                setMinLimit(minLimit - 2)
                setMaxLimit(maxLimit - 2)
            }
        }

        dispatch(setCurrentPage(page))
    }

    return (
        <div>
            <header>
                <Nav />
            </header>
            <div>
                {
                    !loading ? <div>
                        {
                            !error ? <div>
                                <CardDog data={dogsFiltered} />
                            </div> : <ErrorHome/>
                        }
                    </div> : <Loading />
                }
                {
                    !loading && data.length? <div className={s.flex}>
                    <Paginate
                        totalPages={totalPages}
                        minLimit={minLimit}
                        maxLimit={maxLimit}
                        handleClick={handleClick}
                    />
                </div>:null
                }
            </div>

        </div>
    )
}