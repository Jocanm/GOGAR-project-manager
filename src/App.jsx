import React from 'react'
import PublicLayout from './layout/PublicLayout'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import IndexUsuarios from './pages/Usuarios/Index'
import PrivateLayout from './layout/PrivateLayout'
import './App.css'
import UserInfo from './pages/Usuarios/UserInfo'

// const httpLink = createHttpLink({
//     uri:"http://localhost:4000/graphql"
// })

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache()
})

const App = () => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PublicLayout />}>
                        <Route path="" element={<Index />} />
                    </Route>
                    <Route path="/app" element = {<PrivateLayout/>}>
                        <Route path="usuarios" element={<IndexUsuarios />} />
                        <Route path="usuarios/:_id" element={<UserInfo />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App
