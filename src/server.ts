import app from "./app";
import env from "./env";

const start = async ()=>{
  try {
    await app.listen({ port: env.PORT })
      .then(()=>{
        console.log("HTTP Server Running");
      });
  } catch (err) {
    app.log.error(err);
  }
};
  
start();
  