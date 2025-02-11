import "./App.css";
import { StrictMode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddSourForm from "./AddBeerForm";
import BeerList from "./BeerList";
import Welcome from "./Welcome";

const queryClient = new QueryClient();

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route path="/list" element={<BeerList />} />
				<Route path="/add" element={<AddSourForm />} />
			</Routes>
		</Router>
	);
}

function AppSetup() {
	return (
		<StrictMode>
			<ErrorBoundary fallback={<p>An error has occurred.</p>}>
				<QueryClientProvider client={queryClient}>
					<App />
				</QueryClientProvider>
			</ErrorBoundary>
		</StrictMode>
	);
}

createRoot(document.querySelector("#root")).render(<AppSetup />);
