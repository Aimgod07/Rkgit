import React,{createContext,useState} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

export const Context= createContext({isAuthencated:false});

const AppWrapper = () => {
  const[isAuthencated,setIsAuthencated]=useState(false);
  const [user,setUser]=useState();
  return(
    <Context.Provider value={{isAuthencated,setIsAuthencated,user,setUser}}>
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><AppWrapper /></React.StrictMode>)            