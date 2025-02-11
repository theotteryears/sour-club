import { useMutation } from "@tanstack/react-query";
import supabase from "./supabase";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

export default function AddBeerForm() {
	const navigate = useNavigate();

	const addBeer = async (data) => {
		if (data.imageFile) {
			const { data: uploadData, error: uploadError } = await supabase.storage
				.from("beers")
				.upload(`images/${data.imageFile.name}`, data.imageFile, {
					cacheControl: "3600",
					upsert: false,
				});

			if (uploadError) {
				throw new Error(`Error uploading image: ${uploadError.message}`);
			}

			const { data: publicUrlData } = supabase.storage
				.from("beers")
				.getPublicUrl(uploadData.path);

			data.imageUrl = publicUrlData.publicUrl;
		}

		const { data: beer, error: insertError } = await supabase
			.from("sours")
			.insert([data]);

		if (insertError) {
			throw new Error(`Error adding beer: ${insertError.message}`);
		}

		return beer;
	};

	const mutation = useMutation({
		mutationFn: (data) => addBeer(data),
		onSuccess: () => {
			console.log("Beer added!");
			navigate("/list");
		},
		onError: (error) => {
			console.error("Error adding beer:", error);
		},
	});

	function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const beerName = formData.get("name");
		const imageFile = formData.get("filename");
		const sourness = formData.get("sourness");
		const design = formData.get("design");
		const brewery = formData.get("brewery");
		const jenesaisquoi = formData.get("jenesaisquoi");

		if (!beerName || !imageFile || !sourness || !design || !brewery) {
			alert("Please fill out all fields.");
			return;
		}

		mutation.mutate({
			name: beerName,
			sourness: Number.parseInt(sourness, 10),
			design: Number.parseInt(design, 10),
			brewery,
			jenesaisquoi,
			imageFile,
		});
	}

	return (
		<div className="py-6">
			<h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
				Add a New Beer
			</h1>

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
					to="/list"
					className="py-2 px-4 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Back to Beer List
				</Link>
			</div>

			<form
				onSubmit={handleSubmit}
				className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md pb-8"
			>
				<div className="mb-4">
					<label
						htmlFor="filename"
						className="block text-lg font-medium text-gray-700 mb-2"
					>
						Beer Image:
					</label>
					<input
						type="file"
						id="filename"
						name="filename"
						accept="image/*"
						className="block text-lg font-medium text-gray-700 mb-4 file:border file:border-gray-300 file:rounded-lg file:px-4 file:py-2 file:text-sm file:text-gray-700 hover:file:border-blue-500 focus:file:ring-2 focus:file:ring-blue-500 focus:outline-none"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="name"
						className="block text-lg font-medium text-gray-700 mb-2"
					>
						Beer Name:
					</label>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Enter the beer name"
						autoComplete="off"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
					/>
				</div>

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
						id="sourness"
						placeholder="Rate the sourness out of 10"
						autoComplete="off"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="design"
						className="block text-lg font-medium text-gray-700 mb-2"
					>
						Design:
					</label>
					<input
						type="text"
						name="design"
						id="design"
						placeholder="Rate the design out of 10"
						autoComplete="off"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="brewery"
						className="block text-lg font-medium text-gray-700 mb-2"
					>
						Brewery:
					</label>
					<input
						type="text"
						name="brewery"
						id="brewery"
						placeholder="Enter the brewery name"
						autoComplete="off"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="jenesaisquoi"
						className="block text-lg font-medium text-gray-700 mb-2"
					>
						Je ne sais quoi:
					</label>
					<select
						name="jenesaisquoi"
						id="jenesaisquoi"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						required
					>
						<option value="">Select an option</option>
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

				<div className="flex justify-center">
					<input
						type="submit"
						value="Add Beer"
						className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</form>
		</div>
	);
}
