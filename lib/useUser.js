import React from 'react'

export default function useUser(token) {
  const [user, setUser] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    async function getUser(token) {
      setError(null)
      setLoading(true)
      setUser('')

      try {
        const response = await fetch('http://localhost:5000/users/info', {
          credentials: 'include',
          headers: {
            authorization: token
          }
        })

        if (response.ok) {
          const user = await response.json()
          setUser(user)
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      getUser(token)
    }
  }, [token])

  return [loading, error, user]
}
