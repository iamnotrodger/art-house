import { buildQueryString } from './query';
import RequestError from './RequestError';

export const getArtworks = async (query) => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const queryString = buildQueryString(query);
	const response = await fetch(`${API_URL}/artwork${queryString}`);

	if (!response.ok) throw await RequestError.parseResponse(response);

	const artworks = await response.json();
	return artworks;
};

export const getArtwork = async (id) => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const response = await fetch(`${API_URL}/artwork/${id}`);

	if (!response.ok) throw await RequestError.parseResponse(response);

	const artwork = await response.json();
	return artwork;
};
