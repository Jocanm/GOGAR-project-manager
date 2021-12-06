import React, { useEffect, useState } from 'react'
import PublicLayout from './layout/PublicLayout'
import Index from './pages/Index'
import IndexUsuarios from './pages/Usuarios/Index'
import PrivateLayout from './layout/PrivateLayout'
import './App.css'
import UserInfo from './pages/Usuarios/UserInfo'
import Registro from './pages/auth/Registro'
import Login from './pages/auth/Login'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { setContext } from '@apollo/client/link/context';
import Home from './pages/Home'
import jwtDecode from 'jwt-decode'
import { UserContext } from './context/UserContext'
import Crear from './pages/Proyectos/Crear'
import Listar from './pages/Proyectos/Listar'
import Inscritos from './pages/Proyectos/Inscritos'

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
    const token = JSON.parse(localStorage.getItem('token'));
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
});

const App = () => {

    const [authToken, setAuthToken] = useState("")
    const [userData, setUserData] = useState({})

    const setToken = (token) => {
        setAuthToken(token)
        if (token) {
            localStorage.setItem('token', JSON.stringify(token))
        } else {
            localStorage.removeItem("token")
        }
    }

    useEffect(() => {
        if (authToken) {
            const decoded = jwtDecode(authToken)
            console.log("DECODED:", decoded);
            setUserData({ ...decoded })
        }
    }, [authToken])

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <ApolloProvider client={client}>
                <AuthContext.Provider value={{ setToken, authToken, setAuthToken }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<PublicLayout />}>
                                <Route path="" element={<Index />} />
                                <Route path="auth/registro" element={<Registro />} />
                                <Route path="auth/login" element={<Login />} />
                            </Route>
                            <Route path="/" element={<PrivateLayout />}>
                                <Route path="home" element={<Home />} />
                                <Route path="usuarios" element={<IndexUsuarios />} />
                                <Route path="usuarios/:_id" element={<UserInfo />} />
                                <Route path="crear" element={<Crear />} />
                                <Route path="proyectos" element={<Listar />} />
                                <Route path="inscritos" element={<Inscritos/>}/>
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </AuthContext.Provider>
            </ApolloProvider>
        </UserContext.Provider>
    )
}

export default App
