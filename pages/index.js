import Head from "next/head";
import Link from "next/link";

import { Fragment, useState, useEffect } from "react";
import { getPostsMeta } from "../lib/posts.js";

import styles from "../styles/index.module.css";

import Layout from "../components/Layout"

export async function getStaticProps() {
	const posts = getPostsMeta();
	return {
		props: {
			posts
		}
	}
}

function Home(props) {
    const [ searchVal, setSearchVal ] = useState("");
	const [ filteredPosts, setFilteredPosts ] = useState([]);

	useEffect(() => {
		setFilteredPosts(props.posts);
	}, [])

	const applyFilter = (s) => {
		setFilteredPosts(props.posts.filter(post => post.title.trim().includes(s.trim())));	
	}

	/* form handlers */
	const handleChange = (event) => {
		setSearchVal(event.target.value);
		applyFilter(event.target.value);
	}

    return (
		<Fragment>
			<Head>
				<title>Aurelien Brabant</title>
			</Head>
			<Layout>
				<div className={styles.wrapper}>
					<div className={styles.barWrapper}>
						<input 
							type="text"
							placeholder="Rechercher" 
							onChange={handleChange}
							value={searchVal}
						/>
					</div>
					<div className={styles.postList}>
						{filteredPosts.map(post => (
							<div className={styles.post}>
								<h3>
									<Link 
										href={`/posts/${post.id}`}
									>
										<a>
											{post.title}
										</a>
									</Link>
								</h3>
								<span 
									className={styles.date}
								>
									{new Date(post.date).toLocaleDateString("fr-FR")}
								</span>
								<p>
									{post.preview}
								</p>
								<Link
									href={`/posts/${post.id}`}
								>
									<a
										className={styles.readBtn}
									>
										Lire <i className="fa fa-arrow-right" />
									</a>
								</Link>
							</div>
						))}
					</div>
				</div>
			</Layout>
		</Fragment>
    );
}

export default Home
