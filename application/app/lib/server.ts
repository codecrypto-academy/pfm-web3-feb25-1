'use server';
import { fetchUsers } from './data';

export const getServerSideProps = async () => {
    const users = await fetchUsers();
    return {
      props: { users },
    };
  };