import axios from "axios"

//запрос для авторизации в яндексе
export const handleAuth = async () => {
	try {
		const authUrl = "https://oauth.yandex.ru/authorize?response_type=token&client_id=2e0c5d400e4744f18cb1a675c2fc1703"
		window.location.href = authUrl
	} catch (error) {
		console.error("Error redirecting to Yandex authorization:", error)
	}
}
//запрос для получения ссылки для загрузки файла
export const handleUpload = async (selectedFiles: File[], setNotify: (string: string) => void) => {
	if (selectedFiles.length === 0) {
		return setNotify("Файлы не выбраны!")
	}

	selectedFiles.map(async (file) => {
		try {
			const response = await axios.get("https://cloud-api.yandex.net/v1/disk/resources/upload", {
				headers: {
					Authorization: `OAuth ${localStorage.getItem("access_token")}`,
				},
				params: {
					path: `/${file.name}`,
					overwrite: "true",
				},
			})

			if (response.data) {
				try {
					await axios.put(response.data.href, file)
					setNotify("Файлы успешно загружены!")
				} catch (e) {
					setNotify(`Ошибка загрузки файла: ${e}`)
					console.error(e)
				}
			}
		} catch (error) {
			console.error("Error uploading file:", error)
		}
	})
}
