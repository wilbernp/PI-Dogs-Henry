import {
    CLEAR_DETAIL,
    GET_BREEDS,
    GET_DETAIL,
    GET_DOGS,
    GET_DOG_SEARCH,
    GET_FILTER,
    GET_TEMPERAMENTS,
    IS_LOADING,
    ORDER_BY_ALPHABET,
    ORDER_BY_WEIGHT,
    SWITCH_FILTER,
    SET_ERROR,
    SET_CURRENT_PAGE,
    CLEAR_FILTER,
    GET_RESULT_SEARCH,
    GET_SEARCH
} from "./actionTypes"

const URL = 'https://dogs-server-henry.herokuapp.com/api/dogs'
export function getDogs() {
    return (dispatch) => {
        dispatch({ type: IS_LOADING })
        return fetch(URL)
            .then(res => res.json())
            .then(json => {
                return dispatch({
                    type: GET_DOGS,
                    payload: json
                })
            })
            .catch(() => {
                dispatch({
                    type: SET_ERROR
                })
            })
    }
}

export function getDogSearch(input) {
    return {
        type: GET_DOG_SEARCH,
        payload: input
    }

}

export function getSearch(input) {
        return (dispatch) => {
            dispatch({ type: IS_LOADING })
        return fetch(`${URL}?name=${input}`)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: GET_SEARCH,
                    payload: json
                })
            })
            .catch(() => {
                dispatch({
                    type: SET_ERROR
                })
            })
    }
}

export function getResultSearch(input) {
    return (dispatch) => {
        return fetch(`${URL}?name=${input}`)
            .then(res => res.json())
            .then(json => {
                dispatch({
                    type: GET_RESULT_SEARCH,
                    payload: json
                })
            })
            .catch(() => {
                dispatch({
                    type: SET_ERROR
                })
            })
    }
}

export function getFilter({ temperament, breed }) {
    return {
        type: GET_FILTER,
        temperament,
        breed
    }
}

export function orderByAlphabet(order) {
    return {
        type: ORDER_BY_ALPHABET,
        order
    }
}

export function orderByWeight(order) {
    return {
        type: ORDER_BY_WEIGHT,
        order
    }
}

export function switchFilter() {
    return {
        type: SWITCH_FILTER
    }
}


export function getTemperaments() {
    return (dispatch) => {
        return fetch("https://dogs-server-henry.herokuapp.com/api/temperaments")
            .then(res => res.json())
            .then(json => {
                return dispatch({
                    type: GET_TEMPERAMENTS,
                    payload: json
                })
            })
    }
}

export function getDetail(id) {

    return (dispatch) => {
        dispatch({
            type: IS_LOADING
        })
        return fetch(`https://dogs-server-henry.herokuapp.com/api/dogs/${id}`)
            .then(res => res.json())
            .then(json => {
                return dispatch({
                    type: GET_DETAIL,
                    payload: json
                })
            })
    }
}


export function clearFilter() {
    return {
        type: CLEAR_FILTER
    }
}
export function getBreeds() {
    return (dispatch) =>{
        return fetch("https://dogs-server-henry.herokuapp.com/api/breeds")
        .then(res => res.json())
        .then(json => {
            return dispatch({
                type: GET_BREEDS,
                payload: json
            })
        })
    }
}

export function clearDetail() {
    return {
        type: CLEAR_DETAIL
    }
}

export function setCurrentPage(page) {
    return {
        type: SET_CURRENT_PAGE,
        payload: page
    }
}


