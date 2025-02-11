import { useQuery } from "@tanstack/react-query";
import supabase from "./supabase";
import { Link } from "react-router-dom";

// Fetch function to get beers from Supabase
const fetchBeers = async () => {
	const { data, error } = await supabase.from("sours").select("*");

	if (error) {
		throw new Error(error.message);
	}

	return data;
};

export default function BeerList() {
	const {
		data: beers,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["sours"],
		queryFn: fetchBeers,
	});

	if (isLoading) {
		return (
			<div className="text-center text-gray-700 py-6">
				<p>Loading beers...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center text-red-600 py-6">
				<p>Error fetching beers: {error.message}</p>
			</div>
		);
	}

	return (
		<div className="py-6">
			<h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
				Beer List
			</h1>

			{/* Link to Add Beer form */}
			<div className="text-center mb-6">
				<Link
					to="/"
					className="py-2 px-4 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Home
				</Link>
			</div>
			<div className="text-center mb-6">
				<Link
					to="/add"
					className="py-2 px-4 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Add a New Beer
				</Link>
			</div>

			<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{beers.map((beer) => (
					<div
						key={beer.id}
						className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white"
					>
						{/* Show the beer image */}
						{beer.imageUrl && (
							<img
								src={beer.imageUrl}
								alt={beer.name}
								className="w-full h-56 object-cover rounded-t-lg"
							/>
						)}
						<div className="p-4 text-center">
							<h2 className="text-2xl font-bold text-gray-600">{beer.name}</h2>
							<p className="text-indigo-500 mt-2">Brewery: {beer.brewery}</p>
							<p className="text-gray-600">Sourness: {beer.sourness}</p>
							<p className="text-gray-600">Design: {beer.design}</p>
							<p className="text-pink-500">
								Je ne sais quoi: {beer.jenesaisquoi}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
