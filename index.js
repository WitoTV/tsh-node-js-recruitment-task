const app = require('./src/index');

app.listen(process.env.PORT || 3000, () => {
	console.log(`Application started at port ${process.env.PORT || 3000}`);
})