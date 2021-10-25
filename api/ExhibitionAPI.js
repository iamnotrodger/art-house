import { buildQueryString } from './query';
import RequestError from './RequestError';

export const getExhibitions = async (query) => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const queryString = buildQueryString(query);
	const response = await fetch(`${API_URL}/exhibition${queryString}`);

	if (!response.ok) throw await RequestError.parseResponse(response);

	const exhibitions = await response.json();
	return exhibitions;
};

export const getExhibition = async (id) => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const response = await fetch(`${API_URL}/exhibition/${id}`);

	if (!response.ok) throw await RequestError.parseResponse(response);

	const exhibition = await response.json();
	return exhibition;
};

export const getExhibitionArtworks = async (id, query) => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const queryString = buildQueryString(query);
	const response = await fetch(
		`${API_URL}/exhibition/${id}/artwork${queryString}`
	);

	if (!response.ok) throw await RequestError.parseResponse(response);

	const artworks = await response.json();
	return artworks;
};

export const getExhibitionArtists = async (id, query) => {
	const API_URL = process.env.NEXT_PUBLIC_API_URL;
	const queryString = buildQueryString(query);
	const response = await fetch(
		`${API_URL}/exhibition/${id}/artist${queryString}`
	);

	if (!response.ok) throw await RequestError.parseResponse(response);

	const artists = await response.json();
	return artists;
};
