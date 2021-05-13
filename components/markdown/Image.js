import { useEffect, useState } from "react";
import styles from "../../styles/markdown/image.module.css";

export default function Image({ src, alt }) {
	/* if the link to the image does not start with HTTP it means that the
	image is stored locally. In that case we need to get the correct path to it */
	const [ postId, setPostId ] = useState(undefined);
	const isLocal = !src.startsWith('http');

	useEffect(() => {
		if (isLocal) {
			setPostId(window.location.pathname.split('/')[2]);
		}
	}, [])

	if (!postId) {
		src = "/imgs/no-image.png";
	} else {
		src = isLocal ? `/imgs/${postId}/${src}` : src;
	}

	return (
		<a
			href={src}
			target="_blank"
		>
			<img
				className={styles.img}
				src={src}
				alt={alt}
			>
			</img>
		</a>
	);
}
