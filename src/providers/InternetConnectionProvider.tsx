import { ToastId, useToast } from "@chakra-ui/react"
import { useEffect, useRef } from "react";
import { BsWifiOff } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { networkMode } from "../app/features/networkSlice";
const InternetConnectionProvider = ({children}) => {
    const dispatch=useDispatch() 
    const toast=useToast();
    const toastIdRef = useRef<ToastId | undefined>(undefined);
    const close=()=>{
        if (toastIdRef.current) {toast.close(toastIdRef.current);}
    }

    const AddToast=()=>{
        toastIdRef.current=toast({
            title:'you Are offline',
            description:'please make sure you have internet connection',
            status:'warning',
            duration:null,
            isClosable:true,
            icon:<BsWifiOff size={20}/>
        })
    }
    useEffect(()=>{
        const handleOffline=()=>{
             dispatch(networkMode(false))
            AddToast();
        }
        const handleOnLine=()=>{
            dispatch(networkMode(true))
            close()
        }
    window.addEventListener('offline',handleOffline)
    window.addEventListener('online',handleOnLine)
    return ()=>{
        window.removeEventListener('offline', handleOffline);
        window.removeEventListener('online', handleOnLine);
    }
},[])

  return children
}

export default InternetConnectionProvider


