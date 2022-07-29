import React from 'react'
import {Navigate, NavLink} from "react-router-dom";
import {Button, Col, Descriptions, Row} from "antd";

const ExtDescription = (props) => {
    const ext = props.ext;

    const onClick = () => {
        props.setEdit(true);
    }
    return (
        <React.Fragment>
        <Descriptions size={'small'} column={1} title={ext.label}>
            {
                Object.keys(ext).map((key) => {
                    return  <Descriptions.Item label={key}>{ext[key] || 'Нет'}</Descriptions.Item>
                })
            }
        </Descriptions>
        <Row gutter={20}>
            <Col span={2}>
                <Button onClick={onClick}> Редактировать</Button>
            </Col>
             <Col span={2}>
                <Button > <NavLink replace to={'/'}>На главную</NavLink> </Button>
            </Col>
        </Row>
    </React.Fragment>
    )
}

export default ExtDescription