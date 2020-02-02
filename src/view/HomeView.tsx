import React from 'react';

interface Props {
  count: number;
}

const HomeView: React.FC<Props> = ({ count }) => {
  return (
    <div className="m-auto antialiased font-sans font-serif font-mono text-center">
      <p>{count}</p>
    </div>
  );
}

export default HomeView;