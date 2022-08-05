import s from '../order.module.css'


export default function Weight({ updateOrder, weight }) {

    const orders = ["min", "max"]
    return (
        <div className={s.grid}>
            {
                orders.map((order, i) => {
                    return (
                        <div key={i}>
                            <a className={weight !== order? s.a: `${s.a} ${s.click}`} href="!#" onClick={(e) => updateOrder(e, order, "weight")}>{order}</a>
                        </div>

                    )
                })
            }
        </div>
    )
}