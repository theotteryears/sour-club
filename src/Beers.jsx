import { useSuspenseQuery } from "@tanstack/react-query";
import supabase from "./supabase";

const fetchBeers = async () => {
	const { data: beers } = await supabase
		.from("beers")
		.select(
			'id, name, sourness, design, "Je ne sais quoi", imageURL, breweries(id, name)',
		);
	return beers;
};

export default function Beers() {
	const { data: beers } = useSuspenseQuery({
		queryKey: ["beers"],
		queryFn: fetchBeers,
	});

	return (
		<div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{beers.map((beer) => {
				return (
					<div
						key={beer.id}
						className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white"
					>
						{/* Beer Image */}
						<div className="h-48 bg-gray-200">
							<img
								src={beer.imageURL}
								alt={beer.name}
								className="w-full h-full object-contain"
							/>
						</div>

						{/* Card Content */}
						<div className="p-4">
							<h2 className="text-2xl font-bold text-gray-800">{beer.name}</h2>
							<p className="text-gray-600 mt-2">
								Brewery: {beer.breweries.name}
							</p>
							<p className="text-gray-600">Sourness: {beer.sourness}</p>
							<p className="text-gray-600">Design: {beer.design}</p>
							<p className="text-gray-600">Rating: {beer["Je ne sais quoi"]}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}
