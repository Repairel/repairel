import Header from '@components/header';
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import Socials from '@components/socials';
import Link from 'next/link';
import { LinedHeading, StyledSection } from '../styles/global';
import { StyledLink } from '../styles/global';
import Edit from '@components/edit';


const PROFILE = ({ user }) => {
    console.log(user);
  return (
    <>
      <Head>
        <title id='title'>REPAIREL | PROFILE</title>
      </Head>
      <Header />
      <StyledSection>
        <main style={{ margin: '1rem' }}>
          <LinedHeading>PROFILE - blah</LinedHeading>
          <Edit user={user}></Edit>
        </main>
        <footer style={{marginBottom: '1rem'}}>
          <Socials />
        </footer>
      </StyledSection>
    </>
  );
};

export async function getServerSideProps(context) {
    const parsedItems = {};
    let return_user = null;
    if (context.req.headers.cookie) {
      const cookiesItems = context.req.headers.cookie.split('; ');
      cookiesItems.forEach(cookies => {
        const parsedItem = cookies.split('=');
        parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
      });
    }
    const token = parsedItems['token']
    if (token) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(async (res) => {
        if (!res.ok) {
        Cookie.remove("token");
      }
      const user = await res.json();
      return_user = user;
       });
    }
    return{ props: { user: return_user }
  
    }
  }

export default PROFILE;
