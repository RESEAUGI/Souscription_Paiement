// pages/api/data.ts
import { NextApiRequest, NextApiResponse } from 'next';

type TableData = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const data: TableData[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '987-654-3210' },
  { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', phone: '555-555-5555' },
  { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', phone: '111-222-3333' },
  { id: 5, name: 'Tom Davis', email: 'tom.davis@example.com', phone: '444-444-4444' },
  { id: 6, name: 'Sarah Lee', email: 'sarah.lee@example.com', phone: '777-777-7777' },
  { id: 7, name: 'Michael Brown', email: 'michael.brown@example.com', phone: '888-888-8888' },
  { id: 8, name: 'Emily Wilson', email: 'emily.wilson@example.com', phone: '999-999-9999' },
  { id: 9, name: 'David Taylor', email: 'david.taylor@example.com', phone: '222-222-2222' },
  { id: 10, name: 'Lisa Anderson', email: 'lisa.anderson@example.com', phone: '333-333-3333' },
  { id: 11, name: 'Ryan Thompson', email: 'ryan.thompson@example.com', phone: '666-666-6666' },
  { id: 12, name: 'Olivia Martinez', email: 'olivia.martinez@example.com', phone: '000-000-0000' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse<TableData[]>) {
  res.status(200).json(data);
}