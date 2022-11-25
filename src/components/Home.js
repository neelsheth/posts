import React, { useEffect, useRef, useState } from 'react'
import { auth } from "../Firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "../Firebase";
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import './style.css'

export default function Home() {
    const provider = new GoogleAuthProvider();
    const [data, setData] = useState(null);
    const [logIn, setLogin] = useState("hello..!!!");
    const [profilePhot, setphoto] = useState(null);
    const [isLogin, setisLogin] = useState(false)

    const collecton_ref = collection(db, 'posts');

    const titleRef = useRef()
    const descriptionRef = useRef()
    const [change, editechange] = useState(false)


    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {


                setLogin(result.user.displayName)
                setphoto(result.user.photoURL)
                setisLogin(true)

                // localStorage.setItem("name", name);
                // localStorage.setItem("email", email);
                // localStorage.setItem("profilePic", profilePic);
            })
            .catch((error) => {
                console.log(error);
            });
    };






    const postData = () => {
        if (isLogin) {
            let titelData = titleRef.current.value;
            let descriptionData = descriptionRef.current.value;
            addDoc(collecton_ref, {
                title: titelData,
                description: descriptionData
            })
                .then(() => {
                    titleRef.current.value = "";
                    descriptionRef.current.value = "";
                    editechange(!change)

                })
                .catch((error) => {
                    alert(error.message)
                })
        }
        else {
            alert("Please log in to Add post")
        }
    }

    useEffect(() => {
        async function getData() {
            try {
                const posts = collection(db, 'posts');
                let postData = await getDocs(posts);

                // console.log(postData.docs[0].data())
                // console.log(postData.docs[0].id)

                let respData = postData.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                })
                setData(respData)

            }
            catch (err) {
                alert(err)
            }
        }
        getData()
    }, [change])

    function deleteData(id) {
        if (isLogin) {
            const docToUpdate = doc(db, 'posts', id)
            deleteDoc(docToUpdate)
                .then(() => {
                    editechange(!change)
                })
                .catch((err) => {
                    alert(err.message)
                })
        }
        else {
            alert("Please log in to delete post")
        }
    }


    var idx = 1;


    return (
        <div>
            <h1>{logIn}</h1>
            {profilePhot != null && <img src={profilePhot} alt={"profile photo"}></img>
            }            {!isLogin && <button className='loginBtn' onClick={signInWithGoogle}>Log in using Google</button>
            }
            <div className='inputs flex'>

                <input ref={titleRef} placeholder='title' required ></input>
                <input ref={descriptionRef} placeholder='description' required></input>
                <button className='addpost' onClick={() => postData()}>Add post </button>
            </div>


            <div className='flex'>

                <table>
                    <tr>
                        <th>Sr No.</th>
                        <th>Title</th>
                        <th>description</th>
                        <th>Delete</th>

                    </tr>

                    {data != null && data.map((dataIdx) => (
                        <tr>

                            <td>{idx++} </td>
                            <td>{dataIdx.title}</td>
                            <td>{dataIdx.description}</td>
                            <td><button className='deletebtn' onClick={() => deleteData(dataIdx.id)}>Delete</button></td>


                        </tr>

                    ))}



                </table>
            </div>


        </div>
    )
}
