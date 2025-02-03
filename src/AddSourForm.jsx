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
		// event.preventDefault();
		const formData = new FormData(event.target);
		const sourName = formData.get("sourname");
		const design = formData.get("design");
		const sourness = formData.get("sourness");
		const brewery = formData.get("brewery");
		const rating = formData.get("rating");
		const imageURL = formData.get("photo");

		if (!sourName || !design || !sourness || !brewery) {
			alert("Please fill out all fields.");
			return;
		}

		mutation.mutate({
			name: sourName,
			design: design,
			sourness: sourness,
			brewery: brewery,
			"Je ne sais quoi": rating,
			imageURL: imageURL,
		});
	}

	return (
		<div className="flex items-center justify-center bg-gray-100 py-8">
			<div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-2xl">
				<h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
					Add a Sour
				</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Beer Name */}
					<div>
						<label
							htmlFor="sourname"
							className="block text-sm font-medium text-gray-700"
						>
							Name
						</label>
						<input
							type="text"
							name="sourname"
							id="sourname"
							className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="Enter sour name"
						/>
					</div>

					{/* Design */}
					<div>
						<label
							htmlFor="design"
							className="block text-sm font-medium text-gray-700"
						>
							Design
						</label>
						<input
							type="text"
							name="design"
							id="design"
							className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="Enter design rating from 1 to 10"
						/>
					</div>

					{/* Sourness */}
					<div>
						<label
							htmlFor="sourness"
							className="block text-sm font-medium text-gray-700"
						>
							Sourness
						</label>
						<input
							type="text"
							name="sourness"
							id="sourness"
							className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="Enter sourness level from 1 to 10"
						/>
					</div>

					{/* Je ne sais quoi */}
					<div>
						<label
							htmlFor="rating"
							className="block text-sm font-medium text-gray-700"
						>
							Je ne sais quoi
						</label>
						<select
							name="rating"
							id="rating"
							className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
					<div>
						<label
							htmlFor="brewery"
							className="block text-sm font-medium text-gray-700"
						>
							Brewery
						</label>
						<input
							type="text"
							name="brewery"
							id="brewery"
							className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="Enter brewery name"
						/>
					</div>

					{/* Photo */}
					<div>
						<label
							htmlFor="photo"
							className="block text-sm font-medium text-gray-700"
						>
							Add Photo
						</label>
						<input
							type="file"
							name="photo"
							id="photo"
							className="p-2 mt-1 block w-full text-gray-700 border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
						/>
					</div>

					{/* Submit Button */}
					<div>
						<button
							type="submit"
							className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Add Sour
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
