import React from 'react'
import User from "../../model/User"
import styled from "styled-components";
import { Link } from "react-router-dom"

interface ComponentProps {
  follower: User
}

const FollowerCard: React.FC<ComponentProps> = ({ follower }) => {
  return (
    <ProfileInfo as={Link} to={`/profile/${follower.alias}`}>
      <ProfileImg src={follower.photo} alt="Profile" />
      <div>
        <div>{follower.name}</div>
        <div>@{follower.alias}</div>
      </div>
    </ProfileInfo>
  )
}

export default FollowerCard


const ProfileInfo = styled.div`
  display: flex;
  position: relative;
  padding: .8rem 0;
  border-bottom: 1px solid ${props => props.theme.grey["700"]};

`

const ProfileImg = styled.img`
  border-radius: 50%;
  height: 60px;
  width: 60px;
  margin: 0 1rem;
`
