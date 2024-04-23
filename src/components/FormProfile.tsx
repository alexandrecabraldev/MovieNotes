'use client'

import {useForm} from "react-hook-form"
import { useState, useEffect } from "react";
import { axios } from "@/logic/axiosCreate";

interface FormUpdateProfilefType{
    name:string;
    oldPassword:string;
    newPassword:string;
}

interface FormProps{
    userInformation:{
        email:string;
        name:string;
        profileImageUrl:string;
    }
}

export function FormProfile(props: FormProps){

    const[isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const {register, handleSubmit, watch} = useForm<FormUpdateProfilefType>();
  
    const [nameUser, setNameUser] = useState<string|null>(null);
   
    
    useEffect(()=>{
     
        setNameUser(props.userInformation.name)
    },[])

    useEffect(()=>{

        if(nameUser!=props.userInformation.name){

            setIsButtonDisabled(false)
        }
        
    },[ watch('newPassword'), watch('oldPassword')])


    async function handleProfileFormSubmit(data:FormUpdateProfilefType){

        //elimina todos os campos vazios
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([chave,valor])=>valor!='')
        )
    
        console.log(filteredData)
       
        try{    
            await axios.put("/api/user",filteredData,{
                withCredentials:true
            })

            window.location.href='/';
        }catch(err){
            console.error(err)
        }
    }

    return(
        <form 
            className="sm:max-w-7xl m-auto mt-36" 
            onSubmit={handleSubmit(handleProfileFormSubmit)}   
        >
            
            <div
                className="flex flex-col w-full items-center gap-y-2 mb-6"
            >
                <input
                    className="bg-inputColor rounded-lg px-3 py-4 w-11/12 sm:w-6/12 lg:w-4/12 max-w-sm" 
                    type="text"
                    placeholder="Nome do perfil"
                    {...register('name',{required:true})}
                    value={nameUser? nameUser : props.userInformation.name}
                    onChange={e=>setNameUser(e.target.value)}
                />
                
                
                <input
                    className="bg-inputColor rounded-lg px-3 py-4 w-11/12 sm:w-6/12 lg:w-4/12 max-w-sm" 
                    type="text"
                    //placeholder="E-mail"
                    value={`${props.userInformation.email}`}
                    readOnly
                />
            </div>

            <div
                className="flex flex-col w-full items-center gap-y-2 mb-6"
            >
                <input
                    className="bg-inputColor rounded-lg px-3 py-4 w-11/12 sm:w-6/12 lg:w-4/12 max-w-sm" 
                    type="text"
                    placeholder="Senha atual"
                    {...register('oldPassword')}
                />
                <input
                    className="bg-inputColor rounded-lg px-3 py-4 w-11/12 sm:w-6/12 lg:w-4/12 max-w-sm" 
                    type="text"
                    placeholder="Nova senha"
                    {...register('newPassword')}
                />
            </div>
            
            <div
                className="flex justify-center w-full"
            >
                <button
                    type="submit"
                    className={`bg-buttonPink py-3.5 rounded-lg w-11/12 sm:w-6/12 lg:w-4/12 max-w-sm ${isButtonDisabled ? 'opacity-50 cursor-not-allowed': 'opacity-100'} text-tagColor font-semibold`}
                    disabled={isButtonDisabled}
                >
                    Salvar
                </button>
            </div>
        </form> 
    )
}