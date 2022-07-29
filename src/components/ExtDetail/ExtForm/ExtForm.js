import React from 'react'
import {Button, Col, Form, Input, message, PageHeader, Row, Select} from 'antd';


const ExtForm = (props) => {

    const [form] = Form.useForm();
    form.setFieldsValue(props.initialValues);


    const onClick = () => {
        props.setEdit(false);
    }

    const onFinish = (values) => {
        props.updateExt(props.token, props.tokenType, props.extId, props.userId, values)
        props.setEdit(false);
    }

    return (<div>
            <PageHeader
                className="site-page-header"
                title="Редактирование добавочного номера"
            />
            <div className={'profile-form'}>
                <Form form={form} onFinish={onFinish}
                      initialValues={{...props.initialValues}}
                      labelCol={{
                          span: 3,
                      }}
                      wrapperCol={{
                          span: 12,
                      }}
                      layout="horizontal"
                      size={'default'}
                >
                    <Form.Item label="caller_id_name" name={'caller_id_name'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="dial_rule_id " name={'dial_rule_id '}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="dial_rule_limit" name={'dial_rule_limit'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="did_as_transfer_caller_id " name={'did_as_transfer_caller_id '}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="extension_group_id" name={'extension_group_id'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="extra_params" name={'extra_params'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="label" name={'label'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="message_did" name={'message_did'}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="status" name={'status'}>
                        <Select>
                            <Select.Option value={'active'}>active</Select.Option>
                            <Select.Option value={'blocked'}>blocked</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Row gutter={20}>
                            <Col span={4}>
                                <Button type="primary" htmlType="submit">
                                    Сохранить
                                </Button>
                            </Col>
                            <Col span={4}>
                                <Button onClick={onClick}>
                                    Назад
                                </Button>
                            </Col>
                        </Row>


                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}

export default ExtForm