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

const Description = ({title, punycode , nmcAsset, registration}) => {
  const { hasCopied, onCopy } = useClipboard(title);
  const [description, setDescription] = useState("");
  const { hasCopied: hasCopiedDescription, onCopy: onCopyDescription } = useClipboard(description);
  
  useEffect(() => {
    if (punycode) {
      setDescription(`Decoded Asset: ${punycode}
Asset: ${nmcAsset}
Mint: ${registration}
      
A few pioneers in the blockchain space used an encoding language called "punycode" to encode various forms of art, emojis, alphabets and words as non-fungible assets, onto the Namecoin blockchain. In hindsight, this gave birth to one of the 1st NFT collections in the history of cryptographic collectables: Punycodes.
      
Note, Namecoin is a DNS & thus assets need to be renewed (every 9 months). Have a small $NMC in your vault & it'll autorenew.
1 $NMC = Autorenewal for 5 years
10 $NMC = Autorenewal for 50 years`)
    }
  }, [nmcAsset, punycode, registration])

   return (
    <Box ml={{lg: "5em", xl:"0"}}>
        <FormControl w={{lg: "80%", xl: "70%", "2xl": "50%"}} mb={4} mt={{lg: "0", xl: "10em"}} px={{base: "2.5em", lg: "0"}}>
          <FormLabel>Title</FormLabel>
          <Flex>
            <Input type="text" value={title} isReadOnly={true} />
            <Button onClick={onCopy} ml={2}>
              {hasCopied ? 'Copied' : 'Copy'}
            </Button>
          </Flex>
        </FormControl>
        <FormControl w={{lg: "80%", xl: "95%", "2xl": "80%"}} px={{base: "2.5em", lg: "0"}}>
          <FormLabel>Description</FormLabel>
          <Flex >
          <Textarea
              value={description}
              isReadOnly
              h="22em"
          />
            <Button onClick={onCopyDescription} ml={2}>
              {hasCopiedDescription ? 'Copied' : 'Copy'}
            </Button>
          </Flex>
        </FormControl>
    </Box>
   )
}

export default Description;