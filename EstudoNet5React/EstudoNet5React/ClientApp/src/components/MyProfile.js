import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Usuario';

class FellowUsuarios extends Component {

    componentWillMount() {
        if (this.props.match.params.id !== "0")
            this.props.requestUsuario(this.props.match.params.id);
    }

    renderItem(usuario) {
        return (
            <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.name}</td>
                <td>{usuario.powers}</td>
                <td>{usuario.hobbies}</td>
                <td></td>
                <td></td>
            </tr>);
    }

    renderUsuarioTable(props) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Powers</th>
                        <th>Hobbies</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.renderItem(props.usuario)
                    }
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div>
                <h1>Fellow usuario</h1>
                {this.renderUsuarioTable(this.props)}
            </div>
        );
    }
}


export default connect(
    state => state.usuarios,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(FellowUsuarios);
