import { useSuspenseQuery } from "@tanstack/react-query";
import supabase from "./supabase";

const fetchSours = async () => {
	const { data: sours } = await supabase.from("sours").select();
	return sours;
};

export default function Beers() {
	const { data: sours } = useSuspenseQuery({
		queryKey: ["sours"],
		queryFn: fetchSours,
	});

	return (
		<div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{sours.map((sour) => {
				return (
					<div
						key={sour.id}
						className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white"
					>
						{/* Beer Image */}
						<div className="h-48 bg-gray-200">
							<img
								src={sour.imageURL}
								alt={sour.name}
								className="w-full h-full object-contain"
							/>
						</div>

						{/* Card Content */}
						<div className="p-4">
							<h2 className="text-2xl font-bold text-gray-800">{sour.name}</h2>
							<p className="text-gray-600 mt-2">Brewery: {sour.brewery}</p>
							<p className="text-gray-600">Sourness: {sour.sourness}</p>
							<p className="text-gray-600">Design: {sour.design}</p>
							<p className="text-gray-600">Rating: {sour["Je ne sais quoi"]}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}
