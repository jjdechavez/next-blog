import React, { useEffect } from 'react'
import jsCookie from 'js-cookie'
import Router from 'next/router'
import nextCookies from 'next-cookies'

export const login = ({ token }) => {
  jsCookie.set('token', token, {
    secure: process.env.NODE_ENV === 'production'
  })

  Router.push('/')
}

export const logout = () => {
  jsCookie.remove('token')
  Router.push('/')
}

export const auth = ctx => {
  const { token } = nextCookies(ctx)

  if (!token) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { Location: "/login" });
      ctx.res.end();
    } else {
      Router.push("/login");
    }
  }

  return token;
}

export const withAuthSync = Component => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === "logout") {
        Router.push('/')
      }
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
      }
    }, [])

    return <Component {...props} />
  }

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);

    const componentProps =
      Component.getInitialProps &&
      (await Component.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
}
