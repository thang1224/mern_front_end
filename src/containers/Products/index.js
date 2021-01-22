import React, { useState } from 'react'
import Layout from '../../components/Layout';
import { Col, Container, Row, Table } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/product.action';
import NewModal from '../../components/Modal';

/**
* @author
* @function Products
**/

const Products = (props) => {

    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [desceription, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [show, setShow] = useState(false);
    const product = useSelector(state => state.product);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    const handleClose = () => {
        const form = new FormData();
        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', desceription);
        form.append('category', categoryId);
        for (let pic of productPictures) {
            form.append('productPicture', pic);
        }

        dispatch(addProduct(form));
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const creatCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name
            });
            if (category.children.length > 0) {
                creatCategoryList(category.children, options);
            }
        }
        //console.log(options);
        return options;
    }

    const handleProductPictures = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ]);
    }

    const renderProducts = () => {
        return (
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Description</th>
                        <th>Product Pictures</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map(product =>
                                <tr key={product._id}>
                                    <td>2</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.description}</td>
                                    <td>--</td>
                                    
                                </tr>
                            ) : null
                    }

                </tbody>
            </Table>
        );
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Product</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>
            <NewModal show={show}
                handleClose={handleClose}
                modalTitle={'Add new product'}>
                <Input
                    label={'Product Name'}
                    value={name}
                    placeholder={'Product Name'}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    label={'Quantity'}
                    value={quantity}
                    placeholder={'Quantity'}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    label={'Price'}
                    value={price}
                    placeholder={'Price'}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    label={'Description'}
                    value={desceription}
                    placeholder={'Description'}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className="form-control"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}>
                    <option>Select Category</option>
                    {
                        creatCategoryList(category.categories).map(
                            option => <option key={option.value} value={option.value}> {option.name} </option>
                        )
                    }
                </select>
                {
                    productPictures.length > 0 ?
                        productPictures.map((pic, index) => <div key={index}>{pic.name}</div>) : null
                }
                <input type="file" name="productPicture" onChange={handleProductPictures} />
            </NewModal>
        </Layout>
    )

}

export default Products