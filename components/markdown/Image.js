import styles from "../../styles/markdown/image.module.css";

export default function Image({ src, alt }) {
	return (
		<img
			className={styles.img}
			src={src}
			alt={alt}
		>
		</img>
	)
}
