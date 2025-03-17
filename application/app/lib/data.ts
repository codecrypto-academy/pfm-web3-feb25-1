import { User } from './definition';

export async function fetchUsers(){
    try {
        const response  = await fetch('http://localhost:5551/users/allusers');
        const data: User[] = await response.json();
        return data
    } catch (error) {
        console.error('Error fetching data from api:', error);
        throw new Error('Failed to fetch users data.');
    }
}