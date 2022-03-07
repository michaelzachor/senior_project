import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/Header/Header"
import AlbumInTable from "../components/AlbumInTable/AlbumInTable"
import "../components/AlbumInTable/albumintable.css"

function MyMusic() {
    const [userdb, setUserdb] = useState([]);

    useEffect(()=>{
        const fetchUserdb = async () => {
            const res = await axios.get("http://localhost:4000/albums/userdb/6220fc41b82cfe6798c7da50") // add userId
            console.log("data",res.data)
            let markedData = [];
            let i = 0;
            while (res.data[i]) {
                if (res.data[i].marked) markedData.push(res.data[i]);
                i++;
            }
            console.log("newdata",markedData)
            setUserdb(markedData);
        }
        fetchUserdb();
        // console.log("user db rendered")
        console.log("db",userdb);
    }, [])

    function renderTableData(album) {
        return (
            <tr>
                <td>Img</td>
                <td>{album ? album.title : "loading album title"}</td>
                <td>{album ? album.artistNames[0] : "loading album artist"}</td>
                <td>{album ? album.year : "loading album year"}</td>
            </tr>
        )
    }
    return (
        <div className='MyMusic'>
            <Header />
            <h2>Recently Logged</h2>
            <table>
            {userdb && userdb.map((album, i) => (
                <tbody key={i}>
                    {renderTableData(album)}
                    {/* <AlbumInTable album={album}/> */}
                </tbody>
            ))}
            </table>
        </div>
    )
}

export default MyMusic;