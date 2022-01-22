import { useRef, useState } from "react";
import AssetForm from './AssetForm';
import Description from './Description';
import EVAssets from "./EVAssets";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function App() {
  
 
  const [inputs, setInputs] = useState({nmcAsset: "", registration: ""});
  const navigate = useNavigate();


  const handleChange = e => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  }

  const { nmcAsset, registration } = inputs;

  

  return (
    <div className="App">
     <Routes>
      <Route path="/" element={<AssetForm inputs={inputs} handleChange={handleChange} />} />
      <Route path="/ev" element={<EVAssets options={{nmcAsset, registration}} />}/>
     </Routes>
     
    </div>
  );
}

export default App;
