let url = 'http://localhost:3004/cliente'

export default {
    async getData(searchInputTxt) {
        console.log(searchInputTxt);
        let data = await (await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type' : 'application/json'
            }
        })).json()
        return data
    }, 

    async postData(post_content){
        let data = await (await fetch(url, {
            method: 'POST',
            body: JSON.stringify(post_content),
            headers: {  
                'Content-type' : 'application/json'
            }
        })).json()
        return data
    },

    async putData(put_content, id) {
        let data = await (await fetch(url+`/${id}`, {
            method: 'PUT',
            body: JSON.stringify(put_content),
            headers: {
                'Content-type' : 'application/json'
            }
        })).json()
        return data ? data : {result: 'invalid'}
    },

    async deleteData(d,id){
        let data = await (await fetch(url+`/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type' : 'application/json'
            }
        })).json()
        return data ? data : {result: 'invalid'}
    }
}