import API from './Api'

export async function fetchUsers(): Promise<any> {
    const response: any = await API.get('/?results=5');
    return response.data
}