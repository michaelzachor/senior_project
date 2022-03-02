import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/Header/Header"

function MyMusic() {
    const [userdb, setUserdb] = useState([]);

    useEffect(()=>{
        const fetchUserdb = async () => {
            const res = await axios.get("http://localhost:4000/albums/userdb/621e3c3ff8db05b397dfe262") // add userId
            console.log(res.data)
            setUserdb(res.data);
        }
        fetchUserdb();
        // console.log("user db rendered")
    },[])
    return (
        <div className='MyMusic'>
            <Header />
            {userdb.map((item, i) => (
                <div key={i}>
                    {item.releaseTitle}
                </div>
            ))}
        </div>
    )
}

export default MyMusic;