import clienteAxios from "./axios";
import PropTypes from 'prop-types';

const tokenAuth = token => {
    if (token) {
        clienteAxios.defaults.headers.common['Authorization'] = `token ${token}`;
    } else {
        delete clienteAxios.defaults.headers.common['Authorization'];
    }
}

tokenAuth.propTypes = {
    token: PropTypes.string.isRequired
}

export default tokenAuth;