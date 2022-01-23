import { useRef, useState } from "react";
import Description from "./Description";
import { useParams } from "react-router-dom";
import Punycodes from "./punycodes";
import { format, parseISO, formatISO } from 'date-fns';


const tr46 = require("tr46");


const EVAssets = () => {
    const canvasEl = useRef(null);
    const imgEl = useRef(null);
    const [title, setTitle] = useState("");
    const [unicode, setUnicode] = useState("");
    const {prefix, punycode} = useParams();

    const nmcAsset = prefix.concat("/"+punycode);
    const punyDescription = Punycodes.find(({ ID }) => ID === nmcAsset);
    const {Date} = punyDescription;
    console.log(punyDescription);
    const registration = format(parseISO(Date), "yyyy-MM-dd");

    const onLoad = () => {   
        const punycode = nmcAsset.substring(nmcAsset.indexOf("/")+1,nmcAsset.length);
        const convertedPunycode = tr46.toUnicode(punycode).domain;
        

        setUnicode(convertedPunycode);
    
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
        ctx.fillText(nmcAsset, imgWidth - 25, imgHeight - 55);
        ctx.fillText(`Registered on ${registration}`, imgWidth - 25, imgHeight - 30);
    
        setTitle(`${convertedPunycode} | ${registration} | nmcAssets | ${nmcAsset}`);
   };    

    return (
    <>
     
     <canvas ref={canvasEl}></canvas>
      <Description 
        title={title} 
        punycode={unicode} 
        mcAsset={nmcAsset} 
        registration={registration}
      /> 
      <div style={{ display: "none" }}>
        <img
            src="/nmcframe.png"
            ref={imgEl}
            alt="nmcframe"
            onLoad={onLoad}
        />
      </div>           
      </>
    );
}

export default EVAssets;