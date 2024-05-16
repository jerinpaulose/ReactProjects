// Import Axios and Axios Mock Adapter
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Create an instance of Axios
const axiosInstance = axios.create();
// Define the friends array
const friends = [
  {
    id: 1,
    photo: 'avatar-1.jpg',
    name: 'Josephin Doe',
    new: 3,
    status: 1,
    time: 'typing',
  },
  // Rest of the friend objects
];

interface Friend {
  id: number;
  photo: string;
  name: string;
  new?: number;
  status: number;
  time: string;
}

interface Message {
  type: number;
  msg: string;
  time: string;
}

interface Chat {
  friend_id: number;
  friend_photo: string;
  messages: Message[];
}

const chat: Chat[] = [
  {
    friend_id: 1,
    friend_photo: 'avatar-1.jpg',
    messages: [
      {
        type: 1,
        msg: "I'm just looking around. Will you tell me something about yourself?",
        time: '8:20 a.m',
      },
      // Rest of the messages
    ],
  },
  // Rest of the chat objects
];

const dynamicSort = (property: string) => {
  let sortOrder = 1;

  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a: any, b: any) {
    if (sortOrder === -1) {
      return b[property].localeCompare(a[property]);
    } else {
      return a[property].localeCompare(b[property]);
    }
  };
};

friends.sort(dynamicSort('name'));

// Create an instance of Axios Mock Adapter
const mock = new MockAdapter(axiosInstance);

// Define your API mock responses
mock.onGet('/api/friend/list').reply(200, { friends });
mock.onGet('/api/friend/chat').reply(200, { chat });

mock.onGet('/api/friend/chat').reply((config) => {
  try {
    const { id } = config.params;

    friends.filter((friend) => {
      if (friend.id === parseInt(id)) {
        friend.new = 0;
      }
      return friend;
    });

    const messages = chat.filter((chats) => {
      return chats.friend_id === parseInt(id);
    });

    return [200, { messages }];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onGet('/api/friend/search').reply((config) => {
  try {
    const { query } = config.params;
    const cleanQuery = query.toLowerCase().trim();
    const results = friends.filter((friend) => {
      if (!query) {
        return true;
      }
      return friend.name.toLowerCase().includes(cleanQuery);
    });

    return [200, { results }];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

mock.onPost('/api/friend/chat/add').reply((config) => {
  try {
    const { id, msg } = JSON.parse(config.data);

    const d = new Date();
    const n = d.toLocaleTimeString();
    let temp = false;

    chat.filter((chats) => {
      if (chats.friend_id === parseInt(id)) {
        temp = true;
        chats.messages = [
          ...chats.messages,
          {
            type: 0,
            msg: msg,
            time: n,
          },
        ];
      }
      return chats;
    });

    if (!temp) {
      const messages = {
        friend_id: parseInt(id),
        messages: [
          {
            type: 0,
            msg: msg,
            time: n,
          },
        ],
      };
      chat = [...chat, messages];
    }

    const messages = chat.filter((chats) => {
      return chats.friend_id === parseInt(id);
    });

    return [200, { messages }];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});
