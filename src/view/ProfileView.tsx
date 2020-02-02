import React from 'react';
import { useParams } from "react-router-dom";

interface Props {
  count: number;
}


const ProfileView: React.FC<Props> = ({ count }) => {
  const { id } = useParams();
  return (
    <div className="m-auto antialiased font-sans font-serif font-mono text-center">
      <p>{count}</p>
      <p>ID: {id}</p>
    </div>
  );
}

export default ProfileView;