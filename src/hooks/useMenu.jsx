import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // useEffect(() => {
    //     fetch('https://bistro-boss-restaurant-server-puce.vercel.app/our-menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setMenu(data);
    //             setLoading(false);
    //         })
    // }, [])

    const { data: menu = [], isPending: loading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get('/our-menu');
            return res.data;
        }
    })

    return [menu, loading, refetch]
}

export default useMenu;