import PropTypes from "prop-types";

import styles from "../styles/container.module.css";

export default function Container({ pageHeight, size, enableXXL, children }) {
	return (
		<div
			className={`${styles.container} ${styles[size]} ${pageHeight ? styles.pageHeight : ""} ${enableXXL ? styles.enableXXL : ""}`}
		>
			{children}
		</div>
	)
}

Container.propTypes = {
	pageHeight: PropTypes.bool.isRequired,
	size: PropTypes.string.isRequired,
	enableXXL: PropTypes.bool.isRequired,
}

Container.defaultProps = {
	pageHeight: false,
	size: "md",
	enableXXL: false,
}
