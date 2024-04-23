import { ReactNode } from "react";

export function ContainerSigninSignup({children}: {children: ReactNode}){
    return (
       
        <div className=" flex flex-col m-auto">
            <h1 
                className="text-5xl text-buttonPink font-bold"
            >
                    MovieNotes
            </h1>
            <span 
                className="text-textColor mb-12"
            >
                    Aplicação para acompanhar tudo que assistir.
            </span>
                {children}
        </div>

    );
}