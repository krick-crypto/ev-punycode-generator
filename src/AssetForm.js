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
    const [inputs, setInputs] = useState({nmcAsset: "", registration: ""});
    const {nmcAsset, registration} = inputs;
    const navigate = useNavigate();

    const handleChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value});
      }
    
    const onSubmit = (e) => {
        e.preventDefault();

        navigate(`/${nmcAsset}/${registration}`)
    }

    return (
    <Center width="100vw" height="100vh">
        <form onSubmit={onSubmit}>
            <FormControl mb={6}>
                <FormLabel htmlFor="nmcAsset">Asset</FormLabel>
                <Input id="nmcAsset" name="nmcAsset" type="text"
                    value={nmcAsset} onChange={e => handleChange(e)}/>
            </FormControl>
            <FormControl mb={4}>
             <FormLabel htmlFor="registration">Registered on</FormLabel>
                <Input id="registration" name="registration" type="text"
                    value={registration} onChange={e => handleChange(e)}/>
            </FormControl>
            <Button type="submit">Generate</Button>
        </form>
    </Center>   
     )
}

export default AssetForm;