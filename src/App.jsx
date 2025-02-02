import "./App.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Beers from "./Beers.jsx";
import AddBeerForm from "./UserForm.jsx";
import Navbar from "./Navbar.jsx";

function App() {
	return (
		<>
			<Navbar />
			<AddBeerForm />
			<Beers />
		</>
	);
}

const queryClient = new QueryClient();

function AppSetup() {
	return (
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</StrictMode>
	);
}

createRoot(document.querySelector("#root")).render(<AppSetup />);
