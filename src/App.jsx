import Header from "./components/header/Header"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ListaPost from "./pages/ListaPost"
import EditarPost from "./pages/EditarPost"
import Home from "./pages/Home"
import Detalhes from "./pages/Detalhes";
import { AuthProvider } from "./context/AuthContext";
import RotaPrivada from './components/rotaPrivada/RotaPrivada';
import Login from './pages/Login'

function App() {
  
  return (
    <>
    <AuthProvider>

     <BrowserRouter>
      <Header nomeUsuario="Login" />
     <Routes>

     <Route path="/" element={<Navigate to="/home" replace />} />
//            { /*Rota para Home */}
              <Route path="/home" element={<Home />} />
              { /*Rota para Detalhes */}
              <Route path="/detalhes/:id" element={<Detalhes />} />
              
              <Route path="/login" element={<Login />} />
    

              {  /*Rota para listas de post */}
              <Route path="/listaspost" element={
                <RotaPrivada>
                <ListaPost />
                </RotaPrivada>
                } />

              { /*Rota para novo post */}
              <Route path="/editarpost" element={
                    <RotaPrivada>
                    <EditarPost />
                    </RotaPrivada>
                    } />

              { /*Rota para atualizar post */}
              <Route path="/editarpost/:id" element={
                <RotaPrivada>
                <EditarPost />
                </RotaPrivada>
                } /> 

   
      
      
     </Routes>
     </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
