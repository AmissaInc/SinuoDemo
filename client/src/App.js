import React, { Component, Fragment } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { hot } from 'react-hot-loader';
import 'bootstrap/dist/css/bootstrap.css';
import '../../scss/app.scss';
//import Router from './Router';
import store from './store';
import ScrollToTop from './ScrollToTop';
import { config as i18nextConfig } from '../../translations';
import Layout from '../../Layout/index';
//import Loading from '../../shared/components/Loading';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loaded: false,
    };
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      this.setState({ loading: false });
      setTimeout(() => this.setState({ loaded: true }), 500);
    });
  }

  onRedirectCallbackAuth0 = (appState) => {
    window.history.replaceState(
      {},
      document.title,
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  }

  render() {
    const { loaded, loading } = this.state;
    return (
      <Provider store={store}>
          <BrowserRouter basename="/SinuoDashboard/">
            <I18nextProvider i18n={i18next}>
              <ScrollToTop>
                <Fragment>
                  {!loaded
                    && (
                      <Loading loading={loading} />
                    )
                  }
                  <div>
                    <Layout />
                  </div>
                </Fragment>
              </ScrollToTop>
            </I18nextProvider>
          </BrowserRouter>
      </Provider>
    );
  }
}

export default hot(module)(App);
