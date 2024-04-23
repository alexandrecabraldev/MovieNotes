'use client'

import {axios} from "@/logic/axiosCreate";
import {  ChangeEvent, ChangeEventHandler, useContext, useEffect, useState } from "react";
import { FormEvent } from "react";
import Image from "next/image";
import {InputHeaderContext} from "@/logic/context"

interface HeaderPropsType{
    avatarName: string;
    imageProfileUrl:string | undefined;
}

export function Header(props:HeaderPropsType){
    const [imageProfileUrl,setImageProfileUrl] = useState<string>('/assets/default/AvatarDefault.png')
    const [inputSearch, setInputSearch] = useState<string>('')

    const context = useContext(InputHeaderContext)
    
    useEffect(()=>{
        if(props.imageProfileUrl){
            setImageProfileUrl(props.imageProfileUrl);
        }
    },[])
    

    async function onCLickSair(){
        const response =  await axios.post('/logout',{},{
         withCredentials:true
        });
        
        console.log(response.data)
        window.location.href='/signin'
    }


    function handleOnChangeInput(event:ChangeEvent<HTMLInputElement>){
        //console.log(event.target.value)
        setInputSearch(event.target.value)

        context?.setInputHeader(event.target.value)

        //console.log(inputHeader)
    }


    return(
        <header className="flex justify-center border-b border-inputColor pb-4 mb-12">

            <div className="mt-4 sm:mt-8 flex flex-col sm:flex-row w-11/12 max-w-7xl sm:justify-between sm:items-center">

                <div className="flex justify-between ">
                    <h1 className="mb-2 sm:mb-0 text-2xl sm:text-3xl font-bold text-buttonPink ">
                        MovieNotes
                    </h1>
    
                    <Image
                        className="h-8 sm:hidden"
                        src={imageProfileUrl}
                        alt="avatar profile"
                        width={32}
                        height={32}
                    />
                </div>

           
                <input 
                    className="py-2.5 px-3 sm:py-5 sm:px-6 sm:mr-12 sm:ml-12 bg-inputColor rounded-xl w-full "
                    type="text" 
                    placeholder="Pesquisar pelo título"
                    onChange={handleOnChangeInput}
                />


                <div className="hidden sm:flex sm:flex-col sm:mr-3 max-w-max sm:items-start">
                    <span 
                        className="text-nowrap text-textColor text-sm cursor-pointer"
                        onClick={()=>window.location.href='/profile'}
                    >
                        {props.avatarName}
                    </span>
                    <span className="text-textGray text-sm cursor-pointer" onClick={onCLickSair}>
                        Sair
                    </span>
                </div>

                <Image
                    className="h-8 hidden sm:block sm:w-10 sm:h-10 lg:w-16 lg:h-16 sm:rounded-full"
                    src={imageProfileUrl}
                    alt="avatar profile"
                    width={64}
                    height={64}
                />
                    
            </div>
    
        </header>
    )
}