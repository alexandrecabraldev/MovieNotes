'use client'
import { Card } from "@/components/Card";
import { Header } from "@/components/Header";
import {axios} from "@/logic/axiosCreate"
import { useEffect, useState, CSSProperties, useContext } from "react";
import { ButtonHomeAddMovie } from "@/components/ButtonHomreAddMovie";
import { FadeLoader} from "react-spinners";
import { InputHeaderContext } from "@/logic/context";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "green",
};

export interface CardsType{
    id:string;
    title:string;
    rating:string| number;
    summary: string;
    user_id: string;
}

export interface UserType{
    id:string;
    email:string;
    name:string;
    profileImageUrl: string;
    iat:number;
    exp:number
}

export default function Home(){

    const [cards,setCards] = useState<CardsType[] | null>(null);
    const [user,setUser] = useState<UserType| null>(null)
    const [inputHeader, setInputHeader] = useState<string>('')
    const [filteredCards, setFilteredCards] = useState<CardsType[]>([]);

    useEffect(()=>{
        console.log(cards)
        setTimeout(searchHomePageInformation, 2000)

    },[])

    useEffect(()=>{
        const result = cards?.filter((item)=>item.title.toLowerCase().includes(inputHeader.toLowerCase()))

        if(result){
            setFilteredCards(result)
        }

    },[inputHeader])

    async function searchHomePageInformation(){

        
        try{
            const response= await axios.get('/api/cards',{
                withCredentials:true
            });
         
            const userResponse = await axios.get('/api/user',{
                withCredentials:true
            })

            setUser(userResponse.data)
            setCards(response.data.cards)
            setFilteredCards(response.data.cards)

        }catch(error){
            window.location.href='/signin'
        } 
        
    }

    return (
        <InputHeaderContext.Provider value={{inputHeader,setInputHeader}}>
            <main className="h-screen flex flex-col">
    
                <Header 
                    avatarName={user ? user.name: 'Loading...'} 
                    imageProfileUrl={user?.profileImageUrl}
                />
        
                <section 
                    className={`flex flex-col mx-auto gap-y-6 w-11/12 max-w-7xl 
                    ${cards!=null && 'overflow-y-auto'} mb-12`}
                >
                   
                    <div className="flex justify-between w-full pb-4 ">
                        <h1 className="text-2xl sm:text-4xl">Meus filmes</h1>
                        <ButtonHomeAddMovie>
                            Adicionar filme
                        </ButtonHomeAddMovie>    
                    </div>
    
                    {   cards!=null ?
                            
                            filteredCards.map((item)=>{
                                return (
                                    <Card
                                        key={item.id}
                                        idCard={item.id}
                                        title={`${item.title}`}
                                        stars={item.rating}
                                        summary={`${item.summary}`}
                                    />
                                )
                            })
                        :
                        <FadeLoader
                            color={'#FF859B'}
                            loading={true}
                            cssOverride={override}
                            //size={150}
                      />        
                    }
    
                </section>
            </main>
        </InputHeaderContext.Provider>
    );
}