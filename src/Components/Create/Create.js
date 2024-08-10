import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { AuthContext } from '../../store/Context'
import Spinner from '../Spinner/Spinner'
import './Create.css'
const data = new Date()


const Create = () => {

    const navigate = useNavigate()
    const [product, setProduct] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null)
    const [spinner, setSpinner] = useState(false);
    const { user } = useContext(AuthContext);

    const handileSubmit = async (e) => {
        e.preventDefault();
        setSpinner(true);
        console.log("handileSubmit clicked")
        const storage = getStorage();
        const storageRef = ref(storage, `olx-images/${image.name}`);
        console.log('1')
        uploadBytes(storageRef, image).then(async(snapshot) => {
            console.log('Uploaded a file!');
            const url = await getDownloadURL(storageRef)
            console.log(url)
            console.log('3')

            const db = getFirestore();
            addDoc(collection(db, 'products'), {
                product,
                category,
                price,
                url,
                userId: user.uid,
                createdAt: data.toDateString()
            }).then(() => {
                navigate('/');
            }).catch((error) => {
                console.log(error, 'error in the catch fro create post')
                setSpinner(false);
            })
        }).catch((error) => {
            console.log(error, 'error in the uploadBytes')
            setSpinner(false);
        })
        console.log('2')

    }

    return (

        <div>
            {
                spinner
                    ?
                    <Spinner />
                    :
                    <div className='createParentDiv'>
                        <h1>Add new Product</h1>
                        <form onSubmit={handileSubmit}>
                            <label htmlFor="">Product Name</label>
                            <br />
                            <input className='input' type="text" name="" id="" onChange={(e) => setProduct(e.target.value)} value={product} />
                            <br />
                            <label htmlFor="">Category</label>
                            <br />
                            <input className='input' type="text" onChange={(e) => setCategory(e.target.value)} value={category} />
                            <br />
                            <label htmlFor="">Price</label>
                            <br />
                            <input className='input' type="number" onChange={(e) => setPrice(e.target.value)} value={price} />
                            <br />
                            <label htmlFor="">Image</label>
                            <br />
                            <br />
                            {image && <img src={URL.createObjectURL(image)} alt='product image' style={{ height: "100px", width: "200px" }} />}
                            <br />
                            <br />
                            <input className='inputImage' type="file" onChange={(e) => setImage(e.target.files[0])} />
                            <br />
                            <button className='submit'>Add the Product</button>
                        </form>

                    </div>
            }
        </div>


    )
}

export default Create
