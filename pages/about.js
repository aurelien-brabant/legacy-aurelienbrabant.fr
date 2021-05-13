import Head from "next/head"

import Layout from "../components/Layout";
import Container from "../components/Container";

import styles from "../styles/about.module.css";

export default function About() {
	return (
		<Layout>
			<Head>
				<title key="title">Web developer and 42 Student | Aurélien Brabant</title>
				<meta key="description" content="Web developer and student at 42 Paris, sharing code and thoughts. 
					Available to work on every project involving code, just send me a message!" />
				<meta key="og:url" property="og:url" content="aurelienbrabant.fr/about" />
			</Head>
			<Container
				pageHeight
				size="lg"
			>
				<div className={styles.wrapper}>
					<h1>About</h1>
					<img src="/imgs/me.png" />
					<div className={styles.presentation}>
						<div>
							<h3>Hi there!</h3>
							<p>
								I'm Aurélien, a french programmer and student at <a href="https://42.fr/">school 42</a>.
							</p>
							<p>
								I occasionally share useful content and personal thoughts on
								this awesome blog, so stay tuned!
							</p>
						</div>
						<div className={styles.contact}>
							<h3>Contact</h3>
							<h5>I usually answer pretty quickly!</h5>
							<div className={styles.emailBlock}>
								<div>
									42 school
								</div>
								<a style={{display: "block"}} href="mailto:42@aurelienbrabant.fr">
									<span className={styles.actualEmail}>
										{" "}42@aurelienbrabant.fr
									</span>
								</a>
							</div>
							<div className={styles.emailBlock}>
								<div>
									Professional (only): {" "}
								</div>
								<a href="mailto:contact@aurelienbrabant.fr">
									<span className={styles.actualEmail}>
										contact@aurelienbrabant.fr
									</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</Layout>
);
}
