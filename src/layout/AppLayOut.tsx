import { Outlet } from "react-router-dom"
import Nav from "./NavBar"

const AppLayOut = () => {
 
  return (
    <>
    <Nav/>
    <Outlet/>
    </>
  )
}

export default AppLayOut