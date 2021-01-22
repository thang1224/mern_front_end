import React, { useState } from 'react'
import Layout from '../../components/Layout';
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from '../../components/UI/Input';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
/**
* @author
* @function Signin
**/

const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const userLogin = (e) => {

        e.preventDefault();

        const user = {
            email, password
        }

        dispatch(login(user));
    }
    if(auth.authenticate){
        return <Redirect to={'/'}/>
    }

    return (
        <Layout style={{textAlign: 'left!important'}}>
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit = {userLogin}>
                            <Input
                                controlId = "formBasicEmail"
                                label = "Email address"
                                placeholder = "Email address"
                                value = {email}
                                type = "text"
                                onChange = { (e) => setEmail(e.target.value)}
                            />
                            <Input
                                controlId = "formBasicPassword"
                                label = "Password"
                                placeholder = "Password"
                                value = {password}
                                type = "password"
                                onChange = { (e) => setPassword(e.target.value)}
                                errorMessage = "Password require min length is 6 characters"
                            />
                            
                                
                            
                            <Button variant="primary" type="submit">
                                Sign in
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )

}

export default Signin