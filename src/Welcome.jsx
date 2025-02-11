import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Welcome = () => {
	return (
		<>
			<Helmet>
				<meta
					name="description"
					content="Explore the world of sour beers and join the Sour Club. Discover unique sour beers, share your favorites, and add new ones!"
				/>
				<title>Welcome to Sour Club</title>
			</Helmet>
			<div className="text-center py-12">
				<h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500 p-3">
					Welcome to Sour Club
				</h1>
				{/* Use background image */}
				<div
					className="bg-cover bg-center my-8 w-64 h-64 mx-auto border-gray-200 rounded-2xl"
					style={{ backgroundImage: 'url("/beer.png")' }}
				/>
				<div className="mx-auto">
					<p className="mt-4 text-lg text-gray-600 mx-auto">
						Explore the world of sours and join the club!
					</p>
				</div>

				{/* Add links to BeerList and AddSourForm */}
				<div className="mt-6 space-x-4">
					<Link
						to="/add"
						className="inline-block px-6 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition duration-300"
					>
						Add a New Beer
					</Link>
					<Link
						to="/list"
						className="inline-block px-6 py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 transition duration-300"
					>
						View Beer List
					</Link>
				</div>
			</div>
		</>
	);
};

export default Welcome;
