import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from '@components/header';
import ProductList from '@components/productList';
import AppContext from "../context/AppContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import { Banner } from '../styles/global';
import { isLogged } from "../lib/auth"
import ReactGA from 'react-ga';
ReactGA.pageview('/');

export default function Home({ list }) {
  // console.log(list);
  const { user, setUser } = useContext(AppContext);
  const router = useRouter();

  // Whenevr the user was redirected from the edit form for some
  // unexplainable reason the app didn't think they were logged
  // in anymore, so this little hack helps prevent that issue by
  // reloading the page for the user.
  if (process.browser && router.asPath.includes("redirect=edit")) {
    router.push('/', '/', { shallow: true });
    setTimeout(() => {
      router.reload();
    }, 500);
  }

  return (
    <div>
      <Head>
        {/* This script below most likely only needs to exist in _document.js, which is where your <head> files are all clustered.
        Thus, removing the below duplicate should be fine, though I simply leave this here out of paranoi to avoid things breaking.
        In any case, all you need is this script below to implement MS Clarity analytics to your website. Currently, the value I have placed is 8z3d8a3ep2, which comes from my MS Clarity account.
        You should replace the valuewhich will come with your own MS Clarity account so that you can monitor heatmaps and similar on your account.  */}
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
        <script
          data-auto-affiliate="WHERE drmartens.com, www.drmartens.com SET tag = repairel-drmartens-affiliate"
          src="https://cdn.jsdelivr.net/npm/affiliate@4/dist/web/affiliate.web.js"
          async
          id="aff-js"
        ></script>
        <title id='title'>REPAIREL</title>
      </Head>
      <main>
        <Header />
        <ProductList list={list} />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const json = await res.json();
  return { props: { list: json } };
}

Home.propTypes = {
  list: PropTypes.array,
};
