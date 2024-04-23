import { axios } from "./axiosCreate";

export interface Inputs{
    name?:string;
    email:string;
    password:string;

}

export function handleSubmitForm(data:Inputs){
    const {email, password} = data

    axios.post('/auth',{
        email,
        password
    },{
        withCredentials:true
    })
    .then((response)=>{

        if(response.status===200){
            window.location.href='/'
        }
    }).catch((err)=>{
        console.error(err)
    })
}

export async function handleSubmitFormSignUp(data:Inputs){
    //console.log(data)
    await axios.post('/api/user',data,{
        withCredentials:true
    })
    window.location.href='/signin'
}

export function onCLickButtonBack(singup:boolean){
    if(singup){
        window.location.href='/signin'
        return
    }

    window.location.href='/signup'
}