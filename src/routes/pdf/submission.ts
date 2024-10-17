import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { generateSubmissionPDFBytes } from "@src/lib/pdf/templates/submission.js";
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
export default function routes(fastify: FastifyInstance, opts: any, done: any) {
	fastify.post(
		"/pdf/submission",
		async (
			request: FastifyRequest<{ Body: submissionPDFTemplateData }>,
			reply: FastifyReply
		) => {
			const submission = request.body;
			const bytes: Buffer = await generateSubmissionPDFBytes(submission);
			if (!bytes) return { error: true };
			reply
				.headers({
					"Content-Type": "application/pdf",
					"Content-Length": bytes.byteLength.toString(),
				})
				.code(200)
				.send(bytes);
		}
	);
	done();
}
