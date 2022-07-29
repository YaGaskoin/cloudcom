import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {getExts} from "../../redux/ext-reducer";
import Extentions from "./Extentions";

const ExtentionsContainer = (props) => {

    useEffect(() => {
           props.getExts(props.token, props.tokenType, props.userId)
    }, [])


    return (
        <React.Fragment>
            <Extentions extentions={props.extentions}/>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.isAuth,
        token: state.authReducer.token,
        tokenType: state.authReducer.tokenType,
        userId: state.authReducer.userId,
        extentions: state.extReducer.extentions
    }
}

const mapDispatchToProps = {
    getExts: getExts
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps), withAuthRedirect
)(ExtentionsContainer)