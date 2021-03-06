import React from 'react'

export default function useUserBlogs(token) {
  const [blogs, setBlogs] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  async function getUserBlogs(token) {
    setLoading(true)
    setBlogs([])
    setError(null)

    try {
      const response = await fetch('http://localhost:5000/blogs/user', {
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

  React.useEffect(() => {
    if (token) {
      getUserBlogs(token)
    }
  }, [token])

  const handlers = React.useMemo(
    () => ({
      refetchBlogs: (token) => {
        getUserBlogs(token);
      },
    }),
    []
  );

  return [loading, error, blogs, handlers]
}
