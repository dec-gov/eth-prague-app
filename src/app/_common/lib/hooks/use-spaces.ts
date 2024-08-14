import { useQuery } from "@tanstack/react-query";
import { decgov_backend } from "../declarations";

export function useSpaces() {
	return useQuery({
		queryKey: ["spaces"],
		queryFn: async () => {
			const data = await decgov_backend.get_spaces();

			const spaces = data[0];

			if (!spaces) {
				throw new Error("Fetch spaces failed");
			}

			return spaces;
		},
	});
}
