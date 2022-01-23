import { useRef, useState } from "react";
import Description from "./Description";
import { useParams } from "react-router-dom";
import Punycodes from "./punycodes";
import { format, parseISO } from 'date-fns';
import { SimpleGrid, Box } from '@chakra-ui/react'


const tr46 = require("tr46");


const EVAssets = () => {
    const canvasEl = useRef(null);
    const imgEl = useRef(null);
    const [title, setTitle] = useState("");
    const [unicode, setUnicode] = useState("");
    const {prefix, punycode} = useParams();
    const [translation, setTranslation] = useState("");

    const nmcAsset = prefix.concat("/"+punycode);
    const punyDescription = Punycodes.find(({ ID }) => ID === nmcAsset);
    const {Date, Category} = punyDescription;
    const registrationImage = format(parseISO(Date), "yyyy-MM-dd");
    const registrationTitle = format(parseISO(Date), "yyyy-MM");
    const registrationDescription = format(parseISO(Date), "MMM do, yyyy");

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
        ctx.scale(0.7, 0.7);

    
        ctx.drawImage(imgEl.current, imgWidth*0.3, imgHeight*0.3);
    
        ctx.font = Category === "Text" ? "120px sans-serif" : "150px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.textBaseline = "middle";
        ctx.fillText(convertedPunycode, imgWidth*(0.3 + 1/2), imgHeight*(0.3+ 1/2));
        if (Category === "Text") {
          ctx.font = "45px sans-serif";
          ctx.fillText(`(${translation})`, imgWidth*(0.3 + 1/2), imgHeight*(0.3+ 1/2)+100);
        }

    
        ctx.font = "20px sans-serif";
        ctx.textAlign = "right";  
        ctx.fillText(nmcAsset, imgWidth*1.3-35, imgHeight*1.3-68);
        ctx.fillText(`${registrationImage}`, imgWidth*1.3 - 35, imgHeight*1.3 - 43);
    
        setTitle(`${convertedPunycode} | ${registrationTitle} | Punycodes | ${nmcAsset}`);
   };    

    return (
    <>
     <SimpleGrid columns={{lg: 1, xl: 2}}>
       <canvas ref={canvasEl}></canvas>
          <Description 
            title={title} 
            punycode={unicode} 
            nmcAsset={nmcAsset} 
            registration={registrationDescription}
            category={Category}
            translation={translation}
            setTranslation={setTranslation}
            onLoad={onLoad}
          /> 
     </SimpleGrid>
      <div style={{ display: "none" }}>
        <img
            src="/ev-punycode-generator/nmcframe.png"
            ref={imgEl}
            alt="nmcframe"
            onLoad={onLoad}
        />
      </div>           
      </>
    );
}

export default EVAssets;