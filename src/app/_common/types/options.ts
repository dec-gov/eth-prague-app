import * as z from "zod";

export const baseOptionSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	proposalId: z.number().int(),
});

export type BaseOption = z.infer<typeof baseOptionSchema>;

export const executeOptionSchema = baseOptionSchema.merge(
	z.object({
		onWinContractAddress: z.string(),
		onWinByteCode: z.string(),
		onWinChainId: z.number().int(),
	}),
);

export type ExecuteOption = z.infer<typeof executeOptionSchema>;
export type ProposalOption = z.infer<typeof optionSchema>;

export const optionSchema = baseOptionSchema.or(executeOptionSchema);

export const dummyProposalOptions: ProposalOption[] = [
	{
		id: 0,
		proposalId: 0,
		name: "Yes",
		onWinChainId: 123456,
		onWinContractAddress: "0x123456789",
		onWinByteCode: "0x123456789",
	},
	{
		id: 1,
		proposalId: 0,
		name: "No",
	},
	{
		id: 2,
		proposalId: 0,
		name: "Abstain",
	},
];
