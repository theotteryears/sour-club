import { useMutation } from "@tanstack/react-query";
import supabase from "./supabase";

export default function AddSourForm() {
	const addSour = async (data) => {
		const { data: sour } = await supabase.from("sours").insert(data);
		return sour;
	};

	const mutation = useMutation({
		mutationFn: (data) => addSour(data),
		onSuccess: () => {
			console.log("Sour added!");
		},
		onError: (error) => {
			console.error("Error adding sour:", error);
		},
	});

	function handleSubmit(event) {
		event.preventDefault;
		const name = new FormData(event.target).get("name");
		const sourness = new FormData(event.target).get("sourness");
		const rating = new FormData(event.target).get("rating");
		const brewery = new FormData(event.target).get("brewery");
		// const photo = new FormData(event.target).get("filename");
		mutation.mutate({ name, sourness, rating, brewery });
	}

	return (
		<div className="py-6">
			<form
				onSubmit={handleSubmit}
				className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md pb-8"
			>
				{/* Beer Name */}
				<div className="mb-4">
					<label
						htmlFor="name"
						className="block text-lg font-medium text-gray-700 mb-2"
					>
						Beer name:
					</label>
					<input
						type="text"
						name="name"
						placeholder="Enter the beer name"
						id="name"
						autoComplete="off"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				{/* Sourness */}
				<div className="mb-4">
					<label
						htmlFor="sourness"
						className="block text-lg font-medium text-gray-700 mb-2"
					>
						Sourness:
					</label>
					<input
						type="text"
						name="sourness"
						placeholder="Enter a number between 1 and 10"
						id="sourness"
						autoComplete="off"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				{/* Rating */}
				<div className="mb-4">
					<label
						htmlFor="rating"
						className="block text-lg font-medium text-gray-700 mb-2"
					>
						Rating:
					</label>
					<select
						id="rating"
						name="rating"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						<option value="Mon Dieu!">Mon Dieu!</option>
						<option value="Incroyable">Incroyable</option>
						<option value="Très bon">Très bon</option>
						<option value="Tout à fait bien">Tout à fait bien</option>
						<option value="Assez mauvais">Assez mauvais</option>
						<option value="Tout simplement horrible">
							Tout simplement horrible
						</option>
					</select>
				</div>

				{/* Brewery */}
				<div className="mb-6">
					<label
						htmlFor="brewery"
						className="block text-lg font-medium text-gray-700 mb-2"
					>
						Brewery:
					</label>
					<input
						type=""
						name="brewery"
						placeholder="Enter the brewery name"
						id="brewery"
						autoComplete="off"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				{/* Photo */}
				<input
					type="file"
					id="photo"
					name="filename"
					className="block text-lg font-medium text-gray-700 mb-4 file:border file:border-gray-300 file:rounded-lg file:px-4 file:py-2 file:text-sm file:text-gray-700 hover:file:border-blue-500 focus:file:ring-2 focus:file:ring-blue-500 focus:outline-none"
				/>

				{/* Submit Button */}
				<div className="flex justify-center">
					<input
						type="submit"
						value="Add Sour"
						className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</form>
		</div>
	);
}
