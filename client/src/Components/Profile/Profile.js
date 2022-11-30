import React from 'react'
import LogoSearch from '../../LogoSearch/LogoSearch'
import FollowersCard from '../FollowersCard/FollowersCard'
import ProfileCard from '../ProfileCard/ProfileCard'
import './Profile.css'

const Profile = () => {
  return (
    <div className='profileSide'>
      <LogoSearch />
      <ProfileCard />
      <FollowersCard /> 
    </div>
  )
}

export default Profile