"use client"
import React from 'react';
import { GetServerSideProps } from 'next';

interface ProtectedPageProps {
  username: string;
}

function ProtectedPage({ username }: ProtectedPageProps) {
  return (
    <div>
      <h2>Protected Page</h2>
      <p>Welcome, {username}!</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = context.req.cookies;
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const userData = JSON.parse(user);
  return {
    props: { username: userData.username },
  };
};

export default ProtectedPage;
