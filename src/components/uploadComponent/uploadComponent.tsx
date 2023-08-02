import { ChangeEvent, FC, useEffect, useState } from "react"
import styles from "./uploadComponent.module.css"
import { handleAuth, handleUpload } from "../../utils/requests"
import { getAccessTokenFromUrl } from "../../utils/helper"

export const UploadComponent: FC = () => {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([])
	const [notify, setNotify] = useState<string>("")

	useEffect(() => {
		const { access_token } = getAccessTokenFromUrl()
		if (access_token) {
			localStorage.setItem("access_token", access_token)
		}
	}, [])

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (files) {
			const fileList = Array.from(files)
			setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...fileList])
			setNotify("")
		}
	}

	console.log(selectedFiles)

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Загрузить файл на Яндекс.Диск</h1>

			<button className={styles.auth_button} onClick={handleAuth}>
				Авторизация <span>Яндекс</span>
			</button>
			{window.location.href.includes("access_token") ? <span className={styles.auth_success}>Авторизация прошла успешно!</span> : null}
			<label className={styles.input_file}>
				<span className={styles.input_file_text}>
					{selectedFiles
						.map((file) => {
							return file.name
						})
						.join(", ")}
				</span>
				<input onChange={handleFileChange} type='file' multiple name='file' />
				<span className={styles.input_file_btn}>Выберите файл</span>
			</label>
			<button className={styles.upload_button} onClick={() => handleUpload(selectedFiles, setNotify)}>
				Загрузить
			</button>
			{!!notify.length && <span className={styles.notify}>{notify}</span>}
		</div>
	)
}
