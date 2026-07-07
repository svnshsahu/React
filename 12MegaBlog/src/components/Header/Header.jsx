import {Container ,Logo , LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    //is tarah ki navigation bar jab bhi banti hai na toh actually mein  ek array banaya jata hai uske upar loop kia jata hai , is array k andr objects hote hai
    const navItems = [  // ek ek values likhoge toh har bar ek naya button aay toh us button ko aapko lagana padta hai but production mein kya hota hai ki ham sidhe is tarah se object banate hai toh object mein ek aur value add kar do aur bs navigation bar mein add ho jati hai 
        {
            name : 'Home' ,
            slug : '/',
            active : true,
        } ,
        {
            name : "Login",
            slug : "/login",
            active : !authStatus
        } ,
        {
            name : "Signup",
            slug : "/signup",
            active : !authStatus
        } ,
        {
            name : "All Posts",
            slug : "/all-posts",
            active : authStatus
        } ,
        {
            name : "Add Post",
            slug : "/add-post",
            active : authStatus
        } ,
        
    ]
    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width="70px"/>
                        </Link>
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item) => 
                        item.active ? ( 
                            <li key={item.name}> 
                            {/* Navigate se bhi de skte hai link se bhi de sakte hai koi buri bat nahi hai  */}
                                <button onClick={() => navigate(item.slug)}
                                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>
                                        {item.name}</button>
                            </li>
                        ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn/>
                            </li>
                        )}
                    </ul>
                </nav>

            </Container>
        </header>
    )
}

export default Header
