import Link from "next/link";
import Socials from "./Socials";

import { useEffect } from "react";

import styles from "../styles/header.module.css";

export default function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.headerBlock}>

				{ /* logo */ }
				<div className={styles.logoWrapper}>
					<i 
						className={`material-icons ${styles.logoIcon}`}>
						code
					</i>
					<div>
					<Link href="/">
						<a>
							<h1 className={styles.title}>
								Aurelien Brabant
							</h1>
							<h3 className={styles.subtitle}>Becoming a software engineer</h3>
						</a>
					</Link>
					</div>
				</div>

				<div className={styles.headerRight}>
					{/* naviguation bar */}
					<nav className={styles.navbar}>
						<ul>
							<li><Link href="/about"><a>A propos</a></Link></li>
						</ul>
					</nav>
					<Socials />
				</div>
			</div>
		</header>
	)
}
