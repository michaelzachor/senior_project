import React from 'react';
// import samplePic from "../../assets/samplePic.jpeg";
import "./albumintable.css";

function AlbumInTable({album}) {
    return (
        <>
            <tr style={{margin : '100px'}}>
                <td>Img</td>
                <td>{album ? album.title : "loading album title"}</td>
                <td>{album ? album.artistNames[0] : "loading album artist"}</td>
                <td>{album ? album.year : "loading album year"}</td>
            </tr>
        </>
    );
}

export default AlbumInTable;
