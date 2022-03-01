import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/Header/Header"

function MyMusic() {
    const [userdb, setUserdb] = useState([]);

    useEffect(()=>{
        const fetchUserdb = async () => {
            const res = axios.get("https://localhost:4000/posts/userdb/") // add userId
            console.log(res)
            setUserdb(res.data);
        }
        fetchUserdb();
        // console.log("user db rendered")
    },[])
    return (
        <div className='MyMusic'>
            <Header />
            <h1>Check2</h1>
            {/* {userdb.map((d) => (
                <Item key={d.id} data={d} />
            ))} */}
        </div>
    )
}

export default MyMusic;