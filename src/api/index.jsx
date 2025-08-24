// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, // ör: https://api.site.com
//   withCredentials: true, // refresh cookie için şart
// });

export const api = {

    post_with_credentials: async (url, body) => {
        body = JSON.stringify(body);
        const options = {
            method: "post",
            headers: {
                "Content-type" : "application/json"
            },
            body,
            credentials: "include"
        }
        const result = await fetch(url, options);

        if(result.status === 200){
            return result.json();
        }
        // else if (result.status === 401){
        //     const refresh_result = await api.try_refresh();
        //     console.error(refresh_result);
        // }
    },

    post_with_auth : async (url, body, access_token) => {
        body = JSON.stringify(body);
        const options = {
            method: "post",
            body,
            headers: {
                Authorization : `Bearer ${access_token}`
            },
            credentials: "include"
        }
        const result = await fetch(url, options);

        if (result.status === 401){
            const refresh_result = await api.try_refresh();
            const refresh_data = await refresh_result.json();
            
            options.headers.Authorization = `Bearer ${refresh_data.access_token}`;
            
            return fetch(url, options); // second_try
        }
        else{
            return result;
        }
    },

    try_refresh : () => {
        const url = "https://ataseng.com/api/auth/refresh.php";
        const options = {
            credentials: "include"
        };
        return fetch(url, options);
    }
}