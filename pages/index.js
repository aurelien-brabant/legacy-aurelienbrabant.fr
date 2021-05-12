import Head from "next/head";
import Link from "next/link";

import { Fragment, useState, useEffect } from "react";
import { getPostsMeta } from "../lib/posts.js";

import styles from "../styles/index.module.css";

import Layout from "../components/Layout";
import Container from "../components/Container";

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
		/* The case does not matter */
		const normalizedSearchTerm = s.trim().toLowerCase();

		setFilteredPosts(props.posts.filter(post => post.title.trim().toLowerCase().includes(normalizedSearchTerm)));	
	}

	/* form handlers */
	const handleChange = (event) => {
		setSearchVal(event.target.value);
		applyFilter(event.target.value);
	}

	/* This helper function renders the post card and can place the image
	at the left or the right of the card depending on the needs. This feature
	is not used at the moment though, as I don't find alternating really
	beautiful in this case */

	const renderPostCard = (post, imageLocation) => (
		<Link
			key={post.id}
			href={`/posts/${post.id}`}
		>
			<div 
				className={styles.post}
				key={post.id}
			>
				{imageLocation == -1 && (
					<div
						className={styles.postCover}
						style={{
							backgroundImage: `url("/covers/${post.id}.png")`
						}}
					>
					</div>
				)}
				<div
					className={styles.metaInf}
				>
					<h3> {post.title} </h3>
					<span 
						className={styles.date}
					>
						{new Date(post.date).toLocaleDateString("en-US")}
					</span>
					<span
						className={styles.author}
					>
						By {post.author}
					</span>
					<p>
						{post.preview}
					</p>
				</div>
				{imageLocation == 1 && (
					<div
						className={styles.postCover}
						style={{
							backgroundImage: `url("/covers/${post.id}.png")`
						}}
					>
					</div>
				)}

			</div>
		</Link>
	)

	return (
		<Fragment>
			<Head>
				<title>Aurelien Brabant</title>
			</Head>
			<Layout>
				<Container
					pageHeight
					size="md"
				>
					<div className={styles.wrapper}>
						<div className={styles.barWrapper}>
							<input 
								type="text"
								placeholder="Search post" 
								onChange={handleChange}
								value={searchVal}
							/>
						</div>
						<div className={styles.postList}>
							{filteredPosts.map(post => renderPostCard(post, 1))} 
						</div>
					</div>
				</Container>
			</Layout>
		</Fragment>
	);
}

export default Home
