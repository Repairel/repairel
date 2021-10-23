import Document, { Html, Head, Main, NextScript } from 'next/document';
import Footer from '@components/footer';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }


  render() {
    return (
      <Html>
        <Head>
        <script
          dangerouslySetInnerHTML={
            {
              __html: `
         (function(c,l,a,r,i,t,y){
             c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
             t=l.createElement(r);
             t.async=1;
             t.src="https://www.clarity.ms/tag/"+i;
             y=l.getElementsByTagName(r)[0];
             y.parentNode.insertBefore(t,y);
         })(window, document, "clarity", "script", "8z3d8a3ep2");`,
            }}
        />;
          <link
            href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700&display=swap'
            rel='stylesheet'
          />
          <link rel='icon' href='/favicon.ico' id='favicon' />
          <link
            rel='stylesheet'
            href='https://cdn.snipcart.com/themes/v3.0.22/default/snipcart.css'
          />
          <script
            async
            src='https://cdn.snipcart.com/themes/v3.0.22/default/snipcart.js'
          ></script>
          <div
            id='snipcart'
            data-api-key={process.env.SNIPCART_API_KEY}
            hidden
          ></div>
        </Head>
        <body>
          <Main />
          <br></br>
          <NextScript />

          <Footer></Footer>

        </body>
      </Html>
    );
  }
}

// Docs: https://github.com/vercel/next.js/tree/master/examples/with-styled-components
