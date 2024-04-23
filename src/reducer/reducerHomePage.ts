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
    iat:number;
    exp:number
}

export interface StateType{
    cards:CardsType[];
    userAuthenticatedInformation:UserType | null;
}

export interface ActionType{
    type:'homeInformationsCards' | 'homeInformationsUser';
    payloadCards: CardsType[];
    payloadUser: UserType;
}

export interface ActionInputSearchType{
    type: 'changeInputValue';
    payload: string;
}

export interface InputSearchType{
    value:string;
} 

export const initialState:StateType ={
    cards:[],
    userAuthenticatedInformation:null
}

export function reducerHomePage (state:StateType, action:ActionType):StateType{
    switch(action.type){
        case 'homeInformationsCards':
            return {
                cards:action.payloadCards,
                userAuthenticatedInformation:state.userAuthenticatedInformation
            }
        case 'homeInformationsUser':
            return{
                cards:state.cards,
                userAuthenticatedInformation: action.payloadUser
            }
    }
}

export function reducerSearchHeader(state:InputSearchType, action:ActionInputSearchType){
    switch(action.type){
        case 'changeInputValue':
            return state.value
    }
}