export type message = {
  ai: string;
  user: string;
};

export type chat = {
  messages: message;
  _id: string;
};
