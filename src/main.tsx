import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import {store} from "./app/store"
import InternetConnectionProvider from './providers/InternetConnectionProvider.tsx'
import { theme } from './theme/index.ts'
const queryClient=new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false
    }
  }
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  
 <QueryClientProvider client={queryClient}>
   <Provider store={store}>
     <InternetConnectionProvider >
       <Router>
         <ChakraProvider theme={theme}>
           <App />
         </ChakraProvider >
       </Router>
  
      </InternetConnectionProvider>
   </Provider>
 </QueryClientProvider>
)
