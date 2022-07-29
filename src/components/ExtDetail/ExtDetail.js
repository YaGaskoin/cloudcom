import React from 'react';
import ExtDescription from "./ExtDescription/ExtDescription";
import ExtForm from "./ExtForm/ExtForm";

const ExtDetail = (props) => {
    return (
        <React.Fragment>
            {
                props.edit ?
                    <ExtForm
                        updateExt={props.updateExt}
                        initialValues={props.extention}
                        setEdit={props.setEdit}
                        token={props.token}
                        tokenType={props.tokeType}
                        userId={props.userId}
                        extId={props.extId}
                    /> :
                    <ExtDescription setEdit={props.setEdit} ext={props.extention}/>
            }
        </React.Fragment>
    )
}

export default ExtDetail;