import './App.css';
import { useEffect, useRef, useState } from "react";
import AssetForm from './AssetForm';
const tr46 = require("tr46");

function App() {
  const imgEl = useRef(null);
  const canvasEl = useRef(null);
  const [title, setTitle] = useState("");
  const [punycode, setPunycode] = useState("");
  const [inputs, setInputs] = useState({nmcAsset: "", registration: ""});

  const handleChange = e => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  }

  const { nmcAsset, registration } = inputs;

  const onSubmit = e => {
    e.preventDefault();

    const punycode = nmcAsset.substring(nmcAsset.indexOf("/")+1,nmcAsset.length);

    const canvas = canvasEl.current;
    const imgWidth = imgEl.current.width;
    const imgHeight = imgEl.current.height;

    canvas.width = imgWidth;
    canvas.height = imgHeight;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(imgEl.current, 0, 0);

    ctx.font = "150px sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle";
    ctx.fillText(tr46.toUnicode(punycode).domain, imgWidth / 2, imgHeight / 2);

    ctx.font = "20px sans-serif";
    ctx.textAlign = "right";  
    ctx.fillText(punycode, imgWidth - 25, imgHeight - 55);
    ctx.fillText(`Registered on ${registration}`, imgWidth - 25, imgHeight - 30);

    setTitle(`${tr46.toUnicode(punycode).domain} | ${registration} | nmcAssets | ${nmcAsset}`);
    setPunycode(tr46.toUnicode(punycode).domain);

  }

  return (
    <div className="App">
     <AssetForm onSubmit={onSubmit} inputs={inputs} handleChange={handleChange} />
      <canvas ref={canvasEl}></canvas>
      {title && <div>
                <p>Title: {title}</p>
                <ul>
                  <li>
                    Decoded Asset: {tr46.toUnicode(punycode).domain}
                  </li>
                  <li>
                    Asset: {nmcAsset}
                  </li>
                  <li>
                    Mint: {registration}
                  </li>
                </ul>
                <p>
                A few pioneers in the blockchain space used an encoding language called "punycode" 
                to encode various forms of art, emojis, alphabets and words as non-fungible assets, 
                onto the Namecoin blockchain. In hindsight, this gave birth to one of the 1st NFT 
                collections in the history of cryptographic collectables: Punycodes.
                </p>
                <p>
                Note, Namecoin is a DNS & thus assets need to be renewed (every 9 months). Have a small $NMC in your vault & it'll autorenew.
                </p>
                <p>
                1 $NMC = Autorenewal for 5 years 
                </p>
                <p>
                10 $NMC = Autorenewal for 50 years
                </p>
              </div>}
      <div style={{ display: "none" }}>
        <img
          src="./nmcframe.png"
          ref={imgEl}
          alt="nmcframe"
        />
      </div>
    </div>
  );
}

export default App;
