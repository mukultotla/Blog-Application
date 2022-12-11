import { useState } from 'react'
import { Box, TextField, Button, Typography, styled } from '@mui/material'
// import { API } from '../../service/api'
import axios from '../../service/api'

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    margin-top: 70px;
    box-shadow: 4px 2px 4px 2px rgb(0 0 0/ 0.6);
`

const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0 0'
})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`

const Text = styled(Typography)`
    color: #878787;
    font-size: 15;
    text-align: center;
`

const SignUpButton = styled(Button)`
    box-shadow: 0 2px 4px 2px rgb(0 0 0/ 20%)
`
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
const signupInitialValues = {
    name: '',
    username: '',
    password: ''
}
const Login = () => {
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account, setAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues)
    const [error, setError] = useState('')
    const toggleSignUp = () => {
        account === 'login' ? setAccount('signUp') : setAccount('login')
    }
    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }

    const signupUser = async () => {
        console.log('signup -> ', signup)
        // console.log('API -> ', API)
        // let response = await API.userSignup(signup)
        let response = axios.post('/signup', signup);
        console.log('response --> ', response);
        if (response) {
            setSignup(signupInitialValues)
            setAccount('login')
            setError('')
        } else {
            setError('Something went wrong!')  
        }
    }
    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="login"></Image>
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" label="Enter username" />
                            <TextField variant="standard" label="Enter password" />
                            <Button variant="contained">Login</Button>
                            <Text>OR</Text>
                            <SignUpButton onClick={toggleSignUp}>Create an account</SignUpButton>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant="standard" label="Enter name" onChange={(e) => onInputChange(e)} name='name' />
                            <TextField variant="standard" label="Enter username" onChange={(e) => onInputChange(e)} name='username' />
                            <TextField variant="standard" label="Enter password" onChange={(e) => onInputChange(e)} name='password' />
                            <Button variant="contained" onClick={() => signupUser()}>Sign Up</Button>
                            {error && <Error>{error}</Error>}
                            <Text>OR</Text>
                            <SignUpButton onClick={toggleSignUp}>Already have an account</SignUpButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login