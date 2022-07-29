import React from 'react'
import {PageHeader, Row} from "antd";
import ExtCard from "./ExtCard/ExtCard";

const Extentions = (props) => {
    return (
        <React.Fragment>
            <PageHeader
                className="site-page-header"
                title="Добавочные номера"
            />
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    {
                        props.extentions.map(ext => {
                            return <ExtCard key={ext.id} id={ext.id} title={ext.label} content={ext.name} />
                        })
                    }

                </Row>
            </div>

        </React.Fragment>
    )
}

export default Extentions;