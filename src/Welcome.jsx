import { Link } from "react-router-dom";

const Welcome = () => {
	return (
		<div className="text-center py-12">
			<h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500">
				Welcome to Sour Club
			</h1>
			<p className="mt-4 text-lg text-gray-600">
				Explore the world of sour beers and join the club!
			</p>

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
	);
};

export default Welcome;
