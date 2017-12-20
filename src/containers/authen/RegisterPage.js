import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {userActions} from '../../actions';
import {userConstants} from "../../constants/userConstants";
import {alertAuthenActions} from "../../actions/alertAuthenActions";
import {history} from "../../helpers/history";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                email: '',
                typeuser: userConstants.TYPE_USER_IS_NORMAL,
            },
            isTeacher: false,
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeIsTeacher = this.handleChangeIsTeacher.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(userActions.logout());
    };

    handleChange(event) {
        const {name, value} = event.target;
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
    handleChangeIsTeacher(event){
        const {user} = this.state;
        if(event.target.checked){
            this.setState({
                user: {
                    ...user,
                    typeuser: userConstants.TYPE_USER_IS_TEACHER
                }
            });
        } else {
            this.setState({
                user: {
                    ...user,
                    typeuser: userConstants.TYPE_USER_IS_NORMAL
                }
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({submitted: true});
        const {user} = this.state;
        const {dispatch} = this.props;
        if (user.firstName && user.lastName && user.username && user.password && user.email) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const {registering, alertAuthen} = this.props;
        const {user, isTeacher, submitted} = this.state;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alertAuthen.message &&
                        <div className={`alert ${alertAuthen.type}`}>{alertAuthen.message}</div>
                        }
                        <div className="col-md-6 col-md-offset-3">
                            <h2>Register</h2>
                            <form name="form" onSubmit={this.handleSubmit}>
                                <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control" name="firstName" value={user.firstName}
                                           onChange={this.handleChange}/>
                                    {submitted && !user.firstName &&
                                    <div className="help-block">First Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" name="lastName" value={user.lastName}
                                           onChange={this.handleChange}/>
                                    {submitted && !user.lastName &&
                                    <div className="help-block">Last Name is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" name="username" value={user.username}
                                           onChange={this.handleChange}/>
                                    {submitted && !user.username &&
                                    <div className="help-block">Username is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control" name="email" value={user.email}
                                           onChange={this.handleChange}/>
                                    {submitted && !user.email &&
                                    <div className="help-block">Email is required</div>
                                    }
                                </div>
                                <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password"
                                           value={user.password}
                                           onChange={this.handleChange}/>
                                    {submitted && !user.password &&
                                    <div className="help-block">Password is required</div>
                                    }
                                </div>
                                <div className="form-group">
                                    <div className="controls">
                                        <label className="checkbox-inline">
                                            <input type="checkbox" name="isTeacher"
                                                   value={isTeacher} onChange={this.handleChangeIsTeacher}/>
                                            Is Teacher
                                        </label>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary">Register</button>
                                    {registering &&
                                    <img
                                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                                    }
                                    <Link to="/login" className="btn btn-link">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {registering} = state.registration;
    const {alertAuthen} = state
    return {
        registering,
        alertAuthen
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export {connectedRegisterPage as RegisterPage};