import { buildQueryString } from './query';
import RequestError from './RequestError';

export const getArtists = async (query) => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const queryString = buildQueryString(query);
	const response = await fetch(`${API_URL}/artist${queryString}`);

	if (!response.ok) throw await RequestError.parseResponse(response);

	const artists = await response.json();
	return artists;
};

export const getArtist = async (id) => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const response = await fetch(`${API_URL}/artist/${id}`);

	if (!response.ok) throw await RequestError.parseResponse(response);

	const artist = await response.json();
	return artist;
};

export const getArtistArtworks = async (id, query) => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const queryString = buildQueryString(query);
	const response = await fetch(
		`${API_URL}/artist/${id}/artwork${queryString}`
	);

	if (!response.ok) throw await RequestError.parseResponse(response);

	const artworks = await response.json();
	return artworks;
};
