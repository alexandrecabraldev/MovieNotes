//'use client'

import {v4 as uuidv4} from "uuid"
import {axios} from "@/logic/axiosCreate"
import { useState, useEffect } from "react";

 interface CardTypes{
    idCard:string;
    title:string;
    stars:string|number;
    summary: string;

 }

 interface TagCardType{
    id:string;
    tag:string;
    card_id:string;
 }
 
 export function Card(props: CardTypes){
   
    const [tagsCard, setTagsCard] = useState<TagCardType[]| []>([])
 
    useEffect(()=>{
        getTags()
    },[])

    async function getTags(){
        const tags = await axios.get(`http://localhost:3333/api/tags/${props.idCard}`,{
            withCredentials:true
        })

        setTagsCard(tags.data.tags)
    }

    return (
            <article className="mt-6 bg-cardColor rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-2 text-textColor">
                    {props.title}
                </h2>
                <div className="mb-2">
                    {props.stars} stars
                </div>
                <p className="text-textSummary">
                    {props.summary}
                </p>
                <ul className="flex flex-wrap items-center gap-2 mt-4">
                    {
                        tagsCard.map(tag=>{
                            return (
                                <li 
                                    key={uuidv4()}
                                    className="py-1 px-4 bg-tagColor rounded-lg text-tagText"
                                >
                                    {tag.tag}
                                </li>
                            )
                        })
                    }
                    
                </ul>
            </article>
    );
 }