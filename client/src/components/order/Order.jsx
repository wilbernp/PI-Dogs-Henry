import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { orderByAlphabet, orderByWeight, setCurrentPage } from "../../redux/actions/actions.js"
import Alphabet from "./category/Alphabet"
import Weight from "./category/Weight"
import s from './order.module.css'

export default function Order() {

    let [alphabet, setAlphabet] = useState("")
    let [weight, setWeight] = useState("")

    let dispatch = useDispatch()

    useEffect(() => {
        if (alphabet.length) {
            dispatch(orderByAlphabet(alphabet))
        } else if (weight.length) {
            dispatch(orderByWeight(weight))
        }
        dispatch(setCurrentPage(1))
    }, [alphabet, weight])

    function updateOrder(e, name, category) {
        e.preventDefault()
        if (category === "alphabet") {
            setAlphabet(name)
            setWeight("")
        } else if (category === "weight") {
            setWeight(name)
            setAlphabet("")
        }
    }
    return (
        <>
            <div className={s.dropdown}>
                <button className={s.dropbtn}>{!alphabet?"Alphabet":alphabet}</button>
                <div className={s.dropdown_content}>
                    <Alphabet
                        updateOrder={updateOrder}
                        alphabet={alphabet}
                    />
                </div>
            </div>

            <div className={s.dropdown}>
                <button className={s.dropbtn}>{!weight?"Weight":weight}</button>
                <div className={s.dropdown_content}>
                    <Weight
                        updateOrder={updateOrder}
                        weight={weight}
                    />
                </div>
            </div>


        </>
    )
}