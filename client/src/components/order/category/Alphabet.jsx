import s from '../order.module.css'


export default function Alphabet({ updateOrder, alphabet }) {
    const orders = ["A-Z", "Z-A"]
    return (

        <div className={s.grid}>
            {
                orders.map((order, i) => {
                    return (
                        <div key={i}>
                            <a className={alphabet !== order? s.a: `${s.a} ${s.click}`} href="!#" onClick={(e) => updateOrder(e, order, "alphabet")}>{order}</a>
                        </div>

                    )
                })
            }
        </div>

    )
}