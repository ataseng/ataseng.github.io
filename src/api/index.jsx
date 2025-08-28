// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, // ör: https://api.site.com
//   withCredentials: true, // refresh cookie için şart
// });

import { toast } from "react-toastify";

export const api = {

    get : async (url) => {

        try {
            const result = await fetch(url);
            const response = await result.json();

            if (result.status === 200){
                return response;
            }
            else{
                console.error(response.message)
            }
        } catch (error) {
            console.log(error)
        }

        
    },

    post : async (url, body) => {
        const options = {
            method: "post",
            body,
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const result = await fetch(url, options);
        const response = await result.json();

        if(result.status === 200){
            toast.info(response.message);
        }
        else{
            if (response.message.includes("Duplicate")) {
                toast.error("");

            }
            toast.error(response.message);
        }
    },

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