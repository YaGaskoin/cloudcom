import React from 'react'
import {Button, Form, Input, PageHeader} from "antd";


const AuthForm = (props) => {


    const onFinish = (values) => {
        props.authenticate(values.username, values.password)

    }

    return (
        <React.Fragment>
            <PageHeader
                className="site-page-header"
                title="Добавить задачу"
            />
            <div className={'profile-form'}>
                <Form onFinish={onFinish}
                      labelCol={{
                          span: 3,
                      }}
                      wrapperCol={{
                          span: 14,
                      }}
                      layout="horizontal"
                      size={'default'}
                >
                    <Form.Item label="Имя пользователя" name={'username'}
                               rules={[{required: true, message: 'Введите имя пользователя!'}]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Пароль" name={'password'}
                               rules={[{required: true, message: 'Введите пароль'}]}>
                        <Input type={'password'}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Добавить задачу
                        </Button>

                    </Form.Item>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default AuthForm;