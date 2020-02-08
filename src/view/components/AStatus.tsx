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
    let user = UserService.getUserByAlias(status.alias)
    if (user) {
      setUser(user)
    }
  }, [user, status])

  if (!user) return <></>;

  return (
    <StyledStatus>
      <ProfileInfo>
        <ProfileImg src={user.photo} alt="Profile" />
        <Col>
          <StyledName as={Link} to={`/profile/${status.alias}`}>{user.name}</StyledName>
          <StyledAlias as={Link} to={`/profile/${status.alias}`}>@{user.alias}</StyledAlias>
          <DaMessage>
            {status.message}
          </DaMessage>
        </Col>
      </ProfileInfo>
    </StyledStatus>
  )
}

export default AStatus

const StyledStatus = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.grey["700"]};
`

const ProfileInfo = styled.div`
  display: flex;
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
  font-size: 16px;
`

const StyledAlias = styled.h5`
  font-size: 14px;
  color: ${props => props.theme.grey["400"]};
`

const DaMessage = styled.p`
`
