//получение access_token из url
export const getAccessTokenFromUrl = () => {
	const params = new URLSearchParams(window.location.hash.slice(1))
	return {
		access_token: params.get("access_token"),
	}
}
