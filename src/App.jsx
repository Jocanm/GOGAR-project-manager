import React from 'react'
import PublicLayout from './layout/PublicLayout'
import Index from './pages/Index'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import './App.css'

const httpLink = createHttpLink({
    uri:"http://localhost:4000/graphql"
})

const client = new ApolloClient({
    uri:httpLink,
    cache: new InMemoryCache()
})

const App = () => {
    return (
        <ApolloProvider cliente={client}>
            <PublicLayout>
                <Index/>
            </PublicLayout>
        </ApolloProvider>
    )
}

export default App
