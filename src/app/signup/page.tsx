import { ContainerSigninSignup } from "@/components/ContainerSigninSignup";
import { FormLogin } from "@/components/FormLogin";
import Image from "next/image";

export default function Signup(){
    return(

        <main className="bg-imageMovie md:bg-gradient-conic flex md:gap-x-20 h-screen md:max-w-fit md:m-auto md:overflow-x-hidden md:pl-4">
                <ContainerSigninSignup>
                    <FormLogin
                        title="Crie sua conta"
                        firstButtonContent="Cadastrar"
                        secondButtonContent="Voltar o login"
                        signup
                    />
                </ContainerSigninSignup>
                <Image
                    className="hidden md:block"
                    src='/assets/cover.png' 
                    width={800} 
                    height={1024} 
                    alt="imagem de uma sala de cinema"
                />
           
        </main>
    );
}