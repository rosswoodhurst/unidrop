import { firestore, auth, increment, serverTimestamp } from '../lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useContext, useState } from 'react';
import styles from '../styles/Admin.module.css';
import toast from 'react-hot-toast';

export default function Comment({ postRef }) {
    const [thecomment, setComment] = useState('');

    const createComment = async (e) => {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        const displayName = auth.currentUser.displayName;
        console.log(auth.currentUser)
        const commentRef = postRef.collection('comment').doc();

        // Tip: give all fields a default value here

        commentRef.set({

            content: thecomment, user: displayName
        }, { merge: true });

        toast.success('Comment created!');
        setComment(" ")


        // Imperative navigation after doc is set
        /* router.push(`/${username}/${slug}`); */
    };


    return (
        <>
            <h2>Add your comments...</h2>
            <form onSubmit={createComment}>
                <input
                    value={thecomment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Witty comment..."
                    className={styles.input}
                />
                <button type="submit" className="btn-comment">
                    Submit..
                </button>
            </form>
        </>
    )
}