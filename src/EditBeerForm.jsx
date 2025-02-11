import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import supabase from "./supabase";

export default function EditBeerForm() {
	const { beerId } = useParams();
	const id = Number.parseInt(beerId, 10);

	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		sourness: "",
		design: "",
		brewery: "",
		jenesaisquoi: "",
		imageUrl: "",
	});

	if (!id) {
		console.error("No ID found in useParams!");
		return <p>Error: No beer ID provided</p>;
	}
	// Fetch Beer Data
	const {
		data: beerData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["beer", id],
		queryFn: async () => {
			console.log("Fetching beer with ID:", id); // Log the ID

			if (!id) {
				console.error("No ID provided");
				return null;
			}

			const { data, error } = await supabase
				.from("sours")
				.select("*")
				.eq("id", id) // Ensure ID is a number
				.single();

			if (error) {
				console.error("Supabase error:", error);
				throw new Error(error.message);
			}

			console.log("Beer data received:", data); // Log response
			return data;
		},
		enabled: !!id, // Ensure query runs only when ID is available
	});

	// Sync beerData with formData when beerData is available
	useEffect(() => {
		if (beerData) {
			console.log("Updating formData with:", beerData);
			setFormData((prev) => ({
				...prev,
				name: beerData.name,
				sourness: beerData.sourness,
				design: beerData.design,
				brewery: beerData.brewery,
				jenesaisquoi: beerData.jenesaisquoi,
				imageUrl: beerData.imageUrl,
			}));
		}
	}, [beerData]);

	// Update beer function
	const updateBeer = async (data) => {
		if (data.imageFile) {
			// Upload new image
			const { data: uploadData, error: uploadError } = await supabase.storage
				.from("beers")
				.upload(`images/${data.imageFile.name}`, data.imageFile, {
					cacheControl: "3600",
					upsert: false,
				});

			if (uploadError) {
				throw new Error(`Error uploading image: ${uploadError.message}`);
			}

			// Get public URL of uploaded image
			const { data: publicUrlData } = supabase.storage
				.from("beers")
				.getPublicUrl(uploadData.path);

			data.imageUrl = publicUrlData.publicUrl;
		}

		// Update beer record
		const { error } = await supabase.from("sours").update(data).eq("id", id);

		if (error) {
			throw new Error(`Error updating beer: ${error.message}`);
		}
	};

	// Mutation for updating beer
	const mutation = useMutation({
		mutationFn: updateBeer,
		onSuccess: () => {
			console.log("Beer updated!");
			navigate("/list"); // Redirect after successful update
		},
		onError: (error) => {
			console.error("Error updating beer:", error);
		},
	});

	// Delete beer function
	const deleteBeer = async () => {
		const { error } = await supabase.from("sours").delete().eq("id", id);

		if (error) {
			console.error("Error deleting beer:", error);
		} else {
			navigate("/list"); // Redirect after successful deletion
		}
	};

	// Handle form submission
	const handleSubmit = (event) => {
		event.preventDefault();

		// Get form data as FormData object
		const updatedData = new FormData(event.target);

		// Get the file input manually (since we are using FormData)
		const fileInput = updatedData.get("filename");
		const imageFile = fileInput ? fileInput[0] : null; // Get the first file if available

		// Now, pass the correct data to the mutation
		mutation.mutate({
			name: updatedData.get("name"),
			sourness: Number(updatedData.get("sourness")),
			design: Number(updatedData.get("design")),
			brewery: updatedData.get("brewery"),
			jenesaisquoi: updatedData.get("jenesaisquoi"),
			imageFile: imageFile, // Handle file correctly
		});
	};

	// Loading states
	if (isLoading) return <p>Loading...</p>;
	if (!beerData) return <p>Beer not found!</p>;

	// JSX for form
	return (
		<div className="py-6">
			<h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
				Edit Beer
			</h1>

			<form
				onSubmit={handleSubmit}
				className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md pb-8"
			>
				{/* Image Upload */}
				<div className="mb-4">
					<label
						htmlFor="filename"
						className="block text-lg font-medium text-gray-700 mb-2"
					>
						Beer Image (Optional):
					</label>
					<input
						type="file"
						id="filename"
						name="filename"
						accept="image/*"
						onChange={(e) =>
							setFormData({ ...formData, imageFile: e.target.files[0] })
						}
						className="block text-lg font-medium text-gray-700 mb-4 file:border file:border-gray-300 file:rounded-lg file:px-4 file:py-2 file:text-sm file:text-gray-700 hover:file:border-blue-500 focus:file:ring-2 focus:file:ring-blue-500 focus:outline-none"
					/>
					{formData.imageUrl && (
						<img
							src={formData.imageUrl}
							alt="Beer"
							className="h-24 mt-2 rounded-md"
						/>
					)}
				</div>

				{/* Beer Name */}
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
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
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
						type="number"
						name="sourness"
						id="sourness"
						value={formData.sourness}
						min="0"
						max="10"
						onChange={(e) =>
							setFormData({ ...formData, sourness: e.target.value })
						}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				{/* Design */}
				<div className="mb-4">
					<label
						htmlFor="design"
						className="block text-lg font-medium text-gray-700 mb-2"
					>
						Design:
					</label>
					<input
						type="number"
						name="design"
						id="design"
						value={formData.design}
						min="0"
						max="10"
						onChange={(e) =>
							setFormData({ ...formData, design: e.target.value })
						}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				{/* Brewery */}
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
						value={formData.brewery}
						onChange={(e) =>
							setFormData({ ...formData, brewery: e.target.value })
						}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

				{/* Submit Button */}
				<div className="flex justify-center">
					<input
						type="submit"
						value="Update Beer"
						className="w-full py-2 px-4 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-600"
					/>
				</div>
				{/* Delete Button */}
				<div className="flex justify-center mt-6">
					<button
						type="button"
						onClick={deleteBeer}
						className="w-full py-2 px-4 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600"
					>
						Delete Beer
					</button>
				</div>
			</form>
		</div>
	);
}
