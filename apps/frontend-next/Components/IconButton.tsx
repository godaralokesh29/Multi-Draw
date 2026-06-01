import { ReactNode } from "react";

export function IconButton({
    icon, onClick, activated
}:{
    icon: ReactNode;
    onClick: () => void;
    activated: boolean;
}){
    return <div className={`m-1 cursor-pointer rounded-full p-3 transition-all duration-200 ease-in-out ${activated ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`} onClick={onClick}>
        {icon}
    </div>
}
