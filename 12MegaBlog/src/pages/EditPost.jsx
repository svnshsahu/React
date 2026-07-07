import {useEffect , useState} from 'react'
import { Container , PostForm } from '../components'
import appwriteService from '../appwrite/config';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post , setPosts] = useState(null)

    const {slug} = useParams() // URL se value nikalne ke lie useParams use hota hai
    //hamne slug ko {} islie likha kyuki isse destructuring ho jayegi object ki Params object return krta hai use slug hota hai toh instead of slug.slug (agar {} na lagaye hote) we can use slug
    const navigate = useNavigate()
    
    useEffect ( () => {
        if(slug){
            appwriteService.getPost(slug) .then( (post) => {
                if(post){
                    setPosts(post)
                }
            })
        }
        else{
            navigate('/')
        }
    } , [slug , navigate]) 

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post = {post}/>
            </Container>
        </div>
    ) : null
}

export default EditPost
