import React, { useState } from "react";
import CustomHeader from "../../components/private/CustomHeader/CustomHeader";
import LateralMenu from "../../components/private/LateralMenu/LateralMenu";
import CatalogContent from "../../components/private/CatalogContent/CatalogContent";
import {Container, Row, Col} from 'react-bootstrap'

import { Layout, Menu } from 'antd'

const { Header, Content, Footer, Sider } = Layout;


function Home() {

    //Manejo de datos heredados
    const [filter, setFilter] = useState('')
    const getFilterData = (e) => setFilter(e)

    return(
        <Layout style={{ minHeight: "100vh" }}>
            <CustomHeader />
            <Content>
                <Container style={{ paddingTop: '100px'}}>
                    <div className="contentProps">
                        <Row>
                            <Col sm={3}>
                                <LateralMenu filterData={getFilterData}/>
                            </Col>
                            <Col sm={9}>
                                <CatalogContent filter={filter}/>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Catálogo ©2022 Created by Jonatán Amado</Footer>
        </Layout>
    )
}

export default Home;

