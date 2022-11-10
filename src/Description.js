import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  useClipboard,
  Textarea,
  Box,
} from '@chakra-ui/react';

const Description = ({title, punycode , nmcAsset, registration, category,
                     onLoad, translation, setTranslation}) => {
  const { hasCopied, onCopy } = useClipboard(title);
  const [description, setDescription] = useState("");
  const { hasCopied: hasCopiedDescription, onCopy: onCopyDescription } = useClipboard(description);

  useEffect(() => {
    if (punycode) {
      setDescription(`Decoded Asset: ${punycode}

Asset: ${nmcAsset}

Mint: ${registration}

A few pioneers in the blockchain space used an encoding language called "punycode" to encode various forms of art, emojis, alphabets and words as non-fungible assets, onto the Namecoin blockchain. In hindsight, this gave birth to one of the 1st NFT collections in the history of cryptographic collectables: Punycodes.

Total supply of Punycodes (2011-2017): 3,255

Note, Namecoin is a DNS & thus assets need to be renewed (every 8 months). Have a small $NMC in your vault & it'll autorenew.

2 $NMC = Autorenewal for 100+ years`)
    }
  }, [nmcAsset, punycode, registration])

   return (
    <Box w="100%" ml={24} mt={{base: "2em", xl: "0"}}>
        <FormControl w={{lg: "80%", xl: "70%", "2xl": "50%"}} mb={4} mt={{lg: "0", xl: "10em"}} px={{base: "2.5em", lg: "0"}}>
          <FormLabel>Title</FormLabel>
          <Flex>
            <Input type="text" value={title} isReadOnly={true} />
            <Button onClick={onCopy} ml={2}>
              {hasCopied ? 'Copied' : 'Copy'}
            </Button>
          </Flex>
        </FormControl>
        <FormControl w={{lg: "80%", xl: "95%", "2xl": "80%"}} mb={4} px={{base: "2.5em", lg: "0"}}>
          <FormLabel>Description</FormLabel>
          <Flex >
          <Textarea
              value={description}
              isReadOnly
              h="28em"
          />
            <Button onClick={onCopyDescription} ml={2}>
              {hasCopiedDescription ? 'Copied' : 'Copy'}
            </Button>
          </Flex>
        </FormControl>
        {category === "Text" && 
          <FormControl w={{lg: "80%", xl: "70%", "2xl": "50%"}} mb={4} px={{base: "2.5em", lg: "0"}}>
            <FormLabel>Translation (optional)</FormLabel>
            <Flex>
               <Input type="text" value={translation} onChange={e => setTranslation(e.target.value)}/>
               <Button onClick={onLoad} ml={2}>
                  Add to image
               </Button>
          </Flex>
          </FormControl>}
    </Box>
   )
}

export default Description;
