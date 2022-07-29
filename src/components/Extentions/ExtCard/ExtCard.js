import React from 'react'
import {Card, Col} from "antd";
import {NavLink} from "react-router-dom";

const ExtCard = (props) => {
    return (
        <Col span={8}>
            <Card title={props.title} bordered={false} extra={<NavLink to={'/extentions/' + props.id}>Подробнее</NavLink>}>
                {props.content}
            </Card>
        </Col>
    )
}

export default ExtCard;