// lib/getToken.ts
import axios from 'axios';

interface TokenResponse {
  access_token: string;
}

export async function getToken(): Promise<string> {
  const tokenUrl = process.env.TOKEN_URL!;
  const clientId = process.env.BATTLENET_CLIENT_ID!;
  const clientSecret = process.env.BATTLENET_CLIENT_SECRET!;

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  try {
    const response = await axios.post<TokenResponse>(tokenUrl, params, {
      auth: {
        username: clientId,
        password: clientSecret,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Failed to get token', error);
    throw new Error('Failed to get token');
  }
}
