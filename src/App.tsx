import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import RandU from "./components/RandomUsers";
import RandQ from "./components/RandomQuotes"

function App() {


  return (
    <div>
    <RandU></RandU>
    <RandQ></RandQ>
    </div>
    
    
  )
}

export default App
