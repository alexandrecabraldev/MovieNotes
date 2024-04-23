'use client'

import { useState, useEffect, CSSProperties } from "react";
import { FormProfile } from "@/components/FormProfile"
import { HeaderProfile } from "@/components/HeaderProfile"
import { axios } from "@/logic/axiosCreate";
import { FadeLoader } from "react-spinners";


const override: CSSProperties = {
    display: "block",
    margin: "12rem auto 0",
    borderColor: "green",
};

interface UserInformationType{
    email:string;
    name:string;
    profileImageUrl:string;
}

export default function Profile(){

    const [userInformation, setUserInformation] = useState<UserInformationType | null>(null)
            

    useEffect(()=>{
        getUserInformations()
    },[])

    
    async function getUserInformations(){

        try{
            const result = await axios.get('/api/user',{
                withCredentials:true
            });

            const {name, email, profileImageUrl}= result.data
            
            setUserInformation({
                name,
                email,
                profileImageUrl
            })

        }catch(err){
            console.log(err)
            window.location.href = '/signin'
        }
        
    }
   
    return(
        
        <main className="block">
         
            <HeaderProfile/>

            {userInformation ? 
                <FormProfile userInformation={userInformation}/>
                
           :
                <FadeLoader
                    color={'#FF859B'}
                    loading={true}
                    cssOverride={override}
                    //size={150}
                />  
            }

        </main>
    )
}