import React from 'react'
import jsCookie from 'js-cookie'
import Router from 'next/router'

export const login = ({ token }) => {
  jsCookie.set('token', token, {
    secure: process.env.NODE_ENV === 'production'
  })

  Router.push('/')
}

