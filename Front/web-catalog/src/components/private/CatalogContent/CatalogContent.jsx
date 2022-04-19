import React from "react";
import './CatalogContent.css'
import { useState, useEffect } from "react";
import {Container, Row, Col, Button, Card} from 'react-bootstrap'
import { Form, Modal, Input, Select, Upload, Table, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPlus,
    faPen,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

// Variables globales
let dataTable = []
let selectRegister = []
let valuesEdit = {}

const columns = [
    {
        title:'',
        aling: 'center',
        render: (text, record) =>
            <img src={record.imgPath} alt={record.name} className="imgContent"/>
    },
    {
        title:'Nombre del producto',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
        title:'Descripción',
        dataIndex: 'description',
        sorter: (a, b) => a.description.localeCompare(b.description)
    },
    {
        title:'Categoría del producto',
        dataIndex: 'type'
    }
    
]
const categoryList = [
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

const rowSelection = {
    onChange: (selectedRowKeys, selectedRow) => {
      selectRegister = []
      selectRegister.push(selectedRow[0])
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

function CatalogContent(filter) {

    const [table, setTable] = useState([]) // Forzar renderizado inicial
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [requestStatus, setRequestStatus] = useState('')

    const [form] = Form.useForm();

    useEffect(()=>{
        let params = (filter.filter == '' ? 'All&Empty&Empty' : filter.filter)
        getData(params)
    },[filter,requestStatus])

    // Controles de editar y eliminar productos
    const openEdit = () => {
        if (selectRegister.length < 1) {
            Modal.error({
                content: 'Debe seleccionar un producto para editarlo',
            })
        } else {
            setShowEdit(true)
            setRequestStatus('')
            form.setFieldsValue({
                Name: selectRegister[0].name,
                Description: selectRegister[0].description,
                category: selectRegister[0].type,
                upload: selectRegister[0].imgPath
            })
        }
    }

    const executeDelete = () => {
        if (selectRegister.length < 1) {
            Modal.error({
                content: 'Debe seleccionar un producto para eliminarlo',
            })
        } else {
            setRequestStatus('')
            Modal.confirm({
                title: 'Confirmar eliminación',
                icon: <ExclamationCircleOutlined />,
                content: 'Seguro que desea eliminar este registro?',
                okText: 'Si',
                cancelText: 'No',
                onOk() {deleteUser()}
            });
            
        }
    }

    // Consumos
    const getData = (queryParams) => {
        axios
        .get('https://localhost:5001/api/catalog/getItemsByFilter/'+queryParams)
        .then(({data}) => {
            dataTable = []
            data.items.map((e)=>{
                dataTable.push({
                    id: e.i,
                    key: e.i,
                    name: e.name,
                    description: e.description,
                    type: e.type,
                    imgPath: e.imagePath
                })
            })
            //Forzar renderizado cada vez que se ejecuta la función
            setTable(dataTable)
        })
    }

    const createUser = (e) => {
        axios
        .post('https://localhost:5001/api/catalog/addItems', {name: e.Name, description: e.Description, type: e.category, imagePath: e.upload})
        setShowCreate(false)
        setRequestStatus('')
        Modal.success({
            content: 'Producto creado exitosamente',
            onOk() {setRequestStatus('create')}
        })
    }

    const editUser = (e) => {
        axios
        .put('https://localhost:5001/api/catalog/updateItems', {id: selectRegister[0].id ,name: e.Name, description: e.Description, type: e.category, imagePath: e.upload})
        setShowEdit(false)
        Modal.success({
            content: 'Producto actualizado exitosamente',
            onOk() {setRequestStatus('update')}
        })
    }

    const deleteUser = () => {
        axios
        .delete(`https://localhost:5001/api/catalog/deleteItems/${selectRegister[0].id}&${selectRegister[0].name}`)
        Modal.success({
            content: 'Producto eliminado exitosamente',
            onOk() {setRequestStatus('delete')}
        })
    }


    // Redenrizando catálogo

    return(
        <Container style={{ paddingBottom: '10px'}}>    
            <Row>
                
                <Col>
                    <div className="btnContent">
                        <Button className="contentBtn" onClick={()=>setShowCreate(true)}>
                            <FontAwesomeIcon icon={faPlus} size="sm" />
                        </Button>
                        <Button className="contentBtn" onClick={openEdit}>
                            <FontAwesomeIcon icon={faPen} size="sm" />
                        </Button>
                        <Button className="contentBtn" onClick={executeDelete}>
                            <FontAwesomeIcon icon={faTrash} size="sm" />
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <div className="content__card">
                    <Table 
                        scroll={{ y: 310 }} 
                        rowSelection={{type: "radio", ...rowSelection}}
                        columns={columns}
                        dataSource={[...dataTable]}
                    />
                </div>
            </Row>
            <Modal
                visible={showCreate}
                onCancel={() => setShowCreate(false)}
                centered
                maskClosable={false}
                footer={null}
                destroyOnClose
                zIndex={1050}
            >
                <Container>
                    <div className="titleControl">
                        <p className="labelFilter">Crear producto</p>
                    </div>
                    <Row>
                        <Form
                            layout="vertical"
                            autoComplete="off"
                            name="createForm"
                            onFinish={createUser}
                            initialValues={{category: categoryList[0].key}}
                        >
                            <p className="labelModal">Nombre</p>
                            <Form.Item 
                                name="Name"
                                rules={
                                    [{
                                        required: true,
                                        message: 'Nombre del producto requerido'
                                    }]
                                }
                            >
                                <Input/>
                            </Form.Item>
                            <p className="labelModal">Descripción</p>
                            <Form.Item name="Description"
                                rules={
                                    [{
                                        required: true,
                                        message: 'Descripción del producto requerida'
                                    }]
                                }
                            >
                                <Input.TextArea/>
                            </Form.Item>
                            <p className="labelModal">Categoría</p>
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
                            <p className="labelModal">Imagen URL</p>
                            <Form.Item name="upload"
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: 'Imagen del producto requerida'
                                        },
                                        {
                                            type: "url",
                                            message: "Inserte la URL de la imagen"
                                        }
                                    ]
                                }
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <div className="btnContainer">
                                    <Button type="submit" className="btnSearch">
                                        Agregar producto
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Row>
                </Container>
            </Modal>
            <Modal
                visible={showEdit}
                onCancel={() => setShowEdit(false)}
                centered
                maskClosable={false}
                footer={null}
                destroyOnClose
                zIndex={1050}
            >
                <Container>
                    <div className="titleControl">
                        <p className="labelFilter">Actualizar producto</p>
                    </div>
                    <Row>
                        <Form
                            layout="vertical"
                            autoComplete="off"
                            name="createForm"
                            onFinish={editUser}
                            form={form}
                            initialValues={{
                                Name: valuesEdit.name,
                                Description: valuesEdit.description,
                                category: valuesEdit.type,
                                upload: valuesEdit.imgPath
                            }}
                        >
                            <p className="labelModal">Nombre</p>
                            <Form.Item 
                                name="Name"
                                rules={
                                    [{
                                        required: true,
                                        message: 'Nombre del producto requerido'
                                    }]
                                }
                            >
                                <Input/>
                            </Form.Item>
                            <p className="labelModal">Descripción</p>
                            <Form.Item name="Description"
                                rules={
                                    [{
                                        required: true,
                                        message: 'Descripción del producto requerida'
                                    }]
                                }
                            >
                                <Input.TextArea/>
                            </Form.Item>
                            <p className="labelModal">Categoría</p>
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
                            <p className="labelModal">Imagen URL</p>
                            <Form.Item name="upload"
                                rules={
                                    [
                                        {
                                            required: true,
                                            message: 'Imagen del producto requerida'
                                        },
                                        {
                                            type: "url",
                                            message: "Inserte una URL válida"
                                        }
                                    ]
                                }
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <div className="btnContainer">
                                    <Button type="submit" className="btnSearch">
                                        Actualizar producto
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </Row>
                </Container>
            </Modal>
        </Container>
    )
}

export default CatalogContent;