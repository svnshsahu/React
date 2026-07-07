
import {Editor} from '@tinymce/tinymce-react'  //Tiny mce install kara tha hamne 
import {Controller} from 'react-hook-form'
export default function RTE({name , control , label , defaultValue  = ""}) { //ye control hi actually react hook form se  aata hai aur yahi control responsible hai iski sari state wagera ko us form mein le jane ke lie , ye toh
                                                // abhi component hai toh component se form me, toh ye control kaha se pass kroge jb is RTE ko ham use karoge waha par
    return (

        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            <Controller //control kya hai pura control yaha se pass karega kahi aur
                name={name || "content"} 
                control={control} //ye jo hai control ye control dega parent element ko toh jo bhi parent element ise call karega ham as it is use pass kar denge taaki wo pura control le paaye jitne bhi events ho rahe hai
                render={({field : {onChange}}) => (
                    //jo bhi element aapko render karwana hai render se mera matlab hai agar input field ho toh input le lo editor ho toh editor le lo 
                    //agar aapko sirf editor export karna hai toh bohot aasan kaam hai
                    <Editor
                    apiKey='9ucgrdrvawtv7fq3ooj70099malgjxgalk4w1vci34h2o0iv'
                    initialValue={defaultValue} // ki by default isme kya hai
                    init={ //initialize hote hi aap iske andar kya kya values chahte hai
                        {   initialValue : defaultValue ,
                            height:500 ,
                            menubar : true ,
                            plugins : [ //ki aapko kya kya value chahie wo sari de do
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ] ,
                            toolbar: //tool bar mein aap kaun kaun sa options dena chah rahe wo de do
                            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }
                        
                    }
                    onEditorChange={onChange}
                    />
                )}
            />
        </div>


    )
}


