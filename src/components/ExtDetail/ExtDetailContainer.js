import React, {useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import ExtDetail from "./ExtDetail";
import {useParams} from "react-router-dom";
import {setEdit, updateExt} from "../../redux/ext-reducer";
import {config} from "../../config";
import {message} from "antd";

const ExtDetailContainer = (props) => {
    const {extId} = useParams();

    const extention = props.extentions.find((ext => {
        return ext.id == extId
    }))

    useEffect(() => {
        switch (props.extStatus) {
            case config.messageStatuses.success:
                message.success('Данные успешно изменены')
                break;
            case config.messageStatuses.error:
                message.error('Ошибка изменения данных')
                break;
        }
    }, props.extStatus)

    return (
        <React.Fragment>
            <ExtDetail
                extId={extId} edit={props.edit}
                updateExt={props.updateExt}
                setEdit={props.setEdit}
                extention={extention}
                token={props.token}
                tokeType={props.tokenType}
                userId={props.userId}
            />
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
        edit: state.extReducer.edit,
        extentions: state.extReducer.extentions,
        token: state.authReducer.token,
        tokenType: state.authReducer.tokenType,
        userId: state.authReducer.userId,
        extStatus: state.extReducer.extStatus

    }
}

const mapDispatchToProps = {
    setEdit: setEdit,
    updateExt: updateExt
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps), withAuthRedirect
)(ExtDetailContainer)