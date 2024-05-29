import { Link } from 'react-router-dom'
import {auth} from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import {signOut} from 'firebase/auth'
export const NavBar = () => {
    const [user] = useAuthState(auth);
    const SignOutAccount = async () => {
        await signOut(auth);
    }
    return <div className = 'navbar'>
        <div className='links'>
            <Link to="/">Home</Link>
            {!user ? <Link to="/login">Login</Link> : <Link to = "/createpost">Create Post</Link>}
        </div>
        <div className='user'>
            {user && (
            <>
                <img src = {user?.photoURL || ""} width="20" height="20"/>
                <p>{user?.displayName}</p>
                <button onClick = {SignOutAccount}>Log out</button>
            </>
            )}
        </div>
    </div>
}