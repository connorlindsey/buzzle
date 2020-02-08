import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import styled from "styled-components"

import Feed from './components/Feed';
import Story from './components/Story';
import FollowList from './components/FollowList';

import { Form, Textarea } from "./style/Form"
import Button, { TertiaryButton } from "./style/Button"
import UserService from '../services/UserService';
import PleaseSignIn from './components/PleaseSignIn';
import User from '../model/User';
import StatusService from '../services/StatusService';

enum TAB_SELECTION {
  FEED,
  STORY,
  FOLLOWING,
  FOLLOWERS
}

// TODO: Add search box
const HomeView: React.FC = () => {
  const history = useHistory()
  const [selection, setSelection] = useState<TAB_SELECTION>(TAB_SELECTION.FEED)
  const [user, setUser] = useState<User | null | undefined>()
  const [message, setMessage] = useState<string>("") // Status textarea

  useEffect(() => {
    const user = UserService.getCurrentUser();
    setUser(user);
  }, [])

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

  const updateMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  }

  const createStatus = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.length === 0) {
      return;
    }
    StatusService.createStatus(message)
    setMessage("")
  }

  const logout = () => {
    UserService.logout()
    history.push("/")
  }

  // Search
  const [search, setSearch] = useState<string>("")
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    history.push(`/profile/${search}`)
  }

  if (!user) {
    return <h3>An error occurred</h3>
  }

  return (
    <PleaseSignIn>
      <Container>
        {/* Profile Section */}
        <Header>
          {/* Info */}
          <ProfileSection>
            <ProfileInfo as={Link} to={`/profile/${user.alias}`}>
              <ProfileImg src={user.photo} alt="Profile" />
              <div>
                <div>{user.name}</div>
                <div>@{user.alias}</div>
              </div>
            </ProfileInfo>
              <form onSubmit={handleSearch}>
                <Search type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
              </form>
              <TertiaryButton onClick={logout}>Logout</TertiaryButton>
          </ProfileSection>

          {/* New Status */}
          <Form onSubmit={createStatus}>
            <Textarea
              placeholder="Craft your message"
              id="description"
              name="description"
              required
              value={message}
              onChange={updateMessage} />
            <Button margin=".5rem 0" type="submit">New Status</Button>
          </Form>

          {/* Tabs */}
          <Tabs>
            <Tab className={`${selection === TAB_SELECTION.FEED && "active"}`} onClick={() => setSelection(TAB_SELECTION.FEED)}>Feed</Tab>
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

export default HomeView;

const Search = styled.input`
  width: 200px;
  border: 1px solid ${props => props.theme.grey["700"]};
  border-radius: ${props => props.theme.borderRadius};
  height: 2rem;
  background: ${props => props.theme.grey["600"]};
  outline: none;
  padding-left: 10px;
  box-shadow: inset 0 -2px 0px hsla(0, 0%, 100%, 0.15), inset 0 1px 1px hsla(0, 0%, 0%, 0.15);

  &::placeholder {
    color: ${props => props.theme.grey["100"]};
  }
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
    color: ${props => props.theme.primary["300"]};
  }

  &.active {
    color: ${props => props.theme.primary["500"]};
  }
`
