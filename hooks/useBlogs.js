import { useQuery } from 'react-query'

const getBlogs = async () => {
  const response = await fetch(process.env.serverBaseURL + '/blogs')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export default function useBlogs() {
  return useQuery('blogs', getBlogs)
}
