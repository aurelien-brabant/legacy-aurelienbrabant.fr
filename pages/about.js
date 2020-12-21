import Layout from "../components/Layout";

import styles from "../styles/about.module.css";

export default function About() {	
	return (
		<Layout>
			<div className={styles.wrapper}>
				<h1>A propos</h1>
				<img src="/imgs/me.png" />
				<div className={styles.presentation}>
					<div>
						<h3>Hey !</h3>
						<p>
							Je m'appelle Aurélien, je suis étudiant à l'école 42 
							et passionné de programmation.
						</p>
						<p>
							Je partage tout ce qui touche à l'informatique
							au travers d'articles sur ce magnifique site
							web !
						</p>
					</div>
					<div className={styles.contact}>
						<h3>Contact</h3>
						<h5>Je ne mords pas, je suis même sympa</h5>
						<div>
							42 {" "}
							<span className={styles.actualEmail}>
								{" "}42@aurelienbrabant.fr
							</span>
						</div>
						<div>
							<a href="mailto:42@aurelienbrabant.fr">
								Pro {" "}
								<span className={styles.actualEmail}>
									aurelien@aurelienbrabant.fr
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
