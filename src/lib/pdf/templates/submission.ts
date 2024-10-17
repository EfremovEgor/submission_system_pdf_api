import { generatePDFStream } from "../base.js";

export interface submissionPDFTemplateData {
	submission: {
		title: string;
		localId: number;
		status: string;
		createdAt: string;
		abstract: string;
		keywords: string;
		authors: string[];
	};
	conference: {
		short_name: string;
	};
	topic: {
		name: string;
	};
}
export const generateSubmissionPDFBytes = async (
	data: submissionPDFTemplateData
): Promise<Buffer> => {
	const documentDefinition = {
		header: (currentPage: number, pageCount: number) => {
			return {
				stack: [
					{
						columns: [
							[
								{
									text: data.conference.short_name,
									style: { bold: true },
								},
								`Submission #${data.submission.localId}`,
								`Session: ${data.topic.name}`,
								`Submitted at: ${data.submission.createdAt}`,
								`Status: ${data.submission.status}`,
							],
							{
								width: "auto",
								text: `Page ${currentPage}/${pageCount}`,
							},
						],
					},
					{
						canvas: [
							{
								type: "line",
								x1: 0,
								y1: 5,
								x2: 595 - 2 * 40,
								y2: 5,
								lineWidth: 1,
							},
						],
					},
				],

				margin: [50, 20, 50, 20],
			};
		},
		content: [
			{
				stack: [
					{
						text: `${data.submission.title.toUpperCase()}`,
						style: "header",
						alignment: "center",
						margin: [0, 30, 0, 0],
					},
					{
						stack: [
							data.submission.authors.map((author) => author),
						],
						alignment: "center",
						margin: [0, 30, 0, 0],
					},
				],
			},
			{
				text: "Abstract",
				bold: true,
				alignment: "center",
				margin: [0, 30, 0, 0],
			},
			{
				text: `\t${data.submission.abstract}`,
				alignment: "justify",
				preserveLeadingSpaces: true,
			},
			{
				text: `\tKey words: ${data.submission.keywords}`,
				alignment: "justify",
				preserveLeadingSpaces: true,
			},
		],
		footer: {
			stack: [
				{
					canvas: [
						{
							type: "line",
							x1: 0,
							y1: 5,
							x2: 595 - 2 * 40,
							y2: 5,
							lineWidth: 1,
						},
					],
					margin: [0, 0, 0, 10],
				},
				{ text: `Generated at: ${new Date().toLocaleString()}` },
				{ text: "Confchair Event Management System" },
				{ text: "confchair.org" },
			],
			alignment: "right",
			margin: [50, 20, 50, 20],
		},
		pageSize: "A4",
		pageMargins: [50, 120, 50, 100],
		defaultStyle: {
			fontSize: 12,
			font: "ComputerModern",
		},
		info: {
			title: `${data.submission.title}`,
		},
		styles: {
			header: {
				bold: true,
				alignment: "center",
			},
		},
	};
	return await generatePDFStream(documentDefinition);
};
