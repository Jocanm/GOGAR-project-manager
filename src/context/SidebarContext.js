import {createContext,useContext} from 'react'

export const SidebarContext = createContext(null)

export const useSidebarContext = () => {
    return useContext(SidebarContext)
}

