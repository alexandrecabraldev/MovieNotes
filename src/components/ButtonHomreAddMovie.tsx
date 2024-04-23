'use client'

export function ButtonHomeAddMovie({children}: {children:string}){
    return (
        <button 
            onClick={()=>window.location.href= '/register'}
            type="button"
            className="bg-buttonPink py-2 px-4 sm:py-3 sm:px-8 rounded-lg text-buttonBlack text-sm sm:text-base">
            {children}
        </button>
    );
} 