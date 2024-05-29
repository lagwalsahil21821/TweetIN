import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Firestore, addDoc, collection} from 'firebase/firestore'
import {db, auth} from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Idata {
    title: string,
    description: string,
}
export const CreateForm = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("You can't make a empty post.")
    })

    const postRef = collection(db, "posts")
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    })

    const onCreatePost = async (data: Idata) => {
        console.log(data);
        await addDoc(postRef, {
            ...data,    // title: data.title, description: data.description
            username: user?.displayName,
            id: user?.uid
        })
        navigate("/");
    }
    return (
        <form onSubmit = {handleSubmit(onCreatePost)} className='createForm'>
            <input placeholder="Title..." {...register("title")}/>
            <p style={{color: "red"}}>{errors.title?.message}</p>
            <textarea placeholder = "Description..." {...register("description")}/>
            <p style = {{color: "red"}}>{errors.description?.message}</p>
            <input type = "submit" value = "Post" className='submitForm'/>
        </form>
    )
}