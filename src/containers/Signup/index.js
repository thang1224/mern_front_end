import React, { useState } from 'react'
import Layout from '../../components/Layout';
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from '../../components/UI/Input';
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../../actions';
/**
* @author
* @function Signup
**/

const Signup = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const auth = useSelector(state => state.auth);
    
    const userSignup = (e) => {

        e.preventDefault();
        const user = {
            firstName, lastName, email, password, username
        }
        dispatch(signup(user));
    }

    
    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }
    if(user.loading){
        return <p>Loading...!</p>
    }

    



    return (
        <Layout style={{ textAlign: 'left' }}>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label="First Name"
                                        placeholder="First Name"
                                        value={firstName}
                                        type="text"
                                        onChange={(e) => setFirstName(e.target.value) }
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        controlId=""
                                        label="Last Name"
                                        placeholder="Last Name"
                                        value={lastName}
                                        type="text"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Input
                                controlId="formBasicEmail"
                                label="Email address"
                                placeholder="Email address"
                                value={email}
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <Input
                                controlId="formBasicPassword"
                                label="Password"
                                placeholder="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Input
                                controlId=""
                                label="Username"
                                placeholder="Username"
                                value={username}
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <Button variant="primary" type="submit">
                                Sign up
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )

}

export default Signup