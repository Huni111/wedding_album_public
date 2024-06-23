import React, { useState } from 'react';
import client from './config/appwrite_config';
import { Storage, ID } from 'appwrite';

const storage = new Storage(client);


export default function Upload() {

    const [file,  setFile] = useState(null)


    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        console.log(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(file){
            try{
                const response = await storage.createFile('66757aad001209759337', ID.unique(), file)
                console.log('Photo uploaded with success!', response)
            }catch(err){
                console.log('File upload unsuccessful!', err)

            }
        }else{
            alert('Válassz ki photot amit készitettél!')
        }
    }




    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type='file' onChange={handleFileChange} accept='image/*'></input>
                <button type='submit'>Kep feltoltes</button>
            </form>
        </>
    )
}