import { useState } from "react"


export default function CheckBox({id, isChecked, name}){

    const [check, setCheck] = useState(false)

    function handleCheck(checked){
         setCheck(checked)
         isChecked(id, checked, name)
    }

    return(
        <div>
        
        <label><input type="checkbox" onChange={(e) => handleCheck(e.target.checked)} checked={check} />{name}</label>
        </div>
    )
}