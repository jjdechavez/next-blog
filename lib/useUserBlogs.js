import React from 'react'

export default function useUserBlogs(token) {
  const [blogs, setBlogs] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    async function getUserBlogs() {
      setLoading(true)
      setBlogs(null)
      setError(null)

      try {
        const response = await fetch('http://localhost:5000/todos/user', {
          credentials: 'include',
          headers: {
            authorization: token
          }
        })

        if (response.ok) {
          const blogs = await response.json()
          setBlogs(blogs)
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      getUserBlogs()
    }
  }, [token])

  return [loading, error, blogs]
}
