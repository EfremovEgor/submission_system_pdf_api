import Fastify from "fastify";
import routes from "@src/routes/pdf/submission.js";
export const fastify = Fastify({
	logger: true,
});
// Declare a route
fastify.get("/", async function handler(request: any, reply: any) {
	return { hello: "world" };
});
fastify.register(routes);
// Run the server!
try {
	await fastify.listen({ port: 3000, host: "0.0.0.0" });
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
