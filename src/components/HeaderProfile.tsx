'use client'
import Image from "next/image"
import Link from "next/link"
import { useRef, useState } from "react"

export function HeaderProfile (){

    const inputProfile = useRef<HTMLInputElement | null>(null)
    const [imageProfileUrl,setImageProfileUrl] = useState<string>('/assets/default/AvatarDefault.png')

    return(
        
        <header className="sm:h-36 bg-cardColor">

            <div
                className="max-w-7xl m-auto h-full flex items-center px-7 pt-3"
                >
                <Link
                    href={'/'}
                    className="text-buttonPink"
                    onClick={()=>window.location.href='/'}
                    >
                    Voltar
                </Link>

                <input 
                    className="hidden"
                    type="file" 
                    name="profileImage" 
                    ref={inputProfile}
                />
                <Image
                    className="m-auto -mb-20 sm:-mb-24 cursor-pointer"
                    src={`${imageProfileUrl}`}
                    width={186}
                    height={186}
                    alt="image do perfil"
                    onClick={()=>inputProfile.current?.click()}
                />
            </div>
      
        </header>
    )
}