import { useRef, useState } from "react";
import Description from "./Description";
import { useParams } from "react-router-dom";
import Punycodes from "./punycodes";
import { format, parseISO } from 'date-fns';
import { SimpleGrid, Flex, Spacer } from '@chakra-ui/react'
import Graphemer from 'graphemer';

const tr46 = require("tr46");
const SCALE = 1;



const EVAssets = () => {
    const canvasEl = useRef(null);
    const imgEl = useRef(null);
    const [title, setTitle] = useState("");
    const [unicode, setUnicode] = useState("");
    const {prefix, punycode} = useParams();
    const [translation, setTranslation] = useState("");

    const nmcAsset = prefix.concat("/"+punycode);
    const punyDescription = Punycodes.find(({ ID }) => ID === nmcAsset);
    const {Day, Month, Year, Category} = punyDescription;
    const monthFormatted = Month < 10 ? `0${Month}` : Month;
    const dayFormatted = Day < 10 ? `0${Day}` : Day;
    const date = `${Year}-${monthFormatted}-${dayFormatted}`;

    const registrationImage = format(parseISO(date), "yyyy-MM-dd");
    const registrationTitle = format(parseISO(date), "yyyy-MM");
    const registrationDescription = format(parseISO(date), "MMM do, yyyy");

    const calculateFontSize = (unicode, Category) => {
      const splitter = new Graphemer();

      const graphemeCount = splitter.countGraphemes(unicode);
      console.log({graphemeCount})
      switch(Category) {
        case "Emoji":
          let size = "150px";
          if (graphemeCount >= 11) {
            size = "45px"
          }
          return size;
        case "Text":
          return "120px";
        case "ASCII Art":
          if (graphemeCount > 6) {
            if (graphemeCount >= 11) {
              return "70px";
            }
            return "80px";
          }
          return "100px";
        default:
          return "150px";
      }
    }

    const onLoad = () => {   
        const punycode = nmcAsset.substring(nmcAsset.indexOf("/")+1,nmcAsset.length);
        const convertedPunycode = tr46.toUnicode(punycode).domain;
        
        const fontSize = calculateFontSize(convertedPunycode, Category);
        setUnicode(convertedPunycode);
    
        const canvas = canvasEl.current;
        const imgWidth = imgEl.current.width;
        const imgHeight = imgEl.current.height;
    
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        const ctx = canvas.getContext("2d");
        ctx.scale(SCALE, SCALE);

    
        ctx.drawImage(imgEl.current, imgWidth*(1-SCALE), imgHeight*(1-SCALE));
    
        ctx.font = `${fontSize} sans-serif`
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.textBaseline = "middle";
        ctx.fillText(convertedPunycode, imgWidth*(1-SCALE + 1/2), imgHeight*(1-SCALE+ 1/2));
        if (Category === "Text") {
          ctx.font = "45px sans-serif";
          if (translation !== "") {
            ctx.fillText(`(${translation})`, imgWidth*(1-SCALE + 1/2), imgHeight*(1-SCALE+ 1/2)+100);
          }
        }

    
        ctx.font = "20px sans-serif";
        ctx.textAlign = "right";  
        ctx.fillText(nmcAsset, imgWidth*(2-SCALE)-35, imgHeight*(2-SCALE)-68);
        ctx.fillText(`${registrationImage}`, imgWidth*(2-SCALE) - 35, imgHeight*(2-SCALE) - 43);
    
        setTitle(`${convertedPunycode} | ${registrationTitle} | Punycodes | ${nmcAsset}`);
   };    

    return (
    <>
     <Flex direction={{base: "column", xl: "row"}}>
       <canvas ref={canvasEl} style={{marginLeft: "8vh", marginTop: "8vh"}}></canvas>
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
     </Flex>
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