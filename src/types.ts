export type User = {
  id: number;
  first_naem: string;
  last_name: string;
  username: string;
  email: string;
};

export type Video = {
  id: number;
  title: string;
  thumbnail: string;
  video_url: string;
  category: string;
  uploaded_By: User["id"];
  created_at: Date;
};
