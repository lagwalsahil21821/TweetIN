import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from 'firebase/firestore';
import {IPost} from './Home';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect , useState} from 'react';

interface Props {
    post: IPost;
}

interface ILike {
    userId: string;
    likeId: string;
}

export const Post = (props: Props) => {
    const {post} = props;   //destructure
    const [user] = useAuthState(auth);
    const [TotalLikes, setTotalLikes] = useState<ILike[] | null>(null);
    const likesRef = collection(db, "likes");
    const likesDoc = query(likesRef, where("postId", "==", post.id));
    
    const addLikeOnPost = async () => {
        try{
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id
            })
            if(user){
                setTotalLikes((prev) => prev ? [...prev, {userId: user.uid, likeId: newDoc.id}] 
                                             : [{userId: user.uid, likeId: newDoc.id}]);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const removeLikeOnPost = async () => {
        try{
            const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid));
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            const likeId = likeToDeleteData.docs[0].id;
            await deleteDoc(doc(db, "likes", likeId));

            if(user){
                setTotalLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId))
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const getLikes = async () => {
        const numberOfLikes = await getDocs(likesDoc);
        setTotalLikes(numberOfLikes.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id}) ));
    }

    const hasUserLiked = TotalLikes?.find((like) => like.userId === user?.uid);

    useEffect(() => {
        getLikes();
    }, []); //empty array to pass => only to call while mounting not while updating

    return <div style={{border: '0.0625rem solid black', margin: "0.525rem 18.75rem", padding: '0.125rem'}}>
        <h1 className="post-title"><p>{post.title}</p></h1>
        <p className="post-description">{post.description}</p>
        <p className="post-username">{post.username}</p>
        <button style={{blockSize: "2.5rem", cursor: "pointer"}} onClick = {hasUserLiked ? removeLikeOnPost : addLikeOnPost}>
            {hasUserLiked ? <div style= {{fontSize: "1.4rem"}}>&#128078;</div> : <div style= {{fontSize: "1.4rem"}}>&#128077;</div>}
        </button>
        { TotalLikes && <p>Likes: {TotalLikes.length}</p>}
    </div>
}