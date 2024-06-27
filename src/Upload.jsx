import React, { useState } from 'react';
import client from './config/appwrite_config';
import { Storage, ID } from 'appwrite';

const storage = new Storage(client);


export default function Upload() {

    const [file, setFile] = useState(null)


    const handleFileChange = (e) => {
        setFile(e.target.files[0])
        console.log(file)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (file) {
            try {
                const response = await storage.createFile('66757aad001209759337', ID.unique(), file)
                console.log('Photo uploaded with success!', response)
                alert('Kép feltőltve!')
            } catch (err) {
                console.log('File upload unsuccessful!', err)

            }
        } else {
            alert('Válassz ki photot amit készitettél!')
        }
    }




    return (
        <>
            <div className='form_wrapper'>
                <form onSubmit={handleSubmit}>
                    <label className='file' htmlFor="files" >Válassz képet!</label>
                    <input id="files" onChange={handleFileChange} type="file" />
                    <button className='file' type='submit'>Kep feltoltes</button>
                </form>
            </div>
        </>
    )
}