import { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
  useClipboard,
  Textarea,
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
    <div>
        <FormControl w="50%" mb={4} mt="17%">
          <FormLabel>Title</FormLabel>
          <Flex>
            <Input type="text" value={title} isReadOnly={true} />
            <Button onClick={onCopy} ml={2}>
              {hasCopied ? 'Copied' : 'Copy'}
            </Button>
          </Flex>
        </FormControl>
        <FormControl w="80%">
          <FormLabel>Description</FormLabel>
          <Flex >
          <Textarea
              value={description}
              isReadOnly
              h="40vh"
          />
            <Button onClick={onCopyDescription} ml={2}>
              {hasCopiedDescription ? 'Copied' : 'Copy'}
            </Button>
          </Flex>
        </FormControl>
    </div>
   )
}

export default Description;