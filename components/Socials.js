import styles from "../styles/socials.module.css";

/* Renders the social media buttons on the page */

const socialMedias = [
	{
		href: "https://www.youtube.com/channel/UC9JjIHlcttAz6QJTVjVxsdg",
		ficon: "fab fa-youtube",
		color: "#FD0000",
		id: 0,
	},
	{
		href: "https://github.com/aurelien-brabant",
		ficon: "fab fa-github-alt",
		color: "#000000",
		id: 0,
	},
	{
		href: "https://www.linkedin.com/in/aurelien-brabant",
		ficon: "fab fa-linkedin",
		color: "#0a66C2",
		id: 1,
	},
	{
		href: "https://twitter.com/aurelienb42",
		ficon: "fab fa-twitter",
		color: "#00A2F5",
		id: 2,
	}
]

export default function Socials() {
	return (
		<div
			className={styles.socialsWrapper}
		>
			{socialMedias.map((item) => (
				<a 
					key={item.id}
					href={item.href}>
					<i 
						className={`${item.ficon}`}
						style={{color: item.color}}
					/>
				</a>
				)
			)}
		</div>
	);
}
