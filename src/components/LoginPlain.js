import React, { useReducer } from 'react';
import { login } from '../components/utils/Login';

const loginReducer = (state, action) => {
    switch (action.type) {
        case 'field':
            return {
                ...state,
                [action.field]:action.value
            }
        case 'log_in':
            return {
                ...state,
                isLoading: true,
                error: ''
            };
        case 'success':
            return {
                ...state,
                isloggedin: true
            }
        case 'error':
            return {
                ...state,
                error: 'wrong id or password',
                isLoading: false,
                username: '',
                password: ''
            }
        case 'log_out':
            return {
                ...state,
                isloggedin: false,
                username:'',
                password:''
            }
        default:
            return state;
    }
}

export default function LoginPlain() {
    const [state, dispatch] = useReducer(loginReducer, {
        username: '',
        password: '',
        isLoading: false,
        isloggedin: false,
        error: ""
    })
    const { username,
        password,
        isLoading,
        isloggedin,
        error } = state;
        
    const handleOnsubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'log_in' })
        try {
            await login(username, password);
            dispatch({ type: 'success' });
        } catch (error) {
            dispatch({ type: 'error' });
        }
    }

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    // const [isloggedin, setIsloggedin] = useState(false);
    // const [error, setError] = useState('')
    // const handleOnsubmit = async (e) => {
    //     e.preventDefault();
    //     setIsLoading(true);
    //     setError('');
    //     try {
    //         await login(username, password);
    //         setIsloggedin(true);
    //     } catch (error) {
    //         setError('incorrect password or id');
    //     }
    //     setIsLoading(false);
    // }

    return (
        <div className="login-container">
            {isloggedin ?
                <><h1>Hello! User: {username}</h1>
                    <button onClick={() => dispatch({type:'log_out'})}>Log out</button> </> : (
                    <form onSubmit={handleOnsubmit} className="form">

                        {error && <p className='error'>{error}</p>}
                        <p>Please login!</p>
                        <input type="text"
                            placeholder="username" onChange={
                                (e) =>dispatch({type:'field', field:'username',value:e.target.value}) 
                                } />
                        <input type="password" placeholder="password"
                            autoComplete="new-password" onChange={(e) => dispatch({type:'field', field:'password',value:e.target.value})} />
                        <input type="submit" value="Submit!" />
                    </form>
                )}
        </div>
    )
}
