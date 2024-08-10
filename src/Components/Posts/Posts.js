import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from "react-router-dom"
import Heart from '../../assets/Heart';
import './Post.css';
import Spinner from '../Spinner/Spinner';

function Posts() {
    const [products, setProducts] = useState([])
    const [expensiveProducts, setExpensiveProducts] = useState([]);
    const [spinner, setSpinner] = useState(false);
    const { firebase } = useContext(FirebaseContext)
    const { setPostDetails } = useContext(PostContext)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setSpinner(true)
                const db = getFirestore(firebase);
                const prodtCol = collection(db, 'products');
                const querySnapshot = await getDocs(prodtCol);

                const allPost = querySnapshot.docs.map(product => ({
                    ...product.data(),
                    id: product.id
                }));

                setProducts(allPost)
                const expensive = allPost.filter((data) => data.price > 2500000);
                setExpensiveProducts(expensive)
                setSpinner(false)
            } catch (error) {
                console.error("Error getting documents: ", error);
                setSpinner(false)
            }
        };

        fetchData();
    }, [firebase]) 

    const handleCardClick = (data) => {
        setPostDetails(data);
        navigate('/viewPost');
    }

    const renderCard = (data) => (
        <div className="card" key={data.id} onClick={() => handleCardClick(data)}>
            <div className="favorite">
                <Heart></Heart>
            </div>
            <div className="image">
                <img src={data.url} alt="" />
            </div>
            <div className="content">
                <p className="rate">&#x20B9; {data.price}</p>
                <span className="kilometer">Name : {data.product}</span>
                <p className="name">Category : {data.category}</p>
            </div>
            <div className="date">
                <span>{data.createdAt}</span>
            </div>
        </div>
    )

    return (
        <div>
            {spinner ? (
                <Spinner />
            ) : (
                <div className="postParentDiv">
                    <div className="moreView">
                        <div className="heading">
                            <span>All Vehicles</span>
                            <span>View more</span>
                        </div>
                        <div className="cards">
                            {products.map(renderCard)}
                        </div>
                    </div>
                    <div className="recommendations">
                        <div className="heading">
                            <span>Expensive Vehicles</span>
                        </div>
                        <div className="cards">
                            {expensiveProducts.map(renderCard)}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Posts;