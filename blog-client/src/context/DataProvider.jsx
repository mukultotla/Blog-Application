import { createContext, useState } from "react"
export const DataContext = createContext(null)

const DataProvider = ({children}) => {
    const [accountDetail, setAccountDetail] = useState({username:'', name:''})
    return (
        <DataContext.Provider value={{
            accountDetail,
            setAccountDetail
        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataProvider;