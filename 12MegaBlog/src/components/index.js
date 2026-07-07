import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Container from "./container/container";
import Logo from "./Logo";
import LogoutBtn from "./Header/LogoutBtn";
import Button from "./Button";
import Input from "./Input";
import RTE from "./RTE";
import Signup from "./Signup";
import Login from "./Login";
import Postcard from './Postcard';
import PostForm from  './post-form/PostForm'
import AuthLayout from './AuthLayout'
import Select from "./Select";
export {
    
    Footer ,
    Container ,
    Logo ,
    LogoutBtn ,
    Header ,
    Button ,
    Input , // Due to maybe forward  Ref
    RTE ,
    Signup  ,
    Login,
    Postcard ,
    PostForm ,
    AuthLayout , // defaut export hai nam kuch bhi ho sakta hai
    Select ,
}

// When you write:

// import { Header, Footer, Login } from "../components";

// JavaScript automatically looks for an index.js (or index.jsx) file inside the components folder.