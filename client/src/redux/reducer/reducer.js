import {
    CLEAR_DETAIL,
    CLEAR_FILTER,
    GET_BREEDS,
    GET_DETAIL,
    GET_DOGS,
    GET_DOG_SEARCH,
    GET_FILTER,
    GET_RESULT_SEARCH,
    GET_SEARCH,
    GET_TEMPERAMENTS,
    IS_LOADING,
    ORDER_BY_ALPHABET,
    ORDER_BY_WEIGHT,
    SET_CURRENT_PAGE,
    SET_ERROR,
    SWITCH_FILTER
} from '../actions/actionTypes.js'


const initState = {
    dogs: [],
    temperaments: [],
    dogDetail: {},
    filter: [],
    breeds: [],
    results: [],
    isFilter: false,
    currentPage: 1,
    loading: true
}




export default function reducer(state = initState, action) {
    switch (action.type) {

        case CLEAR_FILTER:
            return{
                ...state,
                filter: [],
                isFilter: false
            }
        case IS_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_ERROR:
            return{
                ...state,
                error: true,
                loading: false
            }
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                loading: false
            }
        case GET_DOG_SEARCH:
            return {
                ...state,
                filter: state.results.filter(r => r.name === action.payload),
                loading: false,
                isFilter: true
            }
        case GET_RESULT_SEARCH:
            return{
                ...state,
                results: action.payload,
            }
        case GET_SEARCH:
            return{
                ...state,
                filter: action.payload,
                loading:false
            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case GET_FILTER:
            let filters = state.dogs.filter((d) => {
                // if (action.breed !== "" && action.temperament !== "") {
                //     return d.breeds === action.breed && d.temperaments && d.temperaments.includes(action.temperament)
                // } else 
                // new RegExp(action.temperament, "i").test(d.temperaments)
                if (action.temperament) {
                    return d.temperaments && d.temperaments.includes(action.temperament)
                } else if (action.breed) {
                    return d.breed_group === action.breed
                }
            })

            return {
                ...state,
                filter: [...filters]
            }

        case SWITCH_FILTER:
            return {
                ...state,
                isFilter: true
            }
        case ORDER_BY_ALPHABET:
            const dogsAlphabet = state.isFilter? state.filter: state.dogs
            if (action.order === "A-Z") {
                dogsAlphabet.sort((a, b) => {
                    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                        return 1;
                    }
                    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                dogsAlphabet.sort((a, b) => {
                    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
                        return 1;
                    }
                    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
                        return -1;
                    }
                    return 0;
                });
            }

            return {
                ...state,
                filter: [...dogsAlphabet]
            }

        case ORDER_BY_WEIGHT:
            let regex = /(\d+)/g;
            
            const dogsWeight = state.isFilter? state.filter: state.dogs
            if (action.order === "min") {
                dogsWeight.sort(function (a, b) {
                    let x =  a.weight.match(regex)
                    let y = b.weight.match(regex)
                    if (Number(x[0]) > Number(y[0]) && Number(x[1]) > Number(y[1])) {
                      return 1;
                    }
                    if (Number(x[0]) < Number(y[0]) && Number(x[1]) < Number(y[1])) {
                      return -1;
                    }
                    return 0;
                  })
            } else {
                dogsWeight.sort(function (a, b) {
                    let x =  a.weight.match(regex)
                    let y = b.weight.match(regex)
                    if (Number(x[0]) < Number(y[0]) && Number(x[1]) < Number(y[1])) {
                      return 1;
                    }
                    if (Number(x[0]) > Number(y[0]) && Number(x[1]) > Number(y[1])) {
                      return -1;
                    }
                    return 0;
                  })
            }
           
            return {
                ...state,
                filter: [...dogsWeight]
            }

        case GET_BREEDS:
            return {
                ...state,
                breeds: action.payload
            }
            // const breeds = []
            // state.dogs.forEach(d => {
            //     if (d.breeds && !breeds.includes(d.breeds)) {
            //         breeds.push(d.breeds)
            //     }
            // })

           

            
        case GET_DETAIL:
            return {
                ...state,
                dogDetail: action.payload,
                loading: false
            }
        case CLEAR_DETAIL:
            return {
                ...state,
                dogDetail: {}
            }
        case SET_CURRENT_PAGE:
            return{
                ...state,
                currentPage: action.payload
            }
        default:
            return state
    }
}
