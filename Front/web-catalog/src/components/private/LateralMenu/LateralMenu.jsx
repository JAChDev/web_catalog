import React from "react";
import { useState } from "react";
import './LateralMenu.css'
import {Container, Row, Col, Button} from 'react-bootstrap'
import { Form, Input, Select, Radio } from 'antd'

// Variables globales
const categoryList = [
    {key: 'All', text:'Todos'},
    {key: 'Higiene y Salud', text:'Higiene y Salud'},
    {key: 'Limpieza', text:'Limpieza'},
    {key: 'Tecnología', text:'Tecnología'},
    {key: 'Alimentos', text:'Alimentos'},
    {key: 'Herramientas y materiales', text:'Herramientas y materiales'},
    {key: 'Libros y revistas', text:'Libros y revistas'},
    {key: 'Papelería y útiles escolares', text:'Papelería y útiles escolares'},
    {key: 'Juguetería', text:'Juguetería'},
    {key: 'Deportes', text:'Deportes'},
    {key: 'Ropa y accesorios', text:'Ropa y accesorios'}
]

function LateralMenu({filterData}) {

    const { Option } = Select;
    // Función para organizar qué datos se envían de acuerdo a los casos del filtro
    const Filter = (e) => {

        let queryParams = 
            (e.category == '' || e.category == undefined || e.category == "All" ? 'All' : e.category) +'&'+ 
            (e.product == '' || e.product == undefined ? 'Empty' : e.product) + '&' +
            (e.description == '' || e.description == undefined ? 'Empty' : e.description)
            
        filterData(queryParams)
    }

    const filterMenu = 
        <Container>
            <Row>
                <Col>
                    <Form
                        layout="vertical"
                        autoComplete="off"
                        name="loginForm"
                        onFinish={Filter}
                        initialValues={{category: categoryList[0].key}}
                    >
                        <p className="label">Categoría</p>
                        <Form.Item
                            name="category"
                        >
                            <Select>
                                {categoryList.map((ctg) => (
                                    <Option value={ctg.key} key={ctg.key}>
                                        {ctg.text}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <p className="label">Producto</p>
                        <Form.Item
                            name="product"
                        >
                            <Input />
                        </Form.Item>
                        <p className="label">Descripción</p>
                        <Form.Item
                            name="description"
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item>
                            <div className="btnContainer">
                                <Button type="submit" className="btnSearch">
                                    Buscar
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Container>     
    
    return(
        <div className="filterMenu">
            <Container>
                <Row>
                    <Col>
                        {filterMenu}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LateralMenu;