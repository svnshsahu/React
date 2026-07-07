import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// no actual need of export here because we are exporting this class as an object so that user doesnt need to create instance of this class
export class AuthService{
    client = new Client();
    // The Client is like setting up a connection to Appwrite.
    account ; // yaha ham account islie abhi nhi bana rahe kyuki abhi hame appwriteurl projectid wagera client ko pass nahi kia hai
    //ab chahte toh yahi sb client account de weke bana le but ye sb wastage of resources hai main chahta hoon jb ye object koi banaye tb client account banna chahie
    //islie constructor main bana die hai //ho waise bhi jaega but just quality of code


    constructor(){
        this.client   //Here you're telling Appwrite: "I want to talk to this Appwrite server and this specific project."
        .setEndpoint(conf.appwriteUrl) 
        .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client); //ye , ye kr rha ki ab is client ko use kr ke account related operation ka acces de do
        //jaise account.create or logout 
    }   
        //promises use kr lo ya async await use kr lo kyuki main chahte hoon jb tk account creation khtm na ho main aage nahi badhna chahta 
        async createAccount({email , password , name}){ // ab user ko underhood nahi pata use bs pata hai ki authservice mein create acc hai usme value pass kr do acc ban jata hai
       
            //ab ye aapka create account fail bhi ho sakta hai islie ise try catch mei lete hai
            try{
                const userAccount = await this.account.create( ID.unique(), email,password , name); //acc.create mein yahi 4 value isi sequence mein jati hai zruri hai sequence
                // ID.unique() is provided by the Appwrite SDK. it generates a special string that is guaranteed to be unique enough for use as an Appwrite document/user/file ID.
                if(userAccount){ //vhecking user account create hua hai ki nahi
                    //call another method mtlb main kuch aisa kr rha ki account create hote hi login bhi ho jaye
                    return this.login({email,password});
                }
                else{
                    return userAccount;
                }
            }catch (error) {
                console.error(error);
                throw error;
            }
        }
        async login({email , password}){
            try{
                return await this.account.createEmailPasswordSession(email, password);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        }

        async getCurrentUser(){ // to check aap login ho ya nahi
            try{
                return await this.account.get(); //agar isme kuch mila hi nahi tab .. ya toh if else laga lo
            }
            catch(err){
                console.log(err);
                
            }
            return null; //but easier tarika ki agara upar kuch hoga hi nahi toh return null hoga
        }
        async logout(){
            try{
                //aap iske andr list of sessions bhi de skte ho
                //ek hi particular session del krna hai toh delsession('current')  or delsession('sessionid')
                await this.account.deleteSessions(); //ki jaha jaha se bhi login kie honge user ne kisi bhi browser se
            }
            catch(err){
                console.log(err);
                
            }
        }
    
}

const authService = new AuthService();



//agar ab AuthService export krte yani class ko jo bhi isko access karega use ek object banana hoga is class se
//better way ise ek object bana ke export karo jo kia bhi hai hamne ki wo authService.logout() aise kr ke use kr paye
export default authService


//under the hood sirf isi file ko pata hai
// ab kuch bhi appwrite ya firebase bs uske methods change kr dijie kyuki create acc , login ye sb toh wahi rahega

//BUT HA JAB BHI IN FUTURE AAPKO KABHI IS TARIKE KA AUTHENTICATION APPWRITE SE KRNA HOGA TOH IS SNIPPET KO COPY PASTE