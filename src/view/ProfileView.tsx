import React from 'react';
import { useParams } from "react-router-dom";
import PleaseSignIn from './components/PleaseSignIn';

interface Props {
  count: number;
}


const ProfileView: React.FC<Props> = ({ count }) => {
  const { id } = useParams();
  return (
    <PleaseSignIn>
      <div className="m-auto antialiased font-sans font-serif font-mono text-center">
        <p>{count}</p>
        <p>ID: {id}</p>
      </div>
    </PleaseSignIn>
  );
}

export default ProfileView;