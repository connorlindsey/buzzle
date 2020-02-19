import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from "react-router-dom";
import PleaseSignIn from './components/PleaseSignIn';
import ServerFacade from '../network/ServerFacade';
import User from '../model/User';
import Button from "./style/Button"
import { FiArrowLeft } from "react-icons/fi"
import styled from "styled-components";

import Story from './components/Story';
import FollowList from './components/FollowList';
import FollowerService from '../services/FollowerService';
import UserService from '../services/UserService';

enum TAB_SELECTION {
  STORY,
  FOLLOWING,
  FOLLOWERS
}

// Page to display the profile of any users based on an alias passed as a query parameter
const ProfileView: React.FC = () => {
  const history = useHistory()
  const { alias } = useParams();
  const [user, setUser] = useState<User | null>()
  const [selection, setSelection] = useState<TAB_SELECTION>(TAB_SELECTION.STORY)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const [canFollow, setCanFollow] = useState<boolean>(true)

  const updateUser = useCallback(
    async () => {
      if (alias) {
        setUser(await ServerFacade.getUserByAlias(alias))
        let ID = localStorage.getItem("USER_ID")
        if (user && user.id === ID) {
          setCanFollow(false)
        } else if (ID) {
          setIsFollowing(await UserService.checkIsFollowing(ID, alias))
        }
      }
    }, [user, alias]
  )

  // Calculate the following relationship
  useEffect(() => {
    updateUser()
  }, [updateUser])

  if (!user || !alias) {
    return (
      <Container>
        <h3>No user found with the following username: @{alias}</h3>
      </Container>)
  }

  const handleFollow = async () => {
    if (isFollowing) {
      await FollowerService.removeFollower(alias);
    } else {
      await FollowerService.addFollower(alias);
    }
    setIsFollowing(!isFollowing)
  }

  // Handle tabs
  let content;
  switch (selection) {
    case TAB_SELECTION.STORY:
      content = <Story ID={user.id} />
      break;
    case TAB_SELECTION.FOLLOWERS:
      content = <FollowList ID={user.id} followers={true} />
      break;
    case TAB_SELECTION.FOLLOWING:
      content = <FollowList ID={user.id} followers={false} />
      break;
    default:
      content = <h2>An error has occurred</h2>
  }


  return (
    <PleaseSignIn>
      <Container>
        {/* Profile Section */}
        <Header>
          {/* Info */}
          <ProfileSection>
            <ProfileInfo>
              <BackArrow onClick={() => history.goBack()} />
              <ProfileImg src={user.photo} alt="Profile" />
              <div>
                <div>{user.name}</div>
                <div>@{user.alias}</div>
              </div>
            </ProfileInfo>
            {canFollow &&
              <FollowButton following={isFollowing} onClick={handleFollow}>{isFollowing ? "Following" : "Follow"}</FollowButton>
            }
          </ProfileSection>

          {/* Tabs */}
          <Tabs>
            <Tab className={`${selection === TAB_SELECTION.STORY && "active"}`} onClick={() => setSelection(TAB_SELECTION.STORY)}>Story</Tab>
            <Tab className={`${selection === TAB_SELECTION.FOLLOWING && "active"}`} onClick={() => setSelection(TAB_SELECTION.FOLLOWING)}>Following</Tab>
            <Tab className={`${selection === TAB_SELECTION.FOLLOWERS && "active"}`} onClick={() => setSelection(TAB_SELECTION.FOLLOWERS)}>Followers</Tab>
          </Tabs>
        </Header>
        <Padding>
          {content}
        </Padding>
      </Container>
    </PleaseSignIn>
  );
}

export default ProfileView;

interface ButtonProps {
  following: boolean
}

const FollowButton = styled(Button) <ButtonProps>`
  background: ${props => props.following ? props.theme.primary["500"] : "transparent"};
  color: ${props => props.following ? "#FFF" : props.theme.primary["500"]};
`

const Padding = styled.div`
  padding: 1rem 0;
`

const Container = styled.div`
  max-width: 600px;
  margin: 1rem auto;
  padding: 0 1rem;
`

const ProfileSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  margin: 1rem 0;
`

const ProfileInfo = styled.div`
  display: flex;
  position: relative;
`

const ProfileImg = styled.img`
  border-radius: 50%;
  height: 60px;
  width: 60px;
  margin: 0 1rem;
`

const Header = styled.header`
  border-bottom: 1px solid ${props => props.theme.primary["500"]};;
`

const Tabs = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-around;
`

const Tab = styled.span`
  font-size: 1rem;
  text-transform: uppercase;
  padding: 1rem;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.primary["300"]};
  }

  &.active {
    color: ${props => props.theme.primary["500"]};
  }
`

const BackArrow = styled(FiArrowLeft)`
  height: 24px;
  width: 24px;
  cursor: pointer;
  position: absolute;
  left: -30px;
  top: calc(50% - 12px);
`