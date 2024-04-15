import { Navigate, Route, Routes } from 'react-router-dom';
import { PokerPage, IndexPage } from '../pages';

export const PokerRoutes = () => {
  return (
   <Routes>
    <Route path='/' element={ <IndexPage/> }/>
    <Route path='/:roomId' element={ <PokerPage/> }/>
    <Route path='/*' element={ <Navigate to='/'/> } />
   </Routes>
  )
}
