import React from 'react'
import PublicLayout from './layout/PublicLayout'
import Index from './pages/Index'
import './App.css'

const App = () => {
    return (
        <>
            <PublicLayout>
                <Index/>
            </PublicLayout>
        </>
    )
}

export default App
