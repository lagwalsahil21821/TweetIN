import { getDocs, collection } from "firebase/firestore"
import { db } from "../../config/firebase"
import { useEffect, useState } from "react";
import { Post } from './Post';

export interface IPost {
    id: string,
    userId: string,
    title: string,
    description: string,
    username: string,
}
export const Home = () => {
    const [postList, setPostList] = useState<IPost[] | null>(null);
    const postRef = collection(db, "posts");
    const getPostData = async () => {
        const data = await getDocs(postRef);
        setPostList(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id})) as IPost[]
        );
    };

    useEffect(() => {
        getPostData();
    }, []);
    console.log(postList);
    return <div>
        {postList?.map((post) => 
            <Post post = {post}/>
        )}
    </div>
}