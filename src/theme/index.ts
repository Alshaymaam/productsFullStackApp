import {mode} from "@chakra-ui/theme-tools"
import { extendTheme } from "@chakra-ui/react";

const style={
    global:props=>({
        body:{
            color:mode('gray.500','whiteAlpha.900')(props),
            bg:mode('gray.100','#141214')(props)
        }
    })
}
export const theme=extendTheme({
    style,
})