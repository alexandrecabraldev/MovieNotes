'use client'
import { useForm } from "react-hook-form"
import { Inputs, handleSubmitForm,handleSubmitFormSignUp,onCLickButtonBack } from "@/logic/auth"

interface PropsType{
    title:string;
    firstButtonContent: string;
    secondButtonContent:string;
    signup:boolean;
}

export function FormLogin(props: PropsType){
    const {register, handleSubmit, watch, formState:{errors}}= useForm<Inputs>()

    return(

        <form 
            action="" 
            className="flex flex-col"
            onSubmit={handleSubmit(props.signup? handleSubmitFormSignUp: handleSubmitForm)}
        >
            <h2 className="text-2xl mb-12 font-semibold text-textColor">
                {props.title}
            </h2>

            {props.signup &&
                <input 
                    className="bg-inputColor mb-2 py-4 pl-4 rounded-lg"
                    type="text" 
                    placeholder="Nome" 
                    {...register('name', {required:true})}
                />
            }
            <input 
                type="text" 
                className="bg-inputColor mb-2 py-4 pl-4 rounded-lg" 
                placeholder="E-mail"
                {...register('email',{required:true})}
            />
            <input 
                type="text" 
                className="bg-inputColor mb-2 py-4 pl-4 rounded-lg" 
                placeholder="Senha"
                {...register('password', {required:true})}
            />
    
            <button 
                type="submit" 
                className="bg-buttonPink rounded-lg py-4 text-slate-800 font-semibold mb-6 mt-2"
            >
                {props.firstButtonContent}
            </button>
            <button 
                type="button" 
                className="self-center text-lg text-buttonPink"
                onClick={()=>onCLickButtonBack(props.signup)}
            >
                {props.secondButtonContent}
            </button>

        </form>
    );
}