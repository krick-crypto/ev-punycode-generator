import {useState} from "react";
import { Center } from '@chakra-ui/react';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";


const AssetForm = () => {
    const [nmcAsset, setNmcAsset] = useState("");
    const navigate = useNavigate();

    const handleChange = e => {
        setNmcAsset(e.target.value);
      }
    
    const onSubmit = (e) => {
        e.preventDefault();

        navigate(`/${nmcAsset}`)
    }

    return (
    <Center width="100vw" height="100vh">
        <form onSubmit={onSubmit}>
            <FormControl mb={4}>
                <FormLabel htmlFor="nmcAsset">Asset</FormLabel>
                <Input id="nmcAsset" name="nmcAsset" type="text"
                    value={nmcAsset} onChange={handleChange}/>
            </FormControl>
            <Button type="submit">Generate</Button>
        </form>
    </Center>   
     )
}

export default AssetForm;