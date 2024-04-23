'use client'
import Image from "next/image"
import {axios} from "@/logic/axiosCreate"
import { FormEvent, useState } from "react";

interface HeaderClientProps{
    imageProfileUrl:string;
    avatarName:string;
}

export function HeaderClient(props:HeaderClientProps){

    const [inputSearch, setInputSearch] = useState<string>('')

    async function onCLickSair(){
        const response =  await axios.post('/logout',{},{
         withCredentials:true
        });
        
        console.log(response.data)
        window.location.href='/signin'
    }

    async function onsubmit(event:FormEvent<HTMLFormElement>){

        event.preventDefault()
        const result = await axios.post(`/api/cards/search`,{
            title: inputSearch
        },{
            withCredentials:true
        })

        console.log(result)
    }

    return (
        <div className="mt-4 sm:mt-8 flex flex-col sm:flex-row w-11/12 max-w-7xl sm:justify-between sm:items-center">

            <div className="flex justify-between ">
                <h1 className="mb-2 sm:mb-0 text-2xl sm:text-3xl font-bold text-buttonPink ">
                    MovieNotes
                </h1>

                <Image
                    className="h-8 sm:hidden"
                    src={`${props.imageProfileUrl}`}
                    alt="avatar profile"
                    width={32}
                    height={32}
                />
            </div>

            <form
                className="w-full sm:mr-12 sm:ml-12 relative"
                onSubmit={onsubmit}
            >
                <input 
                    className="py-2.5 px-3 sm:py-5 sm:px-6 bg-inputColor rounded-xl w-full "
                    type="text" 
                    placeholder="Pesquisar pelo título"
                    onChange={event=>setInputSearch(event.target.value)}
                />

                <button
                    type="submit"
                    className="absolute end-0 py-5 px-2.5"
                >
                    send
                </button>
            </form>

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
                src={`${props.imageProfileUrl}`}
                alt="avatar profile"
                width={64}
                height={64}
            />
                    
        </div>
    )
}