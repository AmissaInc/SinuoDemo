import React,  { PureComponent }  from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import axios from 'axios' //CDD
//import FirebaseIcon from 'mdi-react/FirebaseIcon';
//import withAuthFirebase from '../auth/withAuthFirebase';
//import { useAuth0 } from '../auth/withAuth0';
import Loading from '../Loading';
import LogInForm from './LogInForm';
import setAuthToken from './../../../utils/setAuthToken.js';
import {authLoginSuccess, authentication, authLoginFail} from './../../../redux/actions/authRegister';
//import GoogleAuthBtn from '../../../containers/Account/AuthBtn/googleAuthBtn';
//import FacebookAuthBtn from '../../../containers/Account/AuthBtn/fbAuthBtn';

const auth0Icon = `${process.env.PUBLIC_URL}/img/auth0.svg`;

class LoginCard extends PureComponent { 

  state = {
    email: '',
    password: '',
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

  // Login User
  login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
      try {
        const res = await axios.post('http://localhost:5000/api/auth', formData, config);
        authLoginSuccess(res.data);

        // dispatch({
        //   type: REGISTER_SUCCESS,
        //   payload: res.data
        // });
        this.loadUser();
        const { history } = this.props;
        //history.push('/log_in');
        console.log(res.data)
      } catch (err) {
        authLoginFail(err.response.data.msg)
        // dispatch({
        //   type: REGISTER_FAIL,
        //   payload: err.response.data.msg
        // });
        this.setState({ error: err.response.data.msg });
        //console.log(err.response.data.msg)
      }
  };

  // if (isAuthenticated) {
  //   history.push('/');
  // }

  render() {
    const { error } = this.state;
  return (
    <div className="account__wrapper">
      <div className="account__card">
        <div className="account__head">
          <h3 className="account__title">Welcome to Amissa Sinuo
            {/* <span className="account__logo"> Easy
              <span className="account__logo-accent">DEV</span>
            </span> */}
          </h3>
          <h4 className="account__subhead subhead">Your Alzheimer's Patient Portal.</h4>
        </div>
        <LogInForm
          onSubmit={this.login}
          form="log_in_form"
          errorMessage={error}
        />
        <div className="account__or">
          <p>Or Easily Using</p>
        </div>
      </div>
    </div>
  )}
}


// const LoginCard = ({ changeIsOpenModalFireBase }) => {
//   const {
//     loginWithRedirect, loading,
//   } = useAuth0();
//   if (loading) {
//     return (<Loading loading={loading} />);
//   }

//   return (
//     <div className="account__wrapper">
//       <div className="account__card">
//         <div className="account__head">
//           <h3 className="account__title">Welcome to Amissa Sinuo
//             {/* <span className="account__logo"> Easy
//               <span className="account__logo-accent">DEV</span>
//             </span> */}
//           </h3>
//           <h4 className="account__subhead subhead">Your Alzheimer's Patient Portal.</h4>
//         </div>
//         <LogInForm
//           onSubmit={login}
//           form="log_in_form"
//         />
//         <div className="account__or">
//           <p>Or Easily Using</p>
//         </div>
//         <div className="account__social">
//           <FacebookAuthBtn />
//           <GoogleAuthBtn />
//           <Button
//             className="account__social-btn account__social-btn--firebase"
//             onClick={changeIsOpenModalFireBase}
//           ><FirebaseIcon />
//           </Button>
//           <Button className="account__social-btn account__social-btn--auth0" onClick={() => loginWithRedirect({})}>
//             <img className="customizer__btn-icon" src={auth0Icon} alt="icon" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// LoginCard.propTypes = {
//   changeIsOpenModalFireBase: PropTypes.func.isRequired,
// };

export default withRouter(LoginCard);
