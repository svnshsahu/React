import {useCallback , useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { Button ,Input , Select ,RTE} from '../index'
import appwriteService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
//RTE use kaise karna hai , jb bhi use krna hai toh uska label ham yaha pr denge aur control le lenge RTE ka

function PostForm({post}) {
    const { register , handleSubmit ,
            watch , // watching capabilioties agar kisi fields ko continuously watch karna hai toh
            setValue , // agar kisi form mein values set krni hai toh ab  ham react from use kr rhe toh values iske througth set hongi
            control , //agar kisi form ka aapko control chahie  yahi control ham pass karrenge as it is in RTE 
            getValues // to get the values from form
        } = useForm({
            //use form ke andar aap actually ek object bhi pass kar sakte hai
            defaultValues : {
                title : post?.title || '' ,
                slug : post?.slug || '' ,
                content : post?.content || '' ,
                status : post?.status || 'active' ,
            } ,
            })
    const navigate = useNavigate();
    const userData = useSelector(state => state.user.userData)
    
    const submit = async(data) => { //jaise hi submit hua toh dekhenge ki pehle se koi post hai ki nahi agar hai toh nayi file upload kr ke purani delete karenge
        if(post){
           const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) :null

           if(file){
                appwriteService.deleteFile(post.featuredImage);
           }

           //ab appwrite service mein .updatePost jo hamne banaya hai uske madad se post update kr denge
           //hame ek slug bhi pass krna hai wo toh id hi hai
           const dbPost = await appwriteService.updatePost(post.$id , {
            ...data, //sb value waise hi rahegi bs featured image hi override hogi
            featuredImage : file? file.$id : undefined , })//sb chiz waise hi rhegi bas image update ho rhi 

            if(dbPost){
                navigate(`/post/${dbPost.$id}`)
            }
        }else{
           const file = await appwriteService.uploadFile(data.image[0]);

           if(file){
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await appwriteService.createPost({
                    ...data ,
                    userId : userData.$id ,
                })
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`)
                }
                 
           }

        }
        
    }
    //mtlb isme nam ko aisa change krna hai ki jo name mein space aaya hai use - se replace
    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]/g) //  / /g kr ke global match kr rhe hai aur / / ke andar [] jo likhenge wo pattern dhundhega aur [] iske aage ^ laga die toh matlab in sb ko chhod ke sbko - mein convert kr do /d mtlb digit /s mtlb spaces mtlb ! $ @ in sbko - 
            .replace(/\s/g , '-') // ab isme sare spaces ko bhi - ..... ha ha  upar bhi direct \s hata dete toh wahi bat hoti
        }else return ''
     } , [])

    useEffect(()=>{
        //actually mein jo bhi method aap yaha pr run krte usko aap ek subscription nam ke variable mein hold kr skte hai
        const subscription = watch( (value , {name}) => {
            if(name === 'title'){
                setValue('slug' , slugTransform(value.title , {shouldValidate : true})) //value ek object hai yaha pr
            }
        })

        return () => { //react use effect ke andar aapko ek call back milta hai usme aise likhte hai xyz.unsubscribe() for memory management 
            subscription.unsuscribe()
        }
    } , [watch , slugTransform , setValue])


        
    return (
 <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm
