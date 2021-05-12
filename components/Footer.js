import styles from "../styles/footer.module.css";

export default function Footer() {
	const sourceCodeGithubLink = "https://github.com/aurelien-brabant/aurelienbrabant.fr";

	return (
		<div
			className={styles.footer}
		>
			<span className={styles.divider} /> 
			<div style={{padding: "5px"}}>
				<div>
					Website by Aurélien Brabant (himself :o)
				</div>
				<div style={{marginTop: "5px"}}>
					<i className="fa fa-link" style={{marginRight: "5px"}} />
					<a href={sourceCodeGithubLink}>Source code of this app</a>
				</div>
			</div>
		</div>
	);
}
