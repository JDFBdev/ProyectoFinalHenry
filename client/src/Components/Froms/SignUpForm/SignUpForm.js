import React from 'react';
import s from './SignUpForm.module.css';
import ReactTooltip from 'react-tooltip';
import validate from '../../../validations';
import { useMutation } from '@apollo/client';
import Mutations from '../../../Utils/Mutations';
import routes from '../../../Helpers/Routes';

export default function SignUpForm({ close }) {
    const url = window.location.href.slice(21);

    const [RegisterUsers] = useMutation(Mutations.REGISTER_USERS, {
        onError: err => {
            console.log('ERRORES', err.graphQLErrors[0])
        }
    })

    const [input, setInput] = React.useState({
        username: '',
        name: '',
        lastname: '',
        addres: '',
        phone: '',
        password: '',
        passwordConfirm: '',
        email: '',
        rool: '',
    });
    const [errors, setErrors] = React.useState({});
    const [errorData, setErrorData] = React.useState();

    const handleInputChange = function (e) {    // esta funcion recibe los inputs para majearlos.

        setInput(prevInput => ({ ...prevInput, [e.target.name]: e.target.value }));  // copiamos el estado y la propiedad e.target.name definile el valor del evento

        let errors = validate.Register({ ...input, [e.target.name]: e.target.value }); // pasamos el valor ingresado en vez del estado, porque puede que no este modificado todavia!
        setErrors(errors);

        let arr = [];
        for (const err in errors) {
            arr.push(errors[err]);
        }

        setErrorData(arr.join('\n'))

    }

    const handleSelector = function(e){
        setInput(prevInput => ({ ...prevInput, rool: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let response = await RegisterUsers({
            variables: {
                "input": {
                    "username": input.username,
                    "name": input.name,
                    "last_name": input.lastname,
                    "email": input.email,
                    "addres": input.addres,
                    "phone": input.phone,
                    "password": input.password,
                    "rool": input.rool,
                }
            }
        })

        const resp = response.data.RegisterUsers.message
        alert(resp)
        close()
    }

    console.log(input);
    return (
        <div className={s.container} >
            <div>
                <h1 className={s.title}>Sign Up</h1>
            </div>
            <div>
                <form>
                    {/*  Inputs */}
                    <div className={s.inputs}>
                        <div className={s.inputDiv1}>
                            <input
                                className={s.inputName}
                                type='text'
                                name='username'
                                placeholder={'Username...'}
                                value={input.username}
                                onChange={handleInputChange} />
                            <input
                                className={s.inputLastname}
                                type='text' name='name'
                                placeholder={'Name...'}
                                value={input.name}
                                onChange={handleInputChange} />
                        </div>
                        <div className={s.inputDiv2}>
                            <input
                                className={s.inputName}
                                type='text'
                                name='lastname'
                                placeholder={'Lastname...'}
                                value={input.lastname}
                                onChange={handleInputChange} />
                            <input
                                className={s.inputEmail}
                                type='text'
                                name='email'
                                placeholder={'Email...'}
                                value={input.email}
                                onChange={handleInputChange} />
                        </div>
                        <div className={s.inputDiv2}>
                            <input
                                className={s.inputName}
                                type='text'
                                name='addres'
                                placeholder={'Address...'}
                                value={input.addres}
                                onChange={handleInputChange} />
                            <input
                                className={s.inputEmail}
                                type='text'
                                name='phone'
                                placeholder={'Phone...'}
                                value={input.phone}
                                onChange={handleInputChange} />
                        </div>
                        <div className={s.inputDiv2}>
                            <input
                                className={s.inputPassword1}
                                type='text'
                                name='password'
                                placeholder={'Password...'}
                                value={input.password} onChange={handleInputChange} />
                            <input
                                className={s.inputEmail}
                                type='text'
                                name='passwordConfirm'
                                placeholder={'Repeat Password...'}
                                value={input.passwordConfirm}
                                onChange={handleInputChange} />
                        </div>
                        <div className={s.inputDiv3}>
                            {url===routes.AdminMainPage && 
                                <select className={s.inputPassword2} onChange={handleSelector}>
                                    <option value="regular">Regular</option>
                                    <option value="cook">Cook</option>
                                    <option value="cashier">Cashier</option>
                                    <option value="metre">Metre</option>
                                    <option value="admin">Admin</option>
                                    <option selected value={null} >Role</option>
                                </select>
                            }
                            {
                                (input.name !== '' && input.username !== ''
                                    && !errors.lastname
                                    && !errors.password
                                    && !errors.passwordConfirm
                                    && !errors.email) ?
                                    <button
                                        className={s.btnRegister}
                                        type="submit"
                                        onClick={handleSubmit}
                                    >Register</button> :
                                    <button
                                        className={s.btnRegisterError}
                                        data-tip data-for='tooltip'
                                        onClick={(e) => e.preventDefault()}
                                    >Register</button>
                            }
                            {(Object.keys(errors).length > 0) ? (
                                <ReactTooltip className={s.tooltip} id='tooltip' place='top' effect="solid" >
                                    {errorData.split("\n").map((i, key) => {
                                        return <div key={key}>{i}</div>;
                                    })}
                                </ReactTooltip>) : null
                            }
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}