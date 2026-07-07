// import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

//ye appwrite ka syntax hai ki id $ kr ke likho
function Postcard({$id, title, featuredImage}) {
    // Add these two diagnostic logs:
    console.log("--- DEBUGGING POSTCARD ---");
    console.log("Post Title:", title);
    console.log("Featured Image ID received:", featuredImage);
    console.log("Generated Preview URL:", appwriteService.getFilePreview(featuredImage));

    return (
        <Link to={`/post/${$id}`}>
            {/* Your existing JSX */}
            <div className=' bg-gray-100 rounded-xl p-4 '>
                <div className=' justify-center mb-4  '>
                    <img 
                    className='w-2 h-3 object-cover rounded-lg mx-auto block shadow-sm'
                    src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl'/>
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}
export default Postcard
