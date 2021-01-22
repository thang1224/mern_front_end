import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Modal, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createCategory, getAllCategory } from '../../actions'
import Layout from '../../components/Layout'
import NewModal from '../../components/Modal'
import Input from '../../components/UI/Input'

/**
* @author
* @function Category
**/

const Category = (props) => {

    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');





    const handleClose = () => {

        const form = new FormData();
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(createCategory(form));
        setCategoryName('');
        setParentCategoryId('');
        // const cat = {
        //     categoryName,
        //     parentCategoryId,
        //     categoryImage
        // }

        setShow(false);
    }
    const handleShow = () => setShow(true);
    const renderCategories = (categories) => {
        let categoryList = [];
        for (let category of categories) {
            categoryList.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        return categoryList;
    }
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

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }


    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                            {/* {JSON.stringify(renderCategories(category.categories))} */}
                        </ul>
                    </Col>
                </Row>

            </Container>
            <NewModal show={show} 
            handleClose={handleClose}
            modalTitle={'Add new Category'}>
                <Input
                    label={'Category Name'}
                    value={categoryName}
                    placeholder={'Category Name'}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select
                    className="form-control"
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)}>
                    <option>Select Category</option>
                    {
                        creatCategoryList(category.categories).map(
                            option => <option key={option.value} value={option.value}> {option.name} </option>
                        )
                    }
                </select>
                <input className="form-control" type="file" name="categoryImage" onChange={handleCategoryImage} />
            </NewModal>
        </Layout>
    )

}

export default Category