import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getBreeds, getTemperaments } from "../../redux/actions/actions.js"
import s from './createDog.module.css'
import left from './left.png'

export default function CreateDog() {

    const obj = {
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        min_life_span: "",
        max_life_span: "",
        image: "",
        temperaments: [],
        breedId:null
    }

    const arr = [
        "name",
        "min_height",
        "max_height",
        "min_weight",
        "max_weight",
        "min_life_span",
        "max_life_span",
        "image"
    ]

    let [input, setInput] = useState(obj)

    let [error, setError] = useState(true)

    let [msg, setMsg] = useState(obj)

    let [correct, setCorrect] = useState(obj)

    let [options, setOptions] = useState([])

    let dispatch = useDispatch()

    let { temperaments, breeds } = useSelector(state => state)

    let keys = []

  
    function validate(key, msg_p, correctMsg_p) {
        let length = input.temperaments.length

   
        let msg = key !== "temperaments" ? `${key.replaceAll("_", " ")} ${msg_p}`: msg_p

        let correctMsg = `${key.replaceAll("_", " ")} ${correctMsg_p}`

        
        if (key === "temperaments") {
            if (length>1) {
                correctMsg = `${length} selected temperaments`

            } else if(length === 1){
                correctMsg = `1 selected temperament`
            }
        }

        if (msg_p) {
            keys.push(key)

            setError(true)
            correctMsg = ""

        } else {
            msg = ""

            setError(false)

        }

        if (keys.length) {
            setError(true)
        } 

        if (key === "image" && !input.image.length) {
            correctMsg = ""
        }

        setMsg((prev) => {
            return {
                ...prev,
                [key]: msg
            }
        })

        setCorrect((prev) => {
            return {
                ...prev,
                [key]: correctMsg
            }
        })
    }

    useEffect(() => {
        dispatch(getTemperaments())
        dispatch(getBreeds())
    }, [])

    useEffect(() => {
        for (const key in input) {

            if (key === "breedId") {
                return
            }
            
            if (!input[key].length && key !== "image") {
                let msg = key !== "temperaments" ? "is required" : "select at least one temperament"

                validate(key, msg)

            } else if (key !== "name" && key !== "temperaments" && key !== "image") {
                if (isNaN(Number(input[key]))) {
                    let msg = "must be a numeric value"
                    validate(key, msg)
                } else if (key.includes("min")) {
                    if (input[key] < 1) {
                        let msg = "must be greater than 0"
                        validate(key, msg)
                    } else if (input[key.replace("min", "max")].length && input[key] === input[key.replace("min", "max")]) {
                        let msg = `cannot be equal to ${key.replace("min", "max").replaceAll("_", " ")}`
                        validate(key, msg)
                    } else if (input[key.replace("min", "max")].length && Number(input[key]) > Number(input[key.replace("min", "max")])) {
                        let msg = `cannot be greater than ${key.replace("min", "max").replaceAll("_", " ")}`
                        validate(key, msg)
                    } else {
                        let msgCorrect = "is correct"
                        validate(key, null, msgCorrect)
                    }
                }
                else if (key.includes("max")) {
                    if (input[key] < 2) {
                        let msg = "must be greater than 1"
                        validate(key, msg)
                    } else if (input[key.replace("max", "min")].length && input[key] === input[key.replace("max", "min")]) {
                        let msg = `cannot be equal to ${key.replace("max", "min").replaceAll("_", " ")}`
                        validate(key, msg)
                    } else if (input[key.replace("max", "min")].length && Number(input[key]) < Number(input[key.replace("max", "min")])) {
                        let msg = `cannot be less than ${key.replace("max", "min").replaceAll("_", " ")}`
                        validate(key, msg)
                    } else {
                        let msgCorrect = "is correct"
                        validate(key, null, msgCorrect)
                    }

                } else {
                    let msgCorrect = "is correct"
                    validate(key, null, msgCorrect)
                }
            } else if (key === "name") {
                let test1 = /\d/.test(input.name)
                let test2 = /\W/.test(input.name)
                if (test1 && test2) {
                    let msg = "can't contain numbers or strange characters"
                    validate(key, msg)
                } else if (test1) {
                    let msg = "cannot contain numbers"
                    validate(key, msg)
                } else if (test2) {
                    let msg = "cannot contain foreign characters"
                    validate(key, msg)
                } else if (input.name.length < 3) {
                    let msg = "must contain at least three letters"
                    validate(key, msg)
                } else {
                    let msgCorrect = "is correct"
                    validate(key, null, msgCorrect)
                }
            } else if (key === "image" && input.image.length) {
                let testURL = /^(ftp|http|https):\/\/[^ "]+$/.test(input.image);
                if (!testURL) {
                    setMsg((prev) => {
                        return {
                            ...prev,
                            image: "must be a URL example https://www.images.com/image.png"
                        }
                    })
                } else {
                    let msgCorrect = "is correct"
                    validate(key, null, msgCorrect)
                }
            } else {
                let msgCorrect = "is correct"
                validate(key, null, msgCorrect)
            }

        }

    }, [input])

    function handleInputChange(e, option, data) {
        if (option === "temperaments") {
            let findtemp = temperaments.find(t => t.name === data)
            setInput((prev) => {
                return {
                    ...prev,
                    temperaments: [...prev.temperaments, findtemp]
                }
            })

            setOptions(prev => {
                return[
                    ...prev, data
                ]
            })

            return
        }

        if (option === "breeds") {

            let findbreed = breeds.find(b => b.name === data)
            setInput(prev => {
                return{
                    ...prev,
                    breedId: findbreed.id
                }
            })

            return
        }

       
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        };
        fetch('https://dogs-server-henry.herokuapp.com/api/dogs', requestOptions)
        .then(res => {
            if (res.status === 201) {
                alert(`dog ${input.name} created successfully`)

                setInput(obj)
                setOptions([])
            }        })
        .catch((error) =>{
            alert("oops! something has failed")
        })
        
    }


    function handleClick(e, temp) {
        e.preventDefault()
        setInput((prev) => {
            return {
                ...prev,
                temperaments: prev.temperaments.filter(t => t !== temp)
            }
        })
        setOptions((prev)=>{
            return prev.filter(op => op !== temp.name)
        })

    }

    return (

        <div className={s.container}>

            <div>
                <Link to="/home" className={s.go}><img src={left} width="64" height="64" alt="" /></Link>
            </div>
            <div className={s.form}>
                <h1>Create Dog</h1>
                <form onSubmit={handleSubmit}>
                    {
                        arr.map(e => {
                            return (
                                <>
                                    <div className={s.error}>
                                        {msg[e] && <p>{msg[e]}</p>}
                                        <div className={s.correct}>
                                            {correct[e] && <p>{correct[e]}</p>}
                                        </div>
                                    </div>

                                    <div className={s.flex}>
                                        <input
                                            className={msg[e] ? s.input_error : s.input}
                                            placeholder={e.replaceAll("_", " ")}
                                            type="text"
                                            name={e}
                                            autocomplete="off"
                                            value={input[e]}
                                            onChange={handleInputChange}
                                        />

                                    </div>
                                </>

                            )
                        })
                    }
                    <div className={s.error}>
                        {msg.temperaments && <p>{msg.temperaments}</p>}
                        <div className={s.correct}>
                            {correct.temperaments && <p>{correct.temperaments}</p>}
                        </div>
                    </div>
                    <div className={s.flex}>
                        <select onChange={(e) => handleInputChange(e, "temperaments", e.target.value)} name="temperaments" className={s.select} >
                            <option defaultValue="" disabled selected>Temperaments</option>
                            {temperaments.map((t, i) => (
                                <option
                                disabled={options.includes(t.name)}
                                    // onClick={(e) =>{ 
                                    //     console.log("temperaments")
                                    //     handleInputChange(e, "temperaments", t)}}
                                    value={t.name} key={i}
                                    className={s.option}>{t.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={s.flex}>
                        <select onChange={(e) => handleInputChange(e, "breeds", e.target.value)} name="breedId" className={s.select} >
                            <option defaultValue="" disabled selected>Breed Group</option>
                            {breeds.map((b, i) => (
                                <option
                                disabled={input.breedId === b.id}
                                    // onClick={(e) => {
                                    //     console.log("breeds"); 
                                    // handleInputChange(e, "breeds", b.id)}}
                                    value={b.name} key={i}
                                    className={s.option}>{b.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className={s.flex}>
                        <input className={error ? `${s.submit} ${s.disable}` : s.submit} type="submit" value="submit" disabled={error} />
                    </div>

                </form>
                <h3>Temperaments</h3>
                <div className={s.flex_temp}>
                    {
                        input.temperaments.length ? input.temperaments.map(t => {
                            return (
                                <div onClick={(e) => handleClick(e, t)} className={s.temp_container}>
                                    <div className={s.text}>X</div>
                                    <h5 className={s.link}>{t.name}</h5>
                                </div>
                            )
                        }) : null
                    }
                </div>
            </div>


        </div>
    )
}