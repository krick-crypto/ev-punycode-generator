import { useRef, useState } from "react";
import AssetForm from './AssetForm';
import Description from './Description';
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
    const convertedPunycode = tr46.toUnicode(punycode).domain;
    setPunycode(convertedPunycode);

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
    ctx.fillText(convertedPunycode, imgWidth / 2, imgHeight / 2);

    ctx.font = "20px sans-serif";
    ctx.textAlign = "right";  
    ctx.fillText(punycode, imgWidth - 25, imgHeight - 55);
    ctx.fillText(`Registered on ${registration}`, imgWidth - 25, imgHeight - 30);

    setTitle(`${convertedPunycode} | ${registration} | nmcAssets | ${nmcAsset}`);

  }

  return (
    <div className="App">
     <AssetForm onSubmit={onSubmit} inputs={inputs} handleChange={handleChange} />
      <canvas ref={canvasEl}></canvas>
      {title && <Description 
                    title={title} 
                    punycode={punycode} 
                    mcAsset={nmcAsset} 
                    registration={registration}
                    />}
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
