const requestUsuariosType = 'REQUEST_USUARIOS';
const receiveUsuariosType = 'RECEIVE_USUARIOS';
const requestUsuarioType = 'REQUEST_USUARIO';
const receiveUsuarioType = 'RECEIVE_USUARIO';
const addUsuarioType = 'ADD_USUARIO';
const updateUsuarioType = 'UPDATE_USUARIO';
const deleteUsuarioType = 'DELETE_USUARIO';
const requestSigninType = 'REQUEST_SIGNIN';
const receiveSigninType = 'RECEIVE_SIGNIN';
const initialState = { usuarios: [], usuario: {}, currId: 0, isLoading: false, signedin: false };

let allusuarios = [];
let currentusuario = {};

export const actionCreators = {
    requestUsuarios: () => async (dispatch, getState) => {
        dispatch({ type: requestUsuariosType });

        const url = `api/Usuarios`;
        const response = await fetch(url);
        const allusuarios = await response.json();

        dispatch({ type: receiveUsuariosType, allusuarios });
    },

    requestUsuario: (id) => async (dispatch, getState) => {
        dispatch({ type: requestUsuarioType });

        const url = `api/Usuarios/GetUsuario/${id}`;
        const response = await fetch(url);
        const usuario = await response.json();

        dispatch({ type: receiveUsuarioType, usuario });
    },

    addUsuario: (usuario) => async (dispatch, getState) => {
        const baseURL = "/api/usuarios";

        const data = JSON.stringify(
            { name: usuario.name, powers: usuario.powers, hobbies: usuario.hobbies }
        );

        const fetchTask = fetch(baseURL, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        })
            .then((data) => {
                dispatch({ type: addUsuarioType, usuario: data });
            });
    },

    updateUsuario: (usuario) => async (dispatch, getState) => {
        const baseURL = "/api/usuarios";

        const data = JSON.stringify(
            { id: usuario.id, name: usuario.name, powers: usuario.powers, hobbies: usuario.hobbies }
        );

        const fetchTask = fetch(baseURL, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: data
        })
            .then((data) => {
                dispatch({ type: updateUsuarioType, usuario: data });
            });
    },

    deleteUsuario: (usuario) => async (dispatch, getState) => {
        const baseURL = "/api/usuarios";

        const fetchTask = fetch(baseURL + "/" + usuario.id, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        })
            .then((data) => {
                dispatch({ type: deleteUsuarioType });
            });
    },
    signin: (id) => async (dispatch, getState) => {
        dispatch({ type: requestSigninType });

        const url = `api/Usuarios/GetUsuario/${id}`;
        const response = await fetch(url);
        const usuario = await response.json();

        dispatch({ type: receiveSigninType, usuario });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestUsuariosType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveUsuariosType) {
        allusuarios = action.allusuarios;

        return {
            ...state,
            villains: allusuarios,
            isLoading: false
        };
    }

    if (action.type === requestUsuarioType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveUsuarioType) {
        currentusuario = action.usuario;

        return {
            ...state,
            villain: currentusuario,
            isLoading: false
        };
    }

    if (action.type === addUsuarioType) {

        return {
            ...state,
            isLoading: false
        };
    }

    if (action.type === updateUsuarioType) {

        return {
            ...state,
            isLoading: false
        };
    }

    if (action.type === deleteUsuarioType) {

        return {
            ...state,
            isLoading: false
        };
    }

    if (action.type === requestSigninType) {

        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveSigninType) {
        var user = action.usuario.name;
        var message = "has loggged on";
        window.connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });

        return {
            ...state,
            signedin: true,
            currId: action.usuario.id,
            isLoading: false
        };
    }

    return state;
};
