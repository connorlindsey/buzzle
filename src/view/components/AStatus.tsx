import React, { useState, useEffect } from 'react'
import Status from '../../model/Status'
import styled from "styled-components";
import { Link } from 'react-router-dom';
import User from '../../model/User';
import UserService from '../../services/UserService';

interface StatusProps {
  status: Status
}

const AStatus: React.FC<StatusProps> = ({ status }) => {
  const [user, setUser] = useState<User>()
  useEffect(() => {
    let user = UserService.getUserByID(status.userId)
    if (user) {
      setUser(user)
    }
  }, [user, status])

  if (!user) return <></>;

  return (
    <StyledStatus>
      <ProfileInfo as={Link} to={`/profile/${status.userId}`}>
        <ProfileImg src={user.photo} alt="Profile" />
        <Col>
          <StyledName>{user.name}</StyledName>
          <StyledAlias>{user.alias}</StyledAlias>
        </Col>
      </ProfileInfo>
      <DaMessage>
        {status.message}
      </DaMessage>
    </StyledStatus>
  )
}

export default AStatus

const StyledStatus = styled.div`
padding: 1rem;
`

const ProfileInfo = styled.div`

`

const ProfileImg = styled.img`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin: 0 1rem;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledName = styled.h4`

`

const StyledAlias = styled.h5`

`

const DaMessage = styled.p`

`
