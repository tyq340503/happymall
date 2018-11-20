import axios from 'axios';
// const url = 'http://localhost:3001';

export function getBooks(
    limit = 10,
    start = 0,
    order = 'asc',
    list = ''
) {

    const request = axios.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data]
            } else {
                return response.data
            }
        }
        )

    return {
        type: 'GET_BOOKS',
        payload: request
    }

}


export function loginUser({email,password}){
    const request = axios.post('/api/login',{email,password})
                .then(response => response.data)

    return {
        type:'USER_LOGIN',
        payload:request
    }
}

export function auth(){
    const request = axios.get('/api/auth')
                .then(response => response.data)
                .catch(err=>{console.log(err)})
    debugger;
    return {
        type:'USER_AUTH',
        payload:request
    }

}

export function getBookWithReviewer(id) {
    const request = axios.get(`/api/getBook?id=${id}`)

    return (dispatch) => {
        request.then(({ data }) => {
            let book = data;

            axios.get(`/api/getReviewer?id=${book.ownerId}`)
                .then(({ data }) => {
                    let response = {
                        book,
                        reviewer: data
                    }

                    dispatch({
                        type: 'GET_BOOK_W_REVIEWER',
                        payload: response
                    })
                })
        })
    }
}

export function clearBookWithReviewer(){
    return {
        type:'CLEAR_BOOK_W_REVIEWER',
        payload:{
            book:{},
            reviewer:{}
        }
    }
}

export function artistListAll() {
    const request = axios.get(`${URL}/artists`)
        .then(response => response.data)
    return {
        type: 'GET_ARTISTS_ALL',
        payload: request
    }
}

export function artistList(keywords) {
    const request = axios.get(`${URL}/artists?q=${keywords}`)
        .then(response => response.data)
    return {
        type: 'GET_ARTISTS',
        payload: request
    }
}

export function artistDetail(id) {
    const request = axios.get(`${URL}/artists?id=${id}`)
        .then(response => response.data)

    return {
        type: 'GET_ARTISTS_DETAIL',
        payload: request
    }
}

export function clearArtistDetail() {
    return {
        type: 'CLEAR_ARTIST_DETAIL',
        payload: null
    }
}
