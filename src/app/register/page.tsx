'use client'
import { Header } from "@/components/Header";
import { useForm} from 'react-hook-form'
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";
import {v4 as uuidv4} from "uuid";

interface FormType{
    title:string;
    rating:string;
    summary:string;
}

export default function Register(){

        const {register, handleSubmit, formState:{errors}} = useForm<FormType>()
        const [tags, setTags] = useState<string[]|[]>([]);
        const inputTag = useRef<HTMLInputElement>(null);


        async function handleSubmitForm(data:FormType){
            if(tags.length>=1){
                const sendRequest = {
                    title: data.title,
                    rating: data.rating,
                    summary: data.summary,
                    tags,
                }
                const response = await axios.post('http://localhost:3333/api/cards',sendRequest,{
                    withCredentials:true
                })
                console.log(response)
                window.location.href="/"
            }

        }

        function addInputOnTagArray(){
            
            const inputValue = inputTag.current?.value

            if(inputValue){
                setTags(prevState=>[...prevState,inputValue])
            }

            if(inputTag.current){
                inputTag.current.value = "";
            }
        }

    return(
        <main
            className=""
        >
            <Header
                avatarName="Alexandre Cabral"
                imageProfileUrl=""
            />
    
            <section 
                className="flex flex-col gap-10 w-11/12 max-w-7xl m-auto"
            >
                <div
                    className="flex flex-col gap-6"
                >
                    <Link 
                        href={'/'}
                        className="place-self-start text-buttonPink"
                        type="button"
                    >
                        voltar
                    </Link>
    
                    <h2
                        className="sm:text-4xl sm:font-semibold"
                    >
                        Novo filme
                    </h2>
                </div>

                <form 
                    onSubmit={handleSubmit(handleSubmitForm)}
                    className="flex flex-col gap-10"
                    action=""
                >

                    <div
                        className="flex gap-10 "
                    >
                        <input 
                            className="rounded-lg text-textGray bg-inputColor px-4 py-4 w-full"
                            type="text"
                            placeholder="Título"
                            {...register('title',{required:true})}
                        />
                        <input 
                            className="rounded-lg text-textGray bg-inputColor px-4 py-4 w-full"
                            type="text"
                            placeholder="Sua nota (de 0 a 5)"
                            {...register('rating', {required:true, min:0, max:5})}
                        />
                    </div>

                    <textarea 
                        className="text-textGray bg-inputColor rounded-lg px-4 py-4 resize-none"
                        cols={30} 
                        rows={10}
                        placeholder="Observações"
                        {...register('summary',{required:true})}
                    >

                    </textarea>

                    <div
                        className="flex flex-col gap-6 "
                    >
                        <span
                            className="text-textSummary text-lg"
                        >
                            Marcadores
                        </span>
                        <div
                            className="p-4 bg-black rounded-lg flex gap-6"
                        >
                           { 
                               tags.map((item)=>{
                                    return(
                                        <span
                                            key={uuidv4()}
                                            className="p-4 bg-inputColor rounded-lg text-xs"
                                        >
                                            {item}
                                        </span>
                                    )
                               }) 
                            }

                            <div
                                className="border border-dashed rounded-lg flex
                                max-w-40"
                            >
                                <input
                                    className="py-4 pl-4 rounded-lg text-textGray border-textGray text-xs bg-black focus:outline-none w-full" 
                                    type="text"
                                    placeholder="Novo marcador"
                                    ref={inputTag}
                                />

                                <button
                                    className="py-4 pr-4 pl-2" 
                                    type="button"
                                    onClick={addInputOnTagArray}
                                >
                                    <Image
                                        src={'/assets/add.png'}
                                        alt="image do simbolo de soma"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className="flex gap-10"
                    >
                        <button 
                            type="reset"
                            className="w-full text-buttonPink py-4 bg-black rounded-lg"
                        >
                            Excluir filme
                        </button>
                        <button 
                            type="submit"
                            className="w-full text-tagColor py-4 bg-buttonPink rounded-lg"
                        >
                            Salvar alterações
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}