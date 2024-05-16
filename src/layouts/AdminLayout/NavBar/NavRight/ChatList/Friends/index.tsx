import React, { useState, useEffect } from 'react';

import friend from './friends';
import Friend from './Friend';
import Chat from './Chat';

interface FriendData {
  id: number;
  name: string;
  photo: string;
  status?: string;
  time?: string;
  new?: string;
}

interface Props {
  listOpen: boolean;
}

const Friends: React.FC<Props> = ({ listOpen }) => {
  const [chatOpen, setChatOpen] = useState<boolean>(listOpen);
  const [user, setUser] = useState<FriendData | null>(null);

  useEffect(() => {
    setChatOpen(false);
  }, [listOpen]);

  const handleFriendClick = (friendData: FriendData) => {
    setChatOpen(true);
    setUser(friendData);
  };

  const friendList = friend.map((f) => (
    <Friend
      key={f.id}
      data={f}
      activeId={user?.id || 0}
      clicked={() => handleFriendClick(f)}
    />
  ));

  return (
    <React.Fragment>
      {friendList}
      {user && (
        <Chat
          user={user}
          chatOpen={chatOpen}
          listOpen={listOpen}
          closed={() => {
            setChatOpen(false);
            setUser(null);
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Friends;
