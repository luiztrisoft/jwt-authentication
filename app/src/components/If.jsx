import React from 'react';
import PropTypes from 'prop-types';

const If = (props) => {
    if (props.test) {
        return <div className={props.divClass}>{props.children}</div>;
    }

    return false;
};

If.propTypes = {
    test: PropTypes.any
};

export default If;