import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as firebase from 'firebase/app';
import RegisterForm from '../../../shared/components/login/RegisterForm';
import axios from 'axios' //CDD
import {authRegisterSuccess,authentication, authRegisterFail} from './../../../redux/actions/authRegister';
import setAuthToken from './../../../utils/setAuthToken.js';

class Register extends PureComponent {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  state = {
    token: localStorage.getItem('token'), //CDD
    isAuthenticated: null, //CDD
    user: null, //CDD
    error: null //CDD
  };

  loadUser = async () => {
    console.log("Here")
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get('http://localhost:5000//api/auth');
      authentication(res.data)
    } catch (err) {
      //dispatch({ type: AUTH_ERROR });
      console.log(err)
    }
  };

  // registerFireBase = (user) => {
  //   const { history } = this.props;
  //   firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  //     .then(() => {
  //       history.push('/log_in');
  //     })
  //     .catch((error) => {
  //       this.setState({ error: error.message });
  //       console.log(error)
  //     });
  // };
// Register User
    register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
      try {
        const res = await axios.post('http://localhost:5000/api/users', formData, config);
        authRegisterSuccess(res.data);

        // dispatch({
        //   type: REGISTER_SUCCESS,
        //   payload: res.data
        // });
        this.loadUser();
        const { history } = this.props;
        history.push('/log_in');
        console.log(res.data)
      } catch (err) {
        authRegisterFail(err.response.data.msg)
        // dispatch({
        //   type: REGISTER_FAIL,
        //   payload: err.response.data.msg
        // });
        this.setState({ error: err.response.data.msg });
        //console.log(err.response.data.msg)
      }
  };

  render() {
    const { error } = this.state;
    return (
      <div className="account account--not-photo">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__head">
              <h3 className="account__title">Welcome to
                <span className="account__logo"> Ami
                  <span className="account__logo-accent">ssa</span>
                </span>
              </h3>
              <h4 className="account__subhead subhead">Create an account</h4>
            </div>
            <RegisterForm onSubmit={this.register} errorMessage={error}/>
            <div className="account__have-account">
              <p>Already have an account? <Link to="/log_in">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
