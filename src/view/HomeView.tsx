import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import styled from "styled-components"

// import HomeViewModel from "../viewmodel/HomeViewModel"

import Feed from './components/Feed';
import Story from './components/Story';
import FollowList from './components/FollowList';

import Button, { TertiaryButton } from "./style/Button"

enum TAB_SELECTION {
  FEED,
  STORY,
  FOLLOWING,
  FOLLOWERS
}

const HomeView: React.FC = () => {
  const [selection, setSelection] = useState<TAB_SELECTION>(TAB_SELECTION.FEED)
  let content;
  switch (selection) {
    case TAB_SELECTION.FEED:
      content = <Feed />;
      break;
    case TAB_SELECTION.STORY:
      content = <Story />
      break;
    case TAB_SELECTION.FOLLOWERS:
      content = <FollowList users={[]} />
      break;
    case TAB_SELECTION.FOLLOWING:
      content = <FollowList users={[]} />
      break;
    default:
      content = <h2>An error has occurred</h2>

  }

  return (
    <Container>
      {/* Profile Section */}
      <Header>
        {/* Info */}
        <ProfileSection>
          <ProfileInfo as={Link} to={`/profile/1234`}>
            <ProfileImg src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1276&q=80" alt="Profile" />
            <div>
              <div>Profile Name</div>
              <div>@alias</div>
            </div>

          </ProfileInfo>
          <TertiaryButton>Logout</TertiaryButton>
        </ProfileSection>

        {/* New Status */}
        <Button>New Status</Button>

        {/* Tabs */}
        <Tabs>
          <Tab onClick={() => setSelection(TAB_SELECTION.FEED)}>Feed</Tab>
          <Tab onClick={() => setSelection(TAB_SELECTION.STORY)}>Story</Tab>
          <Tab onClick={() => setSelection(TAB_SELECTION.FOLLOWING)}>Following</Tab>
          <Tab onClick={() => setSelection(TAB_SELECTION.FOLLOWERS)}>Followers</Tab>
        </Tabs>
      </Header>
      {content}
    </Container>
  );
}

export default HomeView;

const Container = styled.div`
  max-width: 600px;
  margin: 1rem auto;
  padding: 0 1rem;
`

const ProfileSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`

const ProfileInfo = styled.div`
  display: flex;
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
    color: ${props => props.theme.primary["500"]};
  }

  &.active {
    color: ${props => props.theme.primary["500"]};
  }
`
