// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL, // ör: https://api.site.com
//   withCredentials: true, // refresh cookie için şart
// });

import { toast } from "react-toastify";

const API_URL = "https://ataseng.com/api";

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

    get_with_auth : async (url, access_token) => {
        try {
            const options = {
                headers: {
                    Authorization : `Bearer ${access_token}`
                },
            }
            const result = await fetch(url, options);
            // const response = await result.json();

            if (result.status === 401){
                const refresh_data = await api.try_refresh();

                options.headers.Authorization = `Bearer ${refresh_data.access_token}`;
                
                return fetch(url, options); // second_try
            }
            else{
                return result;
            }
        } catch (error) {
            console.error(error)
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

    login: async (url, body) => {
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

        // if(result.status === 200){
        //     return result.json();
        // }
        // else{
        //     return result;
        // }

        return result.json();
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
            const refresh_data = await api.try_refresh();
            
            options.headers.Authorization = `Bearer ${refresh_data.access_token}`;
            
            return fetch(url, options); // second_try
        }
        else{
            return result;
        }
    },

    put_with_auth: async (url, body, access_token) => {
        body = JSON.stringify(body);
        const options = {
            method: "put",
            body,
            headers: {
                Authorization : `Bearer ${access_token}`
            },
            credentials: "include"
        }
        const result = await fetch(url, options);

        if (result.status === 401){
            const refresh_data = await api.try_refresh();

            if(refresh_data.ok){
                options.headers.Authorization = `Bearer ${refresh_data.access_token}`;
            
                return fetch(url, options); // second_try
            }
            else{
                toast.error(refresh_data.message);
            }
            
        }
        else{
            toast.info("Başarıyla Güncellendi");
            return result;
        }
    },

    try_refresh : async () => {
        const url = "https://ataseng.com/api/auth/refresh.php";
        const options = {
            credentials: "include"
        };
        const refresh_result = await fetch(url, options);
        const refresh_data = await refresh_result.json();

        return refresh_data;

        // if(refresh_result.status === 200){
        //     // const refresh_data = await refresh_result.json();

        //     if(refresh_data.ok){
        //         localStorage.setItem("userInfo", JSON.stringify(refresh_data));
        //         return refresh_data;
        //     }
        // }
        // else{
        //     return refresh_result;
        // }
        
    },
    
}