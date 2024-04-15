import { Route, Routes } from "react-router-dom"
import { PokerRoutes } from "../poker/routes/PokerRoutes"

export const AppRouter = () => {
  return (
    <Routes>
        {/* { POKER APP } */}
        <Route path="/*" element= { <PokerRoutes/> }/>

    </Routes>
  )
}
