import { Routes,Route } from "react-router-dom"
import HomePage from "./pages"
import AboutPage from "./pages/About"
import Products from "./pages/Products"
import AppLayOut from "./layout/AppLayOut"
import LoginPage from "./pages/LoginPage"
import cookieService from "./services/cookies"
import AdminDashBoard from "./pages/dashboard"
import DashBoardLayout from "./pages/dashboard/DashBoardLayout"
import DashBoardProducts from "./pages/dashboard/DashBoardProducts"

const App = () => {
  const token=cookieService.get("jwt")
  return (
    <>
    <Routes>
      <Route path="/" element={<AppLayOut/>}>
      <Route index element={<HomePage/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/products/:id" element={<Products/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      </Route>
      <Route path="/dashboard" element={<DashBoardLayout/>}>
      <Route index element={<AdminDashBoard/>}/>
      <Route path={"products"} element={<DashBoardProducts/>}/>
      <Route path={"categories"} element={<h1>Categories</h1>}/>
      </Route>
      <Route path="/login" element={<LoginPage isAuthenticated={token}/>}/>
    </Routes>
    
    </>
  )
}

export default App