import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Usuario';

class FellowUsuarios extends Component {

    state = {
        name: "",
        powers: "",
        hobbies: "",
        editing: ""
    }

    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestUsuarios();
    }

    addUsuario() {
        const usuario = { name: this.state.name, powers: this.state.powers, hobbies: this.state.hobbies };
        this.props.addUsuario(usuario);
        setTimeout(this.props.requestUsuarios, 500);
    }

    toggleEditing(itemId) {
        this.setState({ editing: itemId });
    }

    handleUsuarioUpdate(usuario) {
        this.props.updateUsuario(usuario);
        setTimeout(this.props.requestUsuarios, 500);
    }

    handleUsuarioDelete(usuario) {
        this.props.deleteUsuario(usuario);
        setTimeout(this.props.requestUsuarios, 500);
    }

    handleEditField(event) {
        if (event.keyCode === 13) {
            let target = event.target,
                update = {};

            update.name = this.state.editing;
            update[target.name] = target.value;
        }
    }

    handleEditItem() {
        let itemId = this.state.editing;

        var editUsuario = this.props.usuario.find((v) => v.name === itemId);

        editUsuario.powers = this.refs[`powers_${itemId}`].value;
        editUsuario.hobbies = this.refs[`hobbies_${itemId}`].value;

        this.handleUsuarioUpdate(editUsuario);
        this.setState({ editing: "" });
    }

    handleDeleteItem() {
        let itemId = this.state.editing;

        var deleteUsuario = this.props.usuario.find((v) => v.name === itemId);

        this.handleUsuarioDelete(deleteUsuario);
        this.setState({ editing: "" });
    }

    renderItemOrEditField(usuario) {
        if (this.state.editing === usuario.name) {
            return (
                <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.name}</td>
                    <td>
                        <input
                            onKeyDown={this.handleEditField}
                            type="text"
                            ref={`powers_${usuario.name}`}
                            name="powers"
                            defaultValue={usuario.powers}
                        />
                    </td>
                    <td>
                        <input
                            onKeyDown={this.handleEditField}
                            type="text"
                            ref={`hobbies_${usuario.name}`}
                            name="hobbies"
                            defaultValue={usuario.hobbies}
                        />
                    </td>
                    <td>
                        <button onClick={this.handleEditItem.bind(this)} label="Update Item" >Update</button>
                    </td>
                    <td>
                        <button onClick={this.handleDeleteItem.bind(this)} label="Delete Item" >Delete</button>
                    </td>
                </tr>);
        } else {
            return (
                <tr key={usuario.id}
                    onClick={this.toggleEditing.bind(this, usuario.name)}
                >
                    <td>{usuario.id}</td>
                    <td>{usuario.name}</td>
                    <td>{usuario.powers}</td>
                    <td>{usuario.hobbies}</td>
                    <td></td>
                    <td></td>
                </tr>);
        }
    }

    renderUsuariosTable(props) {
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
                    {props.usuarios.map(usuario =>
                        this.renderItemOrEditField(usuario)
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        return (
            <div>
                <h1>Fellow Usuários</h1>
                <p>This component demonstrates fetching data from the server and working with URL parameters.</p>
                {this.renderUsuariosTable(this.props)}

                <table>
                    <tbody>
                        <tr>
                            <td>
                                Name:
                        </td>
                            <td>
                                <input id="usuarioName" type="text" value={this.state.name} onChange={(ev) => this.setState({ name: ev.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Powers:
                        </td>
                            <td>
                                <input id="usuarioPowers" type="text" value={this.state.powers} onChange={(ev) => this.setState({ powers: ev.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Hobbies:
                        </td>
                            <td>
                                <input id="usuarioHobbies" type="text" value={this.state.hobbies} onChange={(ev) => this.setState({ hobbies: ev.target.value })} />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button onClick={this.addUsuario.bind(this)}>Add</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}


export default connect(
    state => state.usuarios,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(FellowUsuarios);
