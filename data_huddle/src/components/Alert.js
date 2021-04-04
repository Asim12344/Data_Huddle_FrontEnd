import React from 'react';
import Alert from 'react-bootstrap/Alert'

const alert = (props) => {
    return (
        <Alert variant={props.variant}>
            <p>
                {props.message}
            </p>
        </Alert>
    )
}

export default alert