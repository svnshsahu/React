import conf from "../conf/conf";
import { Client,  ID , Databases , Storage , Query} from "appwrite";

export class databaseService{
    client = new Client();
    databases;
    bucket ; //ya storage

    constructor(){
        this.client   //Here you're telling Appwrite: "I want to talk to this Appwrite server and this specific project."
        .setEndpoint(conf.appwriteUrl) 
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title , slug , content , featuredImage , status , userId}){
        try{
            return await this.databases.createDocument( //ye sb appwrite ke doc mein hai ki kaisecreate hoga kya kya pass karna hoga
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId,
                slug , //ya id.unique bhi use kar skate hai
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        }
        catch(error){
            console.log(error)
        }
    }

    async updatePost(slug ,{title ,  content , featuredImage , status }){ //slug is id , I want that first
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
                slug , // slg hi hamari document id hai 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch(error){
            console.log(error);
            
        }
    }


    async deletePost(slug){
            try{
                await this.databases.deleteDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
                slug    
                )
                return true ; //mtlb successfully del ho gaya 
            }catch(error){
                console.log(error);
                return false;//del nahi hua 
            }
     }

     async getPost(slug){ //agar ek post lena hai toh
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId ,
                conf.appwriteCollectionId ,
                slug      
            )
        } catch (error) {
            console.log(error);
            return false; //kuch post nahi mila
        }
     }
     //yaad karo hamne status ki ek key banai thimtlb index banaye the appwrite mein isilie ham ispe querry laga sakte hai//BINA INDEXKE NO QUERY
    async getPosts(queries = [Query.equal("status" , "active")]){ //yaha queries sirf ek variable hai aur ham chahte hai ki wahi sb aaye jiska status active hai
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId , 
                conf.appwriteCollectionId ,
                // [
                //     Query.equal("status" , "active") agar upar na define kie hote toh yaha aise bhi kar skate the 
                // ]
                queries,
            )
        } catch (error) {
            console.log(error);
            return false;   
        }
    } 

    //file upload service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId , 
                ID.unique() ,
                file ,
            )
        } catch (error) {
            console.log(error);
            return false;
            
        }
    }

    async deleteFile(fileID){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID
            )
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    //kyuki iska response bohoh fast hai islie no async await or promise
getFilePreview(fileID) {
    try {
        // Switch from .getFilePreview to .getFileView
        const view = this.bucket.getFileView(
            conf.appwriteBucketId, 
            fileID
        );

        return view?.href || view; 
    } catch (error) {
        console.error("Appwrite getFileView error: ", error);
        return "";
    }
}
    
}

const service = new databaseService()
export default service