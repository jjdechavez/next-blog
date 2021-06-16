import React from 'react'
import { useQueryClient } from 'react-query'
import Layout from '../components/layout'
import BlogPost from '../components/blog/Card'
import {getToken} from '../lib/auth'
import {
  useDisclosure
} from '@chakra-ui/react';
import useUserBlogs from '../hooks/useUserBlogs'
import useUser from '../hooks/useUser'
import BlogPostSkeleton from '../components/blog/CardSkeleton'
import ProfileHeader from '../components/profile/Header'
import { displayText } from '../components/utils'


export default function Profile() {
  const queryClient  = useQueryClient()
  const token = getToken()
  const {
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
    data: user
  } = useUser();
  const {
    isLoading: isUserBlogsLoading,
    isError: isUserBlogsError,
    error: userBlogsError,
    data: blogs
  } = useUserBlogs()

  let renderUserHeader = null

  renderUserHeader = isUserLoading 
    ? <BlogPostSkeleton noOfSkeletons={2} />
    : isUserError ? displayText(userError.message)
    : !user ? displayText("User does not exist")
    : <ProfileHeader user={user} />

  let renderBlogs = null

  renderBlogs = isUserBlogsLoading 
    ? <BlogPostSkeleton noOfSkeletons={2} />
    : isUserBlogsError ? displayText(userBlogsError.message)
    : !blogs.length > 0 ? displayText("We don't have blogs right now")
    : blogs.map((post, index) => (
        <BlogPost 
          post={post} 
          latest={index} 
          key={post._id}
          ownerId={user._id} 
          refetchBlogs={queryClient.invalidateQueries('userTodos')}
          token={token}
        />
      ))

  return (
    <Layout profile>
      {renderUserHeader}
      {renderBlogs}
    </Layout>
  );
}
