import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDogSearch, getResultSearch, getSearch } from '../../redux/actions/actions.js'
import s from './searchBar.module.css'

export default function SearchBar() {
    let [input, setInput] = useState("")
    let [hidden, setHidden] = useState(true)
    let [index, setIndex] = useState(-1)
    let [position, setPosition] = useState(true)
    let [selectTextInput, setSelectTextInput] = useState(false)
    

    let liRef = useRef(null)
    let inputRef = useRef(null)

    let { results } = useSelector(state => state)

    let dispatch = useDispatch()

    function handleChange(e) {
        let value = e.target.value
        setInput(value)
        dispatch(getResultSearch(value))
        setHidden(false)
        setIndex(-1)
        setSelectTextInput(false)

    }

    function handleClick(name) {
        
        dispatch(getDogSearch(name))
        setSelectTextInput(true)
        setHidden(true)
        setInput(name)        
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (index < 0) {
            dispatch(getSearch(input))
        } else {
            dispatch(getDogSearch(input))
        }
        setHidden(true)
        setSelectTextInput(true)
    }

    function handleKeyDown(e) {
        let { key } = e
        switch (key) {
            case "ArrowDown":
                if (index < results.length - 1 && input.length) {
                    setIndex(prev => {
                        return prev + 1
                    })
                    setPosition(true)
                    setHidden(false)
                }

                break
            case "ArrowUp":
                if (index > 0 && input.length) {
                    setIndex(prev => {
                        return prev - 1
                    })
                }
                setPosition(false)
                setHidden(false)

                break
            default:
                break
        }

    }

   

    useEffect(() => {
        if (results.length && index > -1) {
            setInput(results[index].name)
        }
        if (liRef.current) {
            liRef.current.scrollIntoView(position)
        }
        if (inputRef.current !== null && selectTextInput) {
            inputRef.current.setSelectionRange(0, input.length)
        }
    

    }, [index, selectTextInput, input])

    return (
        <div
            tabIndex={1}
            onFocus={(e) => {
                if (e.currentTarget !== e.target) {
                    setHidden(false)
                } 
            }}
            onBlur={(e) => {
                if (e.currentTarget === e.target) {
                    setHidden(true)
                }
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setHidden(true)
                }
            }}

        >
            <form onSubmit={handleSubmit} >
                <div className={s.dropdown}>
                    <input
                        ref={inputRef}
                        placeholder='Search...'
                        onChange={e => handleChange(e)}
                        onKeyDown={handleKeyDown}
                        autocomplete="off"
                        type="text"
                        name="input"
                        value={input}
                        className={s.input}
                    />
                    <div className={!hidden && input.length ? `${s.show} ${s.dropdown_content}` : s.dropdown_content}>
                        <ul className={s.content}>

                            {
                                results.length ? results.map((r, i) => {
                                    return (
                                        <li ref={index === i ? liRef : null} key={r.id}>
                                            <a onClick={() => handleClick(r.name)} className={i === index ? `${s.a} ${s.selected}` : s.a} >{r.name}</a>
                                        </li>
                                    )
                                }) : <h1 className={s.not_found}>Not Found</h1>
                            }
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    )
}


