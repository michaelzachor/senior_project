import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/Header"
import AlbumInfo from "../components/AlbumInfo"

function Home() {
    const [userdb, setUserdb] = useState([]);

    useEffect(()=>{
        const fetchUserdb = async () => {
            const res = axios.get("posts/userdb/") // add userId
            console.log(res)
            setUserdb(res.data);
        }
        fetchUserdb();
        // console.log("user db rendered")
    },[])
    return (
        <div className='Home'>
            <Header />
            <AlbumInfo />
            {/* <h1>Check2</h1> */}
            {/* {userdb.map((d) => (
                <Item key={d.id} data={d} />
            ))} */}
        </div>
    )
}

export default Home;