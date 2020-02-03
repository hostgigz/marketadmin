import "../assets/styles.less";

import App from "next/app";

import AppProvider from "../components/shared/AppProvider";
import { GlobalStyles } from "../components/styles/GlobalStyles";
import Head from "next/head";
import NProgress from "nprogress";
import Page from "../components/Page";
import Router from "next/router";
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import withReduxSaga from "next-redux-saga";
import createStore from "../redux/store";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // const pageProps = Component.getInitailProps ? await Component.getInitialProps(ctx) : {};

    let ie = false;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    pageProps.query = ctx.query;
    pageProps.ieBrowser = ie;
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <>
        <GlobalStyles />
        <Head>
          <meta
            name="viewport"
            content="user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height"
          />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="shortcut icon" href="/static/images/triangle.png" />
          <title>One - React Next.js Ant Design Dashboard</title>
          <link
            href="https://fonts.googleapis.com/css?family=Nunito:300,400,600,700,800&display=swap"
            rel="stylesheet"
          />

          {pageProps.ieBrowser && (
            <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js" />
          )}
        </Head>
        <Provider store={store}>
          <AppProvider>
            <Page>
              <Component {...pageProps} />
            </Page>
          </AppProvider>
        </Provider>
      </>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
